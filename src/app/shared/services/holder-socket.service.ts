import { Injectable, Inject } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class HolderSocketService extends Socket {

  constructor(
    @Inject("_HOLDER_SOCKET_URL_") private holderurl: string,
    private socket: Socket
  ) {
    super({ url: holderurl, options: {} });
  }

  init() {
    this.socket.emit("join");
  }

  onSuggestedVideo() {
    return this.socket.fromEvent("suggestVideo");
  }

  addVideo(youtubeData) {
    this.socket.emit("addVideo", youtubeData);
  }

}
