import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from './notification.service';
import { BrowserNotificationService } from './browser-notification.service';
import { SocketService } from './socket.service';

let _window: any = window;

@Injectable()
export class YoutubePlayerService {
  public yt_player;
  private currentVideoId: string;
  private currentVideoName: string;
  private isHolder;

  @Output() videoChangeEvent: EventEmitter<any> = new EventEmitter(true);
  @Output() playPauseEvent: EventEmitter<any> = new EventEmitter(true);
  @Output() currentVideoText: EventEmitter<any> = new EventEmitter(true);

  constructor(
    public notificationService: NotificationService,
    public browserNotification: BrowserNotificationService,
    private socketService: SocketService
  ) {
    this.isHolder = localStorage.getItem("holder");
  
  }
  createPlayer(): void {
    let interval = setInterval(() => {
      if ((typeof _window.YT !== 'undefined') && _window.YT && _window.YT.Player) {
        this.yt_player = new _window.YT.Player('yt-player', {
          width: '440',
          height: '250',
          playerVars: { 'origin':'http://192.168.1.7:4200/' },
          events: {
            onStateChange: (ev) => {
              this.onPlayerStateChange(ev);
            },
            onError: (ev) => {
              this.videoChangeEvent.emit(true);
            }
          }
        });
        clearInterval(interval);
      }
    }, 100);
  }

  onPlayerStateChange(event: any) {
    const state = event.data;
    switch (state) {
      case 0:
        this.videoChangeEvent.emit(true);
        this.playPauseEvent.emit('pause');
        break;
      case 1:
        this.playPauseEvent.emit('play');
        break;
      case 2:
        this.playPauseEvent.emit('pause');
        break;
    }
  }

  playVideo(videoId: string, videoText?: string): void {
    if(!this.isHolder) return;
    if (!this.yt_player) {
      this.notificationService.showNotification('Player not ready.');
      return;
    }
    this.yt_player.loadVideoById(videoId);
    this.socketService.setCurrent({
      videoId: videoId,
      videoText: videoText
    });
  }

  pausePlayingVideo(): void {
    this.yt_player.pauseVideo();
  }

  playPausedVideo(): void {
    this.yt_player.playVideo();
  }

  requestCurrent(room):void {
    if(!this.currentVideoId) return;
    this.socketService.setCurrent({
      videoId: this.currentVideoId,
      videoText: this.currentVideoName,
      room: room
    })
  }

  setCurrent(obj):void {
    this.currentVideoId = obj.videoId;
    this.currentVideoName = obj.videoText;
    this.currentVideoText.emit(obj.videoText);
    this.browserNotification.show(obj.videoText);
  }

  getCurrentVideo(): string {
    return this.currentVideoId;
  }

  resizePlayer(width: number, height: number) {
    this.yt_player.setSize(width, height);
  }

  getShuffled(index: number, max: number): number {
    if (max < 2) {
      return;
    }

    let i = Math.floor(Math.random() * max);
    return i !== index ? i : this.getShuffled(index, max);
  }
}
