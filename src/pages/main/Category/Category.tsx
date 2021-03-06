import React, {MouseEvent, useContext, useEffect, useState} from "react";
import {Container, Name, Row} from "./Category.styles";
import {CategoryContext} from "../FileExplorer/FileExplorer";

export type DataElement = {
	key: string;
	[key: string]: any;
}

type CategoryProps = {
	name: string;
	Element: (...args: any) => JSX.Element;
}

const Category = ({Element, name}: CategoryProps) => {
	const {dataGetterMap, selected, setSelected} = useContext(CategoryContext);
	const [lastIdx, setLastIdx] = useState(-1);

	const data = dataGetterMap[name]();
	const curSelected = selected[name];

	useEffect(() => {
		if (selected[name]) return;

		setSelected({...selected, [name]: new Array(data.length).fill(false)});
		setLastIdx(-1);
	}, [data.length, name, selected]);


	const changeSelection = (e: MouseEvent, idx: number) => {
		e.stopPropagation();

		if ((lastIdx === idx && e.shiftKey) || e.ctrlKey || e.metaKey) {
			const newSelected = [...curSelected];
			newSelected[idx] = !newSelected[idx];
			setSelected({...selected, [name]: newSelected});
		} else if (e.shiftKey && lastIdx !== -1) {
			setSelected({
				...selected,
				[name]:
					lastIdx < idx ?
						curSelected.map((cur: boolean, curIdx: number) => (curIdx >= lastIdx && curIdx <= idx) ? true : cur) :
						curSelected.map((cur: boolean, curIdx: number) => (curIdx >= idx && curIdx <= lastIdx) ? true : cur),
			});
		} else {
			const newSelected = new Array(data.length).fill(false);
			newSelected[idx] = true;
			setSelected({[name]: newSelected});
		}

		setLastIdx(idx);
	};


	if (data.length === 0) return null;

	return (
		<Container>
			<Name>{name}</Name>

			<Row>
				{data.map((dataEl: DataElement, idx: number) =>
					<Element {...dataEl} isSelected={curSelected ? curSelected[idx] : false} onClick={(e: MouseEvent) => changeSelection(e, idx)}/>,
				)}
			</Row>
		</Container>
	);
};

export default Category;