import {
    Notyf
} from 'notyf';

const notyf = new Notyf;
const URL = 'http://localhost:3000/notes';

export const getNotes = async () => {
    try {
        const gotNotes = await fetch(URL);
        return gotNotes.json();
    } catch (error) {
        notyf.error('Error while fetching: ' + error);
    }
};

export const saveNote = async (note) => {
    const options = {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json",
        },
        "body": JSON.stringify(note)
    }

    try {
        const noteToSave = await fetch(URL, options);
        return noteToSave.json();
    } catch (error) {
        notyf.error('Error while fetching: ' + error);
    }
};

export const deleteNote = async (id) => {
    const options = {
        "method": "DELETE",
    }

    try{
        const noteToDelete = await fetch(`${URL}/${id}`, options);
        return noteToDelete.json();
    } catch(error) {
        notyf.error('Error while fetching: ' + error);
    }
}