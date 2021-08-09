import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {SharedService} from '../../services/shared.service';
import {EventPlan, Message} from '../../models/model.dto';


@Component({
  selector: 'app-create-vote',
  templateUrl: './createVote.component.html'
})
export class CreateVoteComponent implements OnInit {
  eventPlans: EventPlan[];
  timeFazaOne: number;
  timeFazaTwo: number;
  listParty: string = '';
  constructor(
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.eventPlans = [];
    this.timeFazaOne = 5;
    this.timeFazaTwo = 5;
    this.getListParty();
  }
  getListParty(){
    this.service.getListParty2().subscribe(data => {
      this.listParty = data;
    });
  }
  addPlan() {
    const eventPlan = new EventPlan();
    eventPlan.name = 'место';
    this.eventPlans.push(eventPlan);
  }

  startVote() {
      let messege = new Message();
      messege.timerOne = this.timeFazaOne * 60;
      messege.timerTwo = this.timeFazaTwo * 60;
      this.service.startVote(this.eventPlans).subscribe(data => {
        if (data) {
          this.hubService.startTimer(messege);
        }
      });
  }
}
