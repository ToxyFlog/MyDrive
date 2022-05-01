export type SimpleFileEntry = {
	newName?: string;
	data?: ArrayBuffer;
	name: string;
	size: number;
}

export type FileEntry = SimpleFileEntry & {
	path: string | null;
	is_directory: boolean;
}


export const renameToAvoidNamingCollisions = (entries: FileEntry[], parentEntries: FileEntry[]): FileEntry[] | SimpleFileEntry[] => {
	const reverse = (str: string): string => [...str].reverse().join("");

	const splitName = (name: string): [string, string | null] => {
		const cleanName = name.replace(/ \(\d+\)(\..+)?$/, "");
		const [, ext, filename] = reverse(cleanName).match(/^(\w+\.)?(.+)$/) as [any, string | null, string];

		return [reverse(filename), ext ? reverse(ext) : null];
	};

	let folderNames = "";
	let fileNames = "";
	parentEntries.forEach(cur => {
		if (cur.is_directory) folderNames += cur.name;
		else fileNames += cur.name;
	});

	return entries.map(entry => {
		const matches = (entry.is_directory ? folderNames : fileNames).matchAll(new RegExp(`${entry.name}( \\(([0-9]+)\\))?\\.?`, "g"));
		let max = -1;
		while (true) {
			const cur = matches.next();
			if (cur.done) break;

			max = Math.max(max, cur.value[0] ? Number(cur.value[2] || 0) : -1);
		}
		if (max === -1) return entry;

		const [filename, extension] = splitName(entry.name);
		return {...entry, newName: `${filename} (${max + 1})${extension === null ? "" : extension}`};
	});
};


export const filesToEntries = async (files: File[]): Promise<SimpleFileEntry[]> => {
	const entries: SimpleFileEntry[] = [];

	for (let i = 0; i < files.length; i++) {
		const curFile = files[i];
		const data = await curFile.arrayBuffer();

		entries.push({size: curFile.size, name: curFile.name, data});
	}

	return entries;
};

export const folderToEntries = async (files: File[]): Promise<FileEntry[]> => {
	const entries: FileEntry[] = [];
	const entry_paths = new Set<string>();

	for (let i = 0; i < files.length; i++) {
		const curFile = files[i];
		const {webkitRelativePath: path, size, name} = curFile;
		if (entry_paths.has(path)) continue;
		const data: ArrayBuffer = await curFile.arrayBuffer();

		const pathEntries = path.split("/").slice(0, -1);
		let curPath = pathEntries.join("/");

		entries.push({path: curPath, size, name, is_directory: false, data});
		entry_paths.add(path);

		for (let j = 0; j < pathEntries.length; j++) {
			if (j > 0) curPath = curPath.split("/").slice(0, -1 * j).join("/");
			if (!curPath || entry_paths.has(curPath)) continue;

			const name = curPath.split("/").slice(-1)[0];
			entries.push({path: curPath.split("/").slice(0, -1).join("/"), size: 0, is_directory: true, name});
			entry_paths.add(curPath);
		}
	}

	return entries;
};


// Type containing only variables and methods which are used, as there is no typescript definition of class
type FileSystemHandle = {
	kind: string;
	name: string;

	getFile: () => Promise<File>;
	values: () => Promise<Iterator<any>>
};

export const dataTransferToEntries = async (itemList: DataTransferItemList): Promise<{ simpleFileEntries?: SimpleFileEntry[], fileEntries?: FileEntry[] }> => {
	const getFiles = async (file: FileSystemHandle, path?: string): Promise<File[]> => {
		if (file.name === ".DS_Store") return [];

		if (file.kind === "file") {
			const curFile: File = await file.getFile();
			const data = await curFile.arrayBuffer();

			return [{
				webkitRelativePath: path,
				name: curFile.name,
				size: curFile.size,
				arrayBuffer: () => Promise.resolve(data),
			} as File];
		}

		const arr: File[] = [];
		const values = await file.values();

		while (true) {
			const {done, value} = await values.next();
			if (done) break;
			arr.push(...await getFiles(value, `${path}/${value.name}`));
		}

		return arr;
	};

	// @ts-ignore
	const handles: FileSystemHandle[] = await Promise.all([...itemList].map(item => item.getAsFileSystemHandle()));

	const filesPromises = handles.map(handle => getFiles(handle, handle.name));
	const files: File[] = (await Promise.all(filesPromises)).reduce((arr: File[], cur) => [...arr, ...cur], []);

	const containsFolders = handles.filter(({kind}) => kind === "directory").length > 0;
	return containsFolders ? {fileEntries: await folderToEntries(files)} : {simpleFileEntries: await filesToEntries(files)};
};