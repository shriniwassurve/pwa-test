import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { InstallAppDialogComponent } from './install-app-dialog/install-app-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pwa-test';
  todos: any[];
  deferredPrompt;

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log('Deferred  prompt', this.deferredPrompt);
    console.log('inside event listener', e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.showInstallPromotion();
  }
  constructor(private http: HttpClient,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.http.get('https://jsonplaceholder.typicode.com/todos')
      .subscribe((data: any[]) => {
        console.log(data);
        this.todos = data;
      });
  }

  showInstallPromotion() {
    const dialogRef = this.dialog.open(InstallAppDialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'install' && this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            // If user clicks cancel button after prompt
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredPrompt = null;
          console.log('Deferred  prompt stopped', this.deferredPrompt);
        });
      }
    });
  }
}
