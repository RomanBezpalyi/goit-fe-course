import './sass/main.scss';
import 'notyf/notyf.min.css';
import {refs, submitForm, removeListItem, handleChange} from './js/utils/app.js'; 


// LISTENERS

refs.formNoteEditor.addEventListener('submit', submitForm);
refs.noteList.addEventListener('click', removeListItem);
refs.searchForm.addEventListener('change', handleChange);
