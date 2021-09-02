import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {MessageService} from '../../services/message.service';
import {FirstVote, Message} from '../../models/model.dto';

@Component({
  selector: 'app-vote-one',
  templateUrl: './voteOne.component.html'
})
export class VoteOneComponent implements OnInit {
  minutes: number = 0;
  seconds: number = 0;
  countVoted: number = 0;
  firstVotes: FirstVote[];

  constructor(
    private messageService: MessageService,
    private sharedService: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getFirstVote();
    this.getCountVoted();
  }
  getFirstVote(){
    this.sharedService.getFirstVote().subscribe(data => {
      this.firstVotes = data;
    });
  }
  getCountVoted(){
    this.sharedService.getCountVoted().subscribe(data => {
      this.countVoted = data;
    });
  }

  addVoice() {
    let firstVotesNew: FirstVote[] = [];
    for (let item of this.firstVotes ){
      if(item.consent || item.eventPlanId == null || item.eventPlanId == undefined){
        item.userId = this.sharedService.user.id;
        firstVotesNew.push(item);
      }
    }
    this.sharedService.addVoteOne(firstVotesNew).subscribe(data => {
      this.messageService.sendMessage(new Message());
    });
  }

  addPlan() {
    const eventPl = new FirstVote();
    eventPl.name = 'место';
    this.firstVotes.push(eventPl);
  }
}
