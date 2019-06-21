import './sass/main.scss';
import 'notyf/notyf.min.css';
import {refs} from './js/utils/constants.js';
import {submitForm, removeListItem, handleChange} from './js/utils/app.js'; 
console.log(refs);


// LISTENERS

refs.formNoteEditor.addEventListener('submit', submitForm);
refs.noteList.addEventListener('click', removeListItem);
refs.searchForm.addEventListener('change', handleChange);
