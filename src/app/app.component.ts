import { Component, OnInit, HostListener, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { InstallAppDialogComponent } from './install-app-dialog/install-app-dialog.component';
import { Subject, interval, concat } from 'rxjs';
import { take, first } from 'rxjs/operators'
import { SwUpdate } from '@angular/service-worker';
import { UpdateAvailableComponent } from './update-available/update-available.component';
import { WebNotificationService } from './web-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pwa-test';
  todos: any[];
  deferredPrompt;
  deferredPromptEvent: Subject<any> = new Subject();
  checkUpdateInterval$ = interval(60 * 1000);

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e) {
    console.log('Deferred  prompt', this.deferredPrompt);
    console.log('inside event listener', e);
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    this.deferredPromptEvent.next(1);
  }
  constructor(private http: HttpClient,
              public dialog: MatDialog,
              private swUpdate: SwUpdate,
              private appRef: ApplicationRef,
              private webNotificationService: WebNotificationService) {
                console.log('service worker is ', swUpdate.isEnabled);

                this.swUpdate.available.subscribe(() => {
                  this.askUserToUpdate();
                });


                if (this.swUpdate.available) {
                  const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
                  concat(appIsStable$, this.checkUpdateInterval$)
                    .subscribe(() => {
                      this.swUpdate.checkForUpdate()
                      .then(() => console.log('checking for update'))
                      .catch(() => console.log('error checking update'));
                    });
                }
              }

  ngOnInit(): void {
    this.deferredPromptEvent
    .pipe(take(1))
    .subscribe(() => {
      this.showInstallPromotion();
    });
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

  subscribeToNotifications() {
    this.webNotificationService.subscribeToNotification();
  }

  askUserToUpdate() {
    const dialogRef = this.dialog.open(UpdateAvailableComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'update') {
        this.swUpdate.activateUpdate()
          .then(() => {
            console.log('updated app');
            window.location.reload();
          });
      }
    });
  }
}
