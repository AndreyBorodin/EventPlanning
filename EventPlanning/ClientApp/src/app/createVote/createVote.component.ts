import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {SharedService} from '../../services/shared.service';
import {EventPlan, Message} from '../../models/model.dto';
import {TimerService} from '../../services/timerhum.service';


@Component({
  selector: 'app-create-vote',
  templateUrl: './createVote.component.html'
})
export class CreateVoteComponent implements OnInit {
  eventPlans: EventPlan[];
  timePhaseOne: number;
  timePhaseTwo: number;
  listParty: string = '';
  constructor(
    private hubService: ChatService,
    private timerService: TimerService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.eventPlans = [];
    this.timePhaseOne = 5;
    this.timePhaseTwo = 5;
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
      messege.timerOne = this.timePhaseOne * 60;
      messege.timerTwo = this.timePhaseTwo * 60;
      this.service.startVote(this.eventPlans).subscribe(data => {
        if (data) {
          this.hubService.sendMessage(messege);
          this.timerService.startTimer(messege);
        }
      });
  }
}
