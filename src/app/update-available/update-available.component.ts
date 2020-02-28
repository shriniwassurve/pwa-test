import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InstallAppDialogComponent } from '../install-app-dialog/install-app-dialog.component';

@Component({
  selector: 'app-update-available',
  templateUrl: './update-available.component.html',
  styleUrls: ['./update-available.component.scss']
})
export class UpdateAvailableComponent {

  constructor(
    public dialogRef: MatDialogRef<InstallAppDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    this.dialogRef.close('update');
  }
}
