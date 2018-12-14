import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService {

  constructor(
    private socket: Socket
  ) { }

  init() {
  	let isHolder = localStorage.getItem("holder");
  	if(isHolder) {
  		this.socket.emit("holderRoom");
  	}
  	else {
  		this.socket.emit("requestSync");
  	}
  }

  suggestVideo(youtubeData) {
    this.socket.emit("suggestVideo", youtubeData);
  }
  addVideo(youtubeData) {
    this.socket.emit("addVideo", youtubeData);
  }
  setCurrent(obj) {
    this.socket.emit("setCurrent", obj);
  }
  grantSync(data) {
    this.socket.emit("grantSync", data);
  }
  getCurrent() {
    this.socket.emit("getCurrent");
  }
  clearPlaylist() {
    this.socket.emit("clear");
  }



  onRequestSync() {
  	return this.socket.fromEvent("requestSync");
  }
  onSuggestVideo() {
  	return this.socket.fromEvent("suggestVideo");
  }
  onAddVideo() {
    return this.socket.fromEvent("addVideo");
  }
  onSetCurrent() {
    return this.socket.fromEvent("setCurrent");
  }
  onGrantSync() {
    return this.socket.fromEvent("grantSync");
  }
  onGetCurrent() {
    return this.socket.fromEvent("getCurrent");
  }
  onClearPlaylist() {
    return this.socket.fromEvent("clear");
  }

}
