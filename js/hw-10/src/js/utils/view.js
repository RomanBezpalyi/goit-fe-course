import {ICON_TYPES, NOTE_ACTIONS} from './constants';


// DOM NODES

const createElementWithClass = (tag, classTitle, textToAdd) => {
    const elementToCreate = document.createElement(tag);
    textToAdd ? elementToCreate.textContent = textToAdd : null;
    !Array.isArray(classTitle) ? elementToCreate.classList.add(classTitle) : classTitle.forEach(item => elementToCreate.classList.add(item));
    return elementToCreate
};

const createNoteContent = note => {
    const noteContent = createElementWithClass('div', 'note__content', '');
    const noteTitle = createElementWithClass('h2', 'note__title', note.title);
    const noteBody = createElementWithClass('p', 'note__body', note.body);

    noteContent.append(noteTitle, noteBody)

    return noteContent;
};

const createActionButton = (textToAdd, attributeToAdd) => {
    const button = createElementWithClass('button', 'action', '');
    button.setAttribute('data-action', attributeToAdd);
    const buttonText = createElementWithClass('i', ["material-icons", "action__icon"], textToAdd);
    button.appendChild(buttonText);
    return button
};


const createNoteFooter = note => {
    const noteFooter = createElementWithClass('footer', 'note__footer', '');
    const noteSection = createElementWithClass('section', 'note__section', '');
    const noteSectionSecond = noteSection.cloneNode(false);
    const expandMoreButton = createActionButton(ICON_TYPES.ARROW_DOWN, NOTE_ACTIONS.DECREASE_PRIORITY);
    const expandLessButton = createActionButton(ICON_TYPES.ARROW_UP, NOTE_ACTIONS.INCREASE_PRIORITY);
    const editNoteButton = createActionButton(ICON_TYPES.EDIT, NOTE_ACTIONS.EDIT);
    const deleteNoteButton = createActionButton(ICON_TYPES.DELETE, NOTE_ACTIONS.DELETE);
    const notePriority = createElementWithClass('span', 'note__priority', `Priority: ${note.priority}`);


    noteSection.append(expandMoreButton, expandLessButton, notePriority);
    noteSectionSecond.append(editNoteButton, deleteNoteButton);
    noteFooter.append(noteSection, noteSectionSecond);

    return noteFooter;
};

const createListItem = note => {
    const liToCreate = createElementWithClass('li', 'note-list__item', '');
    const noteDiv = createElementWithClass('div', 'note', '');
    liToCreate.setAttribute('data-id', note.id)

    noteDiv.append(createNoteContent(note), createNoteFooter(note));
    liToCreate.append(noteDiv);

    return liToCreate;
};

export const renderNoteList = (listRef, notes) => {
    const parentElement = notes.map(item => createListItem(item));

    listRef.append(...parentElement)
};

export const addListItem = (listRef, note) => {
    const toAppend = createListItem(note);

    listRef.append(toAppend)
};


