import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NotFoundComponent } from "./not-found/not-found.component";
import { ChatFormComponent } from "./chat-form/chat-form.component";
import { HomeComponent } from "./home/home.component";
import { ChatroomComponent } from "./chatroom/chatroom.component";




const route:Routes=[
  {path:'',component:HomeComponent},
  {path:'form',component:ChatFormComponent},
  {path:'room',component:ChatroomComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',redirectTo:'not-found'}
]
@NgModule({
  imports:[RouterModule.forRoot(route)],
  exports:[RouterModule]
})
export class RoutingModule{

}
