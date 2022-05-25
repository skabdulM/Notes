import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Notes } from './note';
import { SavedCardDialogComponent } from './saved-card-dialog/saved-card-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotesService } from './notes.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    public noteService: NotesService
  ) {}
  hideRequired = 'true';
  notes: Notes[] = [];
  myForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  ngOnInit() {
    // this.noteService.getNote().subscribe({
    //     next: (note) => {
    //       console.log(note);
    //       // this.notes = note;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    this.fetchNote();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, { duration: 2000 });
  }

  save() {
    const titleValue = this.myForm.controls.title.value;
    const descriptionValue = this.myForm.controls.description.value;
    if (
      this.myForm.controls.title.value == 0 &&
      this.myForm.controls.description.value == 0
    ) {
      this.openSnackBar('Note cannot be empty !!', 'Ok');
    } else {
      const note: Notes = {
        title: titleValue,
        description: descriptionValue,
      };
      this.noteService.addNote(note).subscribe(() => this.fetchNote());
    }
  }

  fetchNote() {
    this.noteService.getNote().subscribe((data) => (this.notes = data));
  }

  clear() {
    this.myForm.controls.title.setValue('');
    this.myForm.controls.description.setValue('');
  }

  openDialog(note: Notes): void {
    const dialogRef = this.dialog.open(SavedCardDialogComponent, {
      width: '650px',
      data: note,
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result.redirect === 'delete') {
          this.noteService.deleteNote(result).subscribe(() => this.fetchNote());
          this.openSnackBar('Note Deleted !!', '');
        }else if(result.redirect === 'close'){
          
        } 
        else {
          this.noteService.updateNote(result).subscribe(() => this.fetchNote());
          this.openSnackBar('Note Updated !!', 'Ok');
        }
      },
    });
  }

  delete(note: Notes) {
    this.noteService.deleteNote(note).subscribe(() => this.fetchNote());
    this.openSnackBar('Note Deleted !!', '');
  }
}
