import * as api from '../services/api';

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

    async getNotes() {
        const notesArr = await api.getNotes();
        notesArr.forEach(note => this._notes.push(note));
        return this._notes;
    }

    findNoteById(id) {
        return this._notes.find(element => element.id === id)
    }

    async saveNote(note) {
        const savedNote = await api.saveNote(note);
        this._notes.push(savedNote);
        return savedNote;
    }

    async deleteNote(id) {
        const foundNote = await api.deleteNote(id);
        this._notes.filter(note => note !== foundNote);
        return this._notes;
    }

    updateNoteContent(id, updatedContent) {
        const promise = new Promise(resolve => setTimeout(() => {
            for (const note of this._notes) {
                if (this.findNoteById(id) === note) {
                    resolve(note = {
                        ...note,
                        ...updatedContent
                    })
                } else continue;
            }
        }, 2000));
        return promise
    }

    updateNotePriority(id, priority) {
        const promise = new Promise(resolve => setTimeout = (() => {
            for (const note of this._notes) {
                if (this.findNoteById(id) === note) {
                    resolve(note['priority'] = priority);
                }
            }
        }, 2000));
        return promise
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
        return newArr;
    }

    filterNotesByPriority(priority) {
        let newArr = [];

        for (const note of this._notes) {
            if (note['priority'] === priority) {
                newArr.push(note)
            }
        }
        return newArr;
    }
};