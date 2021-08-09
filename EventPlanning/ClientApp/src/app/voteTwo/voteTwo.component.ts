import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
import {EventPlan, Message, SecondVote} from '../../models/model.dto';

@Component({
  selector: 'app-vote-two',
  templateUrl: './voteTwo.component.html'
})
export class VoteTwoComponent implements OnInit {
  minutes: number = 0;
  seconds: number = 0;
  planLeader: EventPlan;
  listParty: string;

  constructor(
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getPlanLeader();
    this.getListParty();
  }
  getPlanLeader(){
    this.service.getPlanLeader().subscribe(data => {
      this.planLeader = data;
    });
  }
  getListParty(){
    this.service.getListParty().subscribe(data => {
      this.listParty = data;
    });
  }

  yesAnswer() {
    const secondVote: SecondVote = new SecondVote();
    secondVote.idUser = this.service.user.id;
    secondVote.consent = true;
    this.service.addVoteTwo(secondVote).subscribe(data => {
    });
  }

  noAnswer() {
    const secondVote: SecondVote = new SecondVote();
    secondVote.idUser = this.service.user.id;
    secondVote.consent = false;
    this.service.addVoteTwo(secondVote).subscribe(data => {
    });
  }
}
