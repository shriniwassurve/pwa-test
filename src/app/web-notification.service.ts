import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebNotificationService {
  baseUrl = 'http://localhost:3300/notifications';
  constructor(public swPush: SwPush,
              public http: HttpClient) {
    if (this.swPush.isEnabled) {
      this.subscribeToNotification();
      this.getNotifications();
    }
  }

  subscribeToNotification() {
    console.log('calling request subscription');
    this.swPush.requestSubscription({
        serverPublicKey: environment.VAPID_PUBLIC_KEY
    })
    .then(sub => this.sendToServer(sub))
    .catch(err => console.error('Could not subscribe to notifications', err));
  }

  getNotifications() {
    this.swPush.notificationClicks.subscribe( event => {
      console.log('Received notification: ', event);
      const url = event.notification.data.url;
      window.open(url, '_blank');
    });
  }

  sendToServer(params: any) {
    console.log('calling rest api');

    this.http.post(this.baseUrl, { notification : params }).subscribe();
  }
}
