import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import io from 'socket.io-client';

interface User {
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  users: User[] = [];

  URL = 'http://localhost:3000';

  socket = io(this.URL, { autoConnect: false });

  onJoin(name: string, room: string) {
    this.socket.auth = { name };
    this.socket.connect();
    this.socket.emit('join', { name, room });
  }

  joinMsg() {
    let newRoom = new Observable<string>((observer) => {
      this.socket.on('join-message', (data) => {
        observer.next(data);
      });
    });
    return newRoom;
  }
  sendMsg(id: string, name: string, message: string) {
    console.log(message);
    this.socket.emit('new-msg', { id, name, message });
  }
  onReciveMsg() {
    let newMsg = new Observable<string>((observer) => {
      this.socket.on('show-msg', (data) => {
        observer.next(data);
      });
    });
    return newMsg;
  }
  leaveRoom(id: string) {
    this.socket.emit('leave', { id });
    this.socket.disconnect();
  }
  leftMsg() {
    let leaveMsg = new Observable<string>((observer) => {
      this.socket.on('leave-msg', (data) => {
        observer.next(data);
      });
    });
    return leaveMsg;
  }
  getUser() {
    let userData = new Observable<User[]>((observer) => {
      this.socket.on('users', (data) => {
        observer.next(data);
      });
    });
    return userData;
  }
  firstUser() {
    this.socket.on('new-user', (data) => {
      this.users = data;
    });
    return this.users;
  }
}
