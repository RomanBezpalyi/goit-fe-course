import Notepad from './notepad-modules';
import {refs} from './constants';
import noteListTemplate from '../../templates/note-list.hbs';
import MicroModal from 'micromodal';
import {
    Notyf
} from 'notyf';

const notyf = new Notyf;


// ELEMENTS VIEW AND STORAGE

const notepad = new Notepad();

notepad.getNotes().then(notes => refs.noteList.innerHTML = noteListTemplate(notes)).catch(console.error);

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
        note.priority = Notepad.Priority().LOW;

        refs.titleInput.value = '';
        refs.bodyInput.value = '';

        notepad.saveNote(note);

        notyf.success('Заметка успешно добавлена.');
        setTimeout(() => refs.noteList.innerHTML = noteListTemplate(notepad._notes), 2000)
    }
};

export const removeListItem = event => {
    const target = event.target;

    if (target.parentElement.dataset.action !== 'delete-note') return;

    notepad.deleteNote(target.closest('.note-list__item').dataset.id);
    target.closest('.note-list__item').remove();
}

export const handleChange = event => {
    event.preventDefault();

    const target = event.target;
    const filtredNotes = notepad.filterNotesByQuery(target.value);
    Array.from(refs.noteList.children).forEach(element => element.remove());

    refs.noteList.innerHTML = noteListTemplate(filtredNotes);
}