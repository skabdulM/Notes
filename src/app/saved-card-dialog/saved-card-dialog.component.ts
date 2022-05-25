import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Notes } from '../note';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'SavedCardDialogComponent',
  templateUrl: 'saved-card-dialog.component.html',
  styleUrls: ['./saved-card-dialog.component.scss'],
})
export class SavedCardDialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Notes,
    public dialogRef: MatDialogRef<SavedCardDialogComponent>
  ) {
    dialogRef.disableClose = true;
  }

  myForm1 = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  hideRequired = 'true';
  tempData: any;

  ngOnInit() {
    this.tempData = this.data;
    this.setValues();
  }

  get controls() {
    return this.myForm1.controls;
  }

  setValues() {
    this.controls.title.setValue(this.tempData.title);
    this.controls.description.setValue(this.tempData.description);
  }

  updateNote() {
    if (
      this.controls.title.value == 0 &&
      this.controls.description.value == 0
    ) {
      let updateData: any = {};
      updateData.id = this.data.id;
      updateData.redirect = 'delete';
      this.dialogRef.close(updateData);
    } else {
      let updateData: any = {};
      updateData.id = this.data.id;
      updateData.title = this.controls.title.value;
      updateData.description = this.controls.description.value;
      this.dialogRef.close(updateData);
    }
  }

  delete() {
    let updateData: any = {};
    updateData.id = this.data.id;
    updateData.redirect = 'delete';
    this.dialogRef.close(updateData);
  }

  close() {
    let updateData: any = {};
    updateData.redirect = 'close';
    this.dialogRef.close(updateData);
    // this.controls.title.setValue('');
    // this.controls.description.setValue('');
  }
}
