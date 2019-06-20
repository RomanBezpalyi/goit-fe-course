import Notepad from './notepad-modules';
import initialNotes from '../../assets/notes.json';
import noteListTemplate from '../../templates/note-list.hbs';
import MicroModal from 'micromodal';
import {Notyf} from 'notyf';

const shortid = require('shortid');
const notyf = new Notyf;


export const refs = {
    noteList: document.querySelector('.note-list'),
    searchForm: document.querySelector('.search-form'),
    formNoteEditor: document.querySelector('.note-editor'),
    titleInput: document.querySelector('.note-editor input'),
    bodyInput: document.querySelector('.note-editor textarea'),
};


// ELEMENTS VIEW AND STORAGE

const notepad = new Notepad(initialNotes);
const preUpload = () => {
    if (localStorage.notes) {
        try {
            notepad._notes = JSON.parse(localStorage.getItem('notes'))
        } catch (error) {
            console.error("Error!")
        }
    }
}
preUpload()

refs.noteList.innerHTML = noteListTemplate(notepad.notes);


MicroModal.init();

// // EVENT HANDLERS

export const submitForm = event => {
    event.preventDefault();

    const note = {};

    if (!refs.titleInput.value || !refs.bodyInput.value) {
        notyf.error('Необходимо заполнить все поля!')
    } else {
        note.title = refs.titleInput.value;
        note.body = refs.bodyInput.value;
        note.id = shortid.generate();
        note.priority = Notepad.Priority().LOW;

        refs.titleInput.value = '';
        refs.bodyInput.value = '';

        notepad.saveNote(note);

        try {
            localStorage.setItem('notes', JSON.stringify(notepad.notes))
        } catch (error) {
            console.error('Error!')
        }
        notyf.success('Заметка успешно добавлена.')
        setTimeout(() => refs.noteList.innerHTML = noteListTemplate(notepad.notes), 2000)
    }
};

export const removeListItem = event => {
    const target = event.target;

    if (target.parentElement.dataset.action !== 'delete-note') return;

    notepad.deleteNote(target.closest('.note-list__item').dataset.id);
    target.closest('.note-list__item').remove();

    try {
        localStorage.setItem('notes', JSON.stringify(notepad.notes))
    } catch (error) {
        console.error("Error!")
    };
}

export const handleChange = event => {
    event.preventDefault();

    const target = event.target;
    const filtredNotes = notepad.filterNotesByQuery(target.value);
    Array.from(refs.noteList.children).forEach(element => element.remove());

    refs.noteList.innerHTML = noteListTemplate(filtredNotes);
}

