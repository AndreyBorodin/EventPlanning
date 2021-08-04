import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
import {EventPlan, Message, SecondVote} from '../../models/model.dto';

@Component({
  selector: 'app-vote-two',
  templateUrl: './voteTwo.component.html'
})
export class VoteTwoComponent implements OnInit {
  timer: number;
  minutes: number;
  seconds: number;
  planLider: EventPlan;
  listParty: string;

  constructor(
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getTimeTwo();
    this.getPlanLider();
    this.getListParty();
  }
  getTimeTwo(){
    this.service.getTimeTwo().subscribe(data => {
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
  getPlanLider(){
    this.service.getPlanLider().subscribe(data => {
      this.planLider = data;
    });
  }
  getListParty(){
    this.service.getListParty().subscribe(data => {
      this.listParty = data;
    });
  }

  yesAnswer() {
    const secondVote: SecondVote = new SecondVote();
    secondVote.idUserName = this.service.user.id;
    secondVote.consent = true;
    this.service.givetVote2(secondVote).subscribe(data => {
      if (data) {
        this.hubService.sendMessage(new Message());
      }
    });
  }

  noAnswer() {
    const secondVote: SecondVote = new SecondVote();
    secondVote.idUserName = this.service.user.id;
    secondVote.consent = false;
    this.service.givetVote2(secondVote).subscribe(data => {
      if (data) {
        this.hubService.sendMessage(new Message());
      }
    });
  }
}
