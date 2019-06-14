import Notepad from './notepad-modules';
import {addListItem, renderNoteList} from './view';
import initialNotes from '../../assets/notes.json';

const shortid = require('shortid');

export const refs = {
    noteList: document.querySelector('.note-list'),
    searchForm: document.querySelector('.search-form'),
    formNoteEditor: document.querySelector('.note-editor'),
    titleInput: document.querySelector('.note-editor input'),
    bodyInput: document.querySelector('.note-editor textarea'),
};

const notepad = new Notepad(initialNotes);

renderNoteList(refs.noteList, notepad.notes)

// EVENT HANDLERS

export const submitForm = event => {
    event.preventDefault();

    const note = {};

    if (!refs.titleInput.value || !refs.bodyInput.value) {
        alert('Необходимо заполнить все поля!')
    } else {
        note.title = refs.titleInput.value;
        note.body = refs.bodyInput.value;
        note.id = shortid.generate();
        note.priority = Notepad.Priority.LOW;

        refs.titleInput.value = '';
        refs.bodyInput.value = '';

        notepad.saveNote(note);
        addListItem(refs.noteList, note)
    }

};

export const removeListItem = event => {
    const target = event.target;

    if (target.parentElement.dataset.action !== 'delete-note') return;

    notepad.deleteNote(target.closest('.note-list__item').dataset.id);
    target.closest('.note-list__item').remove()
}

export const handleChange = event => {
    event.preventDefault();

    const target = event.target;
    const filtredNotes = notepad.filterNotesByQuery(target.value);
    Array.from(refs.noteList.children).forEach(element => element.remove());

    renderNoteList(refs.noteList, filtredNotes);
}
