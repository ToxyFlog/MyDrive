import React, {useContext, useState} from "react";
import ModalWindow from "components/ModalWindow";
import {Button, Buttons, Container, DisabledButton, Header, PrimaryButton} from "./Modal.styles";
import {CurrentDataContext, Entry} from "../index";
import {useMutation} from "@apollo/client";
import {RENAME_ENTRY_MUTATION} from "./RenameEntryModal.queries";
import StyledInput from "../../../components/StyledInput";
import {client} from "../../../index";
import {CURRENT_FOLDER_QUERY} from "../index.queries";

export type RenameEntryModalData = {
	entry: Entry | null;
	input: string | null;
} | null

type RenameEntryModalProps = {
	modalData: RenameEntryModalData;
	setModalData: (arg: RenameEntryModalData) => void;
	currentEntries: Entry[];
	setCurrentEntries: (arg: Entry[]) => void;
}

const RenameEntryModal = ({modalData, setModalData, currentEntries, setCurrentEntries}: RenameEntryModalProps) => {
	const {currentFolderId} = useContext(CurrentDataContext);

	const [isNameValid, setIsNameValid] = useState(false);

	const [renameEntryMutation] = useMutation(RENAME_ENTRY_MUTATION);


	const onInput = (value: string) => {
		if (!modalData) return;

		const names = currentEntries.map(entry => entry.name);
		setIsNameValid(!names.includes(value));
		setModalData({...modalData, input: value});
	};

	const onClick = async () => {
		if (!modalData) return;

		const file_id = modalData.entry?.id;
		const {data} = await renameEntryMutation({variables: {file_id, newFilename: modalData.input}});
		setModalData(null);
		if (!data.rename) return;

		const newEntries = currentEntries.map(entry => entry.id === file_id ? {...entry, name: modalData.input || ""} : entry);

		setCurrentEntries(newEntries);
		client.writeQuery({
			query: CURRENT_FOLDER_QUERY,
			data: {entries: newEntries},
			variables: {parent_id: currentFolderId},
		});
	};


	if (!modalData) return null;

	return (
		<ModalWindow isOpen={true}>
			<Container>
				<Header>Rename "{modalData.entry?.name}"</Header>

				<StyledInput onInput={e => onInput((e.target as HTMLInputElement).value)}/>

				<Buttons>
					<Button onClick={() => setModalData(null)}>Cancel</Button>
					{isNameValid
						? <PrimaryButton onClick={onClick}>OK</PrimaryButton>
						: <DisabledButton>File with this name already exists!</DisabledButton>
					}
				</Buttons>
			</Container>
		</ModalWindow>
	);
};

export default RenameEntryModal;