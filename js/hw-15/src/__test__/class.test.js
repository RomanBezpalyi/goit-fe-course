'use strict';

import Notepad from '../class';

const initialNotes = [{
    id: 'id-1',
    title: 'JavaScript essentials',
    body: 'Get comfortable with all basic JavaScript concepts: variables, loops, arrays, branching, objects, functions, scopes, prototypes etc',
    priority: Notepad.Priority().HIGH,
  },
  {
    id: 'id-2',
    title: 'Refresh HTML and CSS',
    body: 'Need to refresh HTML and CSS concepts, after learning some JavaScript. Maybe get to know CSS Grid and PostCSS, they seem to be trending.',
    priority: Notepad.Priority().NORMAL,
  },
];

describe('Notepad', () => {
  let notepad;

  it('should return priority', () => {
    expect(Notepad.Priority().LOW).not.toBeUndefined();
  });

  beforeEach(() => {
    notepad = new Notepad(initialNotes);
  });

  it('should have initial notes', () => {
    expect(notepad._notes).toEqual(initialNotes);
  });

  it('should find a note by id', () => {
    const foundNote = initialNotes[1];

    expect(notepad.findNoteById('id-2')).toEqual(foundNote);
  });

  it('should save a note', () => {
    const note = {
      id: 'id-3',
      title: 'TEST TITLE',
      body: 'TEST BODY',
      priority: Notepad.Priority().LOW
    };

    notepad.saveNote(note);
    expect(notepad._notes).toContain(note);
  });

  it('should delete a note', () => {
    const note = initialNotes[0]

    notepad.deleteNote(note.id);
    expect(notepad._notes).not.toContain(note);
  });

  it('should update a content of a note', () => {
    expect(notepad._notes).toContain(notepad.updateNoteContent('id-2', {
      body: "test"
    }));
  });

  it('should update the priotity of a note', () => {
    notepad.updateNotePriority('id-3', Notepad.Priority().HIGH);
    expect(notepad._notes[1].priority).toBe(2)
  });

  it('should filter notes by query', () => {
    const objectWithQuery = {
      id: 'id-2',
      title: 'Refresh HTML and CSS',
      body: 'test',
      priority: 1
    };

    const objectWithNoQuery = {
      id: 'id-3',
      title: 'TEST TITLE',
      body: 'TEST BODY',
      priority: 2
    };

    const testArr = notepad.filterNotesByQuery('html');
    expect(testArr).toContainEqual(expect.objectContaining(objectWithQuery));
    expect(testArr).not.toContainEqual(expect.objectContaining(objectWithNoQuery))
  });

  it('should filter notes by priority', () => {
    const objectToReceive = {
      id: 'id-2',
      title: 'Refresh HTML and CSS',
      body: 'test',
      priority: 1
    };

    const object = {
      id: 'id-3',
      title: 'TEST TITLE',
      body: 'TEST BODY',
      priority: 2
    };

    const testArr = notepad.filterNotesByPriority(1);
    expect(testArr).toContainEqual(expect.objectContaining(objectToReceive));
    expect(testArr).not.toContainEqual(expect.objectContaining(object))
  });

})