import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
import {Message} from '../../models/model.dto';
import {VoteOneComponent} from '../voteOne/voteOne.component';
import {VoteTwoComponent} from '../voteTwo/voteTwo.component';
import {WaitTwoComponent} from '../waitTwo/waitTwo.component';
import {WaitOneComponent} from '../waitOne/waitOne.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {
  phase: number;
  @ViewChild(VoteOneComponent)
  voteOneComponent: VoteOneComponent;
  @ViewChild(VoteTwoComponent)
  voteTwoComponent: VoteTwoComponent;
  @ViewChild(WaitOneComponent)
  waitOneComponent: WaitOneComponent;
  @ViewChild(WaitTwoComponent)
  waitTwoComponent: WaitTwoComponent;
  constructor(
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }

  ngOnInit(): void {
    this.phase  = 1;
  }

  private subscribeToEvents(): void {
    console.log('хаб сработал');
    this.hubService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        console.log('Сработало обновление');
        console.log(message);
        if(message.type == 'messege'){
          this.getPhase();
        }
        if(message.type == 'timerOne'){
          let minutes = Math.trunc(message.currently / 60);
          let seconds = message.currently  - minutes * 60;
          if(this.phase  == 3 && this.voteOneComponent != null && this.voteOneComponent != undefined) {
            this.voteOneComponent.minutes = minutes;
            this.voteOneComponent.seconds = seconds;
          }
          if(this.phase  == 4 && this.waitOneComponent != null && this.waitOneComponent != undefined) {
            this.waitOneComponent.minutes = minutes;
            this.waitOneComponent.seconds = seconds;
          }
        }
        if(message.type == 'timerTwo'){
          console.log('Ну мы тут');
          let minutes = Math.trunc(message.currently / 60);
          let seconds = message.currently  - minutes * 60;
          console.log('Ну мы тут2');
          if(this.phase  == 5 && this.voteTwoComponent != null && this.voteTwoComponent != undefined) {
            this.voteTwoComponent.minutes = minutes;
            this.voteTwoComponent.seconds = seconds;
            console.log(message);
          }
          if(this.phase  == 6 && this.waitTwoComponent != null && this.waitTwoComponent != undefined) {
            this.waitTwoComponent.minutes = minutes;
            this.waitTwoComponent.seconds = seconds;
            console.log(message);
          }
        }
      });
    });
  }

  getPhase() {
    if(this.service.user.id != null || this.service.user.id != undefined) {
      this.service.getPhase(this.service.user).subscribe(data => {
        this.phase  = data;
        if(this.phase  == 3){
          this.voteOneComponent.getFirstVote();
          this.voteOneComponent.getCountVoted();
        }
        if(this.phase  == 4){
          this.waitOneComponent.getCountVoted();
        }
        if(this.phase  == 6){
          this.waitTwoComponent.getListParty();
        }
      });
    }
  }

  setLogin(event){
    this.phase = event;
    if(this.phase == 2){
      this.getPhase();
    }
  }
}


