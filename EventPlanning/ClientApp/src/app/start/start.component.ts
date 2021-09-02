import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {MessageService} from '../../services/message.service';
import {Message} from '../../models/model.dto';
import {VoteOneComponent} from '../voteOne/voteOne.component';
import {VoteTwoComponent} from '../voteTwo/voteTwo.component';
import {WaitTwoComponent} from '../waitTwo/waitTwo.component';
import {WaitOneComponent} from '../waitOne/waitOne.component';
import {TimerService} from '../../services/timerhum.service';

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
    private messageService: MessageService,
    private sharedService: SharedService,
    private timerService: TimerService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
    this.subscribeToEventsTimer();
  }

  ngOnInit(): void {
    this.phase  = 1;
  }

  private subscribeToEvents(): void {
    console.log('хаб сработал');
    this.messageService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        console.log('Сработало обновление');
        console.log(message);
        this.getPhase();
      });
    });
  }
  private subscribeToEventsTimer(): void {
    console.log('хаб сработал');
    this.timerService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        console.log('Сработало обновление');
        if(message.type == 'message'){
          this.getPhase();
        }
        else if(message.type == 'timerOne'){
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
        else{
          let minutes = Math.trunc(message.currently / 60);
          let seconds = message.currently  - minutes * 60;
          if(this.phase  == 5 && this.voteTwoComponent != null && this.voteTwoComponent != undefined) {
            this.voteTwoComponent.minutes = minutes;
            this.voteTwoComponent.seconds = seconds;
          }
          if(this.phase  == 6 && this.waitTwoComponent != null && this.waitTwoComponent != undefined) {
            this.waitTwoComponent.minutes = minutes;
            this.waitTwoComponent.seconds = seconds;
          }
        }
      });
    });
  }

  getPhase() {
    if(this.sharedService.user.id != null || this.sharedService.user.id != undefined) {
      this.sharedService.getPhase(this.sharedService.user).subscribe(data => {
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

  setEntry(){
    this.getPhase();
  }
  setRegisrration(){
    this.phase = 0;
  }
  setAuthorization(){
    this.phase = 1;
  }
}


