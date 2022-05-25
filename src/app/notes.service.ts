import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notes } from './note';

@Injectable()
export class NotesService {
  constructor(private http: HttpClient) {}
  url = 'http://localhost:3000/products/';

  addNote(note: Notes) {
    let url: string = this.url + 'create';
    return this.http.post<Notes[]>(url, {
      title: note.title,
      description: note.description,
    });
  }

  getNote() {
    return this.http.get<Notes[]>(this.url + 'read');
  }

  updateNote(note: Notes) {
    let url: string = this.url + 'update/' + note.id;
    return this.http.patch<Notes[]>(url, {
      id: note.id,
      title: note.title,
      description: note.description,
    });
  }

  deleteNote(note: Notes) {
    let url: string = this.url + 'delete/' + note.id;
    return this.http.delete<Notes>(url);
  }
}
