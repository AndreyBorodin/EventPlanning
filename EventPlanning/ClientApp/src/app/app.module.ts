import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatService } from '../services/chat.service';
import {StartComponent} from './start/start.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {SharedService} from '../services/shared.service';
import {AuthorizationComponent} from './account/authorization.component';
import {RegistrationComponent} from './account/registration.component';
import {CreateVoteComponent} from './createVote/createVote.component';
import {VoteOneComponent} from './voteOne/voteOne.component';
import {WaitOneComponent} from './waitOne/waitOne.component';
import {VoteTwoComponent} from './voteTwo/voteTwo.component';
import {WaitTwoComponent} from './waitTwo/waitTwo.component';
import {TimerService} from '../services/timerhum.service';


@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    AuthorizationComponent,
    RegistrationComponent,
    CreateVoteComponent,
    VoteOneComponent,
    WaitOneComponent,
    VoteTwoComponent,
    WaitTwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [ChatService, SharedService, TimerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
