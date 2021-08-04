import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
import {FirstVote, Message} from '../../models/model.dto';

@Component({
  selector: 'app-vote-one',
  templateUrl: './voteOne.component.html'
})
export class VoteOneComponent implements OnInit {
  timer: number;
  minutes: number;
  seconds: number;
  firstVotes: FirstVote[];

  constructor(
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getFirstVote();
    this.getTimeOne();
  }
  getFirstVote(){
    this.service.getFirstVote().subscribe(data => {
      this.firstVotes = data;
    });
  }
  getTimeOne(){
    this.service.getTimeOne().subscribe(data => {
      this.timer = data;
      this.doTimer();
    });
  }
  async doTimer() {
    this.timer = this.timer * 60;
    while(this.timer > 0) {
      this.minutes = Math.trunc(this.timer / 60);
      this.seconds = this.timer  - this.minutes * 60;
      this.service.timer = this.timer;
      this.timer--;
      await this.delay(1000);
    }
  }
  delay(delay: number) {
    return new Promise(r => {
      setTimeout(r, delay);
    });
  }

  addVoice() {
    let firstVotesNew: FirstVote[] = [];
    for (let item of this.firstVotes ){
      if(item.consent || item.idEventsPlan == null || item.idEventsPlan == undefined){
        item.idUserName = this.service.user.id;
        firstVotesNew.push(item);
      }
    }
    this.service.givetVote(firstVotesNew).subscribe(data => {
      if (data) {
        this.hubService.sendMessage(new Message());
      }
    });
  }

  addPlan() {
    const eventPl = new FirstVote();
    eventPl.name = 'место';
    this.firstVotes.push(eventPl);
  }
}
