import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {MessageService} from '../../services/message.service';
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
    private messageService: MessageService,
    private sharedService: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getPlanLeader();
    this.getListParty();
  }
  getPlanLeader(){
    this.sharedService.getPlanLeader().subscribe(data => {
      this.planLeader = data;
    });
  }
  getListParty(){
    this.sharedService.getListParty().subscribe(data => {
      this.listParty = data;
    });
  }

  yesAnswer() {
    const secondVote: SecondVote = new SecondVote();
    secondVote.userId = this.sharedService.user.id;
    secondVote.consent = true;
    this.sharedService.addVoteTwo(secondVote).subscribe(data => {
      this.messageService.sendMessage(new Message());
    });
  }

  noAnswer() {
    const secondVote: SecondVote = new SecondVote();
    secondVote.userId = this.sharedService.user.id;
    secondVote.consent = false;
    this.sharedService.addVoteTwo(secondVote).subscribe(data => {
      this.messageService.sendMessage(new Message());
    });
  }
}
