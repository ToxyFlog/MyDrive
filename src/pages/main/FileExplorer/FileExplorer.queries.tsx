import {gql} from "@apollo/client";

export const GET_PRESIGNED_URLS_QUERY = gql`
    query getPresignedUrls($file_ids: [Int!]!){
        entriesPresignedUrls(file_ids: $file_ids) {
            file_id
            parent_id
            name
            url
            is_directory
        }
    }
`;
export const GET_ENTRIES_SHARE_POLICY_QUERY = gql`
    query getEntriesSharePolicy($entry_ids: [Int!]!) {
        entriesSharePolicies(entry_ids: $entry_ids) {
            can_read_users
            can_edit_users
        }
    }
`;

export const GET_ENTRY_QUERY = gql`
    query getEntry($id: Int!) {
        entry(id: $id) {
            name
        }
    }
`;

export const GET_ENTRY_OWNER_USERNAME_QUERY = gql`
    query getEntryOwnerUsername($file_id: Int!) {
        entryOwnerUsername(file_id: $file_id)
    }
`;

export const GET_USERNAMES_QUERY = gql`
    query user($user_ids: [Int!]!) {
        usernames(user_ids: $user_ids) {
            username
            id
        }
    }
`;


export const PUT_ENTRIES_IN_BIN_MUTATION = gql`
    mutation putEntriesInBin($entries: [MoveEntriesEntry!]!){
        putEntriesInBin(entries: $entries)
    }
`;

export const RESTORE_ENTRIES_MUTATION = gql`
    mutation restoreEntries($entry_ids: [Int!]!, $restore_to_drive: Boolean!) {
        restoreEntries(entry_ids: $entry_ids, restore_to_drive: $restore_to_drive)
    }
`;

export const FULLY_DELETE_ENTRIES_MUTATION = gql`
    mutation fullyDeleteEntries($entry_ids: [Int!]!) {
        fullyDeleteEntries(entry_ids: $entry_ids)
    }
`;