import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {
  private timeoutDuration = 3500;

  constructor() { }

  public showNotification(message: string): void {

    setTimeout(() => {
      let notification = document.querySelector('.mdl-js-snackbar');
      let data = {
        message: message,
        timeout: this.timeoutDuration
      };
      notification['MaterialSnackbar'].showSnackbar(data);
    }, 0)
  }

}
