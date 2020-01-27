import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-install-app-dialog',
  templateUrl: './install-app-dialog.component.html',
  styleUrls: ['./install-app-dialog.component.scss']
})
export class InstallAppDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<InstallAppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close('install');
  }

}
