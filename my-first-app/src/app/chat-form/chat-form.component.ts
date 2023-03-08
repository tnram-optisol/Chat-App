import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  messages:string[] =[]

  user!:string;
  room!:string;


  mymessage =''

  constructor(private chatService:ChatService, private route:Router) { }

  ngOnInit(): void {

  }
  onSubmit(regForm: NgForm, event: Event) {
    this.chatService.onJoin(regForm.value.name , regForm.value.room);
    this.route.navigate(['/room'])
  }

}
