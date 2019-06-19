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
        const promise = new Promise(resolve => {
            setTimeout(() => {
                this['_notes'].push(note);
                localStorage.setItem('notes', JSON.stringify(this.notes))
                resolve(this['_notes'][this['_notes'].length - 1]);
            }, 2000)
        });
        return promise;
    }

    deleteNote(id) {
        const promise = new Promise(resolve => {
            setTimeout(() => {
                for (const note of this._notes) {
                    if (this.findNoteById(id) === note) {
                        this['_notes'].splice(this._notes.indexOf(note), 1);
                        localStorage.setItem('notes', JSON.stringify(this.notes));
                        resolve(this._notes)
                    }
                }
            }, 2000)
        });
        return promise;
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