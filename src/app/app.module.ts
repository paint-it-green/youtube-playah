import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
// Libraries
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// Components
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { VideosListComponent } from './main/videos-list/videos-list.component';
import { VideosPlaylistComponent } from './main/videos-playlist/videos-playlist.component';
import { VideosSearchComponent } from './main/videos-search/videos-search.component';
import { VideoPlayerComponent } from './main/video-player/video-player.component';
// Services
import { YoutubeApiService } from './shared/services/youtube-api.service';
import { YoutubePlayerService } from './shared/services/youtube-player.service';
import { PlaylistStoreService } from './shared/services/playlist-store.service';
import { NotificationService } from './shared/services/notification.service';
import { BrowserNotificationService } from './shared/services/browser-notification.service';
import { SocketService } from './shared/services/socket.service';
import { HolderSocketService } from './shared/services/holder-socket.service';
// Pipes
import { VideoDurationPipe } from './shared/pipes/video-duration.pipe';
import { VideoLikesViewsPipe } from './shared/pipes/video-likes-views.pipe';
import { VideoNamePipe } from './shared/pipes/video-name.pipe';
import { LazyScrollDirective } from './shared/directives/lazy-scroll/lazy-scroll.directive';

const config: SocketIoConfig = { url: 'https://youtube-playah-socket.herokuapp.com/', options: {transports: ['websocket', 'polling', 'flashsocket']} };

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    AppComponent,
    MainComponent,

    VideosListComponent,
    VideosSearchComponent,
    VideoPlayerComponent,
    VideosPlaylistComponent,

    VideoDurationPipe,
    VideoLikesViewsPipe,
    VideoNamePipe,

    LazyScrollDirective
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    YoutubeApiService,
    YoutubePlayerService,
    PlaylistStoreService,
    NotificationService,
    BrowserNotificationService,
    SocketService,
    HolderSocketService,
    {
      provide: "_HOLDER_SOCKET_URL_",
      useValue: "http://192.168.1.9:5000/holder"
    }
  ]
})
export class AppModule {
}
