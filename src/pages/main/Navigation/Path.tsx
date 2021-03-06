import React from "react";
import {Link} from "react-router-dom";
import {PathContainer, PathElement} from "./Path.styles";

type PathProps = {
	path: string;
}

const Path = ({path}: PathProps) => {
	const getShortenedPath = (path: string): [[string, string][], number] => {
		const pathArray = path.split("/").map((cur, i) => [cur, path.split("/").slice(0, i + 1).join("/")]) as [string, string][];
		if (pathArray.length < 5) return [pathArray, -1];

		return [[pathArray[0], ["...", ""], ...[...pathArray].slice(pathArray.length - 3)], 1];
	};

	const [shortenedPath, ignoredIndex] = getShortenedPath(path);

	return (
		<PathContainer>
			{shortenedPath.map(([text, curPath], i) =>
				<React.Fragment key={i}>
					{i === ignoredIndex ? <PathElement>{text}</PathElement> : <Link to={`${window.location.pathname}#${curPath}`}>{text}</Link>}
					{i + 1 !== path.length && <span>/</span>}
				</React.Fragment>,
			)}
		</PathContainer>
	);
};

export default Path;