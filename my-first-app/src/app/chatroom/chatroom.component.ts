import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

interface User{
  id:string;
  name:string;
}

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {

  mymessage =''

  messages:string[] =[]

  users!:User[];

  selected ='';

  selectedUser!:User

  constructor(private chatService:ChatService) {

  }


  ngOnInit(): void {
    this.chatService.getUser().subscribe(data =>{
      this.users = data;
    })
    this.chatService.joinMsg().subscribe(data =>{
      this.messages.push(data)
    })
    this.chatService.onReciveMsg().subscribe(data =>{
      this.messages.push(data)
    })
    this.chatService.leftMsg().subscribe(data =>{
      this.messages.push(data)
    })
  }

  startChat(user:User){
      this.selectedUser={
        id:user.id,
        name:user.name
        }
      this.selected = user.name
  }
  send(){
    this.chatService.sendMsg(this.selectedUser.id ,this.selected,this.mymessage);
  }

  leave(){
    this.chatService.leaveRoom(this.selectedUser.id);
    this.users= this.users.filter(e => e.name != this.selected);
  }
  showClass(user:User):string{
    if(user.name === this.selected){
      return 'active'
    }
    return '';
  }
}
