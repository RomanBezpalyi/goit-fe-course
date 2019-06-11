'use strict';

const PRIORITY_TYPES = {
  LOW: 0,
  NORMAL: 1,
  HIGH: 2,
};

const ICON_TYPES = {
  EDIT: 'edit',
  DELETE: 'delete',
  ARROW_DOWN: 'expand_more',
  ARROW_UP: 'expand_less',
};

const NOTE_ACTIONS = {
  DELETE: 'delete-note',
  EDIT: 'edit-note',
  INCREASE_PRIORITY: 'increase-priority',
  DECREASE_PRIORITY: 'decrease-priority',
};

class Notepad {

  constructor(notes = []) {
    this._notes = notes
  }

  static Priority = {
    LOW: 0,
    NORMAL: 1,
    HIGH: 2,
  }

  get notes() {

    return this._notes
  }

  findNoteById(id) {

    let noteFound = '';
    for (let i = 0; i < this['_notes'].length; i += 1) {

      if (this._notes[i]['id'] === id) {
        noteFound = this._notes[i];
        break;
      } else {
        noteFound = undefined
      }
    }
    return noteFound
  }
  saveNote(note) {

    this['_notes'].push(note);
    return this['_notes'][this['_notes'].length - 1]
  }
  deleteNote(id) {

    for (let i = 0; i < this['_notes'].length; i += 1) {
      if (this._notes[i]['id'] === id) {
        this['_notes'].splice(1, i)
      }
    }
  }
  updateNoteContent(id, updatedContent) {

    for (let i = 0; i < this['_notes'].length; i += 1) {
      if (this._notes[i]['id'] === id) {
        this._notes[i] = {
          ...this._notes[i],
          ...updatedContent
        }
        return this._notes[i]
      } else continue;
    }

  }

  updateNotePriority(id, priority) {

    for (let i = 0; i < this['_notes'].length; i += 1) {
      if (this._notes[i]['id'] === id) {
        this._notes[i]['priority'] = priority;
        return this._notes[i]
      }
    }
  }
  filterNotesByQuery(query) {
    let newArr = [];



    for (let i = 0; i < this['_notes'].length; i += 1) {

      for (let key in this._notes[i]) {
        let lowerString = '';
        if (key === 'title' || key === 'body') {
          lowerString = this._notes[i][key].toLowerCase()
          if (lowerString.includes(query)) {
            newArr.push(this._notes[i]);
            break;
          } else continue;
        }
      }
    }
    return newArr
  }

  filterNotesByPriority(priority) {
    let newArr = [];

    for (let i = 0; i < this['_notes'].length; i += 1) {
      if (this._notes[i]['priority'] === priority) {
        newArr.push(this._notes[i])
      }
    }
    return newArr
  }
}

const initialNotes = [{
    id: 'id-1',
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: PRIORITY_TYPES.HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-3',
    title: 'Get comfy with Frontend frameworks',
    body: 'First should get some general knowledge about frameworks, then maybe try each one for a week or so. Need to choose between React, Vue and Angular, by reading articles and watching videos.',
    priority: PRIORITY_TYPES.NORMAL,
  },
  {
    id: 'id-4',
    title: 'Winter clothes',
    body: "Winter is coming! Need some really warm clothes: shoes, sweater, hat, jacket, scarf etc. Maybe should get a set of sportwear as well so I'll be able to do some excercises in the park.",
    priority: PRIORITY_TYPES.LOW,
  },
];


const notepad = new Notepad(initialNotes);

console.log(notepad.notes);


const createElementWithClass = (tag, classTitle, textToAdd) => {
  const elementToCreate = document.createElement(tag);
  textToAdd ? elementToCreate.textContent = textToAdd : null;
  !Array.isArray(classTitle)? elementToCreate.classList.add(classTitle) : classTitle.forEach(item => elementToCreate.classList.add(item));
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

const renderNoteList = (listRef, notes) => {
  const parentElement = document.querySelector(listRef);

  const parentElementNew = notes.map(item => createListItem(item));

  parentElement.append(...parentElementNew)
};


renderNoteList('.note-list', initialNotes)


