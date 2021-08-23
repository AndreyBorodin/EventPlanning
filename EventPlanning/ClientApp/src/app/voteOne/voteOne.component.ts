import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
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
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getFirstVote();
    this.getCountVoted();
  }
  getFirstVote(){
    this.service.getFirstVote().subscribe(data => {
      this.firstVotes = data;
    });
  }
  getCountVoted(){
    this.service.getCountVoted().subscribe(data => {
      this.countVoted = data;
    });
  }

  addVoice() {
    let firstVotesNew: FirstVote[] = [];
    for (let item of this.firstVotes ){
      if(item.consent || item.idEventsPlan == null || item.idEventsPlan == undefined){
        item.idUser = this.service.user.id;
        firstVotesNew.push(item);
      }
    }
    this.service.addVoteOne(firstVotesNew).subscribe(data => {
      this.hubService.sendMessage(new Message());
    });
  }

  addPlan() {
    const eventPl = new FirstVote();
    eventPl.name = 'место';
    this.firstVotes.push(eventPl);
  }
}
