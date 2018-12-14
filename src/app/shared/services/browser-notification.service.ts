import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';

let _window: any = window;

@Injectable()
export class BrowserNotificationService {
  private notifSupported;
  private enabled = false;

  constructor(
    private notificationService: NotificationService
  ) {
    this.notifSupported = (<any>window).Notification && (<any>Notification).permission !== 'denied' ? true : false;
  }

  async checkNotification(): Promise<any> {
    if (!this.enabled) {
      return Notification.requestPermission((result) => {
        return result === 'granted' ? (
          this.enabled = true
        ) : false;
      });
    }
  }

  public disable(): void {
    this.enabled = false;
  }

  public show(name: string): void {
    if (!this.notifSupported || !this.enabled) {
      this.notificationService.showNotification(name);
      return;
    }

    Notification.requestPermission((status) => {
      let n = new Notification('Now playing', {
        body: name,
        icon: 'assets/logo_git.png'
      });
    });
  }

}
