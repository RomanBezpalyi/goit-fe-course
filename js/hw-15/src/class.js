'use strict';

export default class Notepad {

  constructor(notes = []) {
    this._notes = notes
  }

  static Priority() {
    return {
      LOW: 0,
      NORMAL: 1,
      HIGH: 2,
    }
  }

  get notes() {
    return this._notes
  }

  findNoteById(id) {
    return this._notes.find(element => element.id === id)
  }
  saveNote(note) {

    this['_notes'].push(note);
    return this['_notes'][this['_notes'].length - 1]
  }

  deleteNote(id) {
    for (const note of this._notes) {
      if (this.findNoteById(id) === note) {
        this['_notes'].splice(this._notes.indexOf(note), 1)
      }
    }
  }

  updateNoteContent(id, updatedContent) {
    for (let note of this._notes) {
      if (this.findNoteById(id) === note) {
        this._notes[this._notes.indexOf(note)] = {
          ...note,
          ...updatedContent
        };
      }
      return this._notes[this._notes.indexOf(this.findNoteById(id))];
    }
    }

    updateNotePriority(id, priority) {

      for (const note of this._notes) {
        if (this.findNoteById(id) === note) {
          note['priority'] = priority;
          return note
        }
      }
    }
    filterNotesByQuery(query) {
      let newArr = [];

      for (const note of this._notes) {

        for (let key in note) {
          let lowerString = '';
          if (key === 'title' || key === 'body') {
            lowerString = note[key].toLowerCase()
            if (lowerString.includes(query)) {
              newArr.push(note);
              break;
            } else continue;
          }
        }
      }
      return newArr
    }

    filterNotesByPriority(priority) {
      let newArr = [];

      for (const note of this._notes) {
        if (note['priority'] === priority) {
          newArr.push(note)
        }
      }
      return newArr
    }
  }