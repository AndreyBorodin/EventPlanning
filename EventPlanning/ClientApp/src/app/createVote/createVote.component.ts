import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {MessageService} from '../../services/message.service';
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
    private messageService: MessageService,
    private timerService: TimerService,
    private sharedService: SharedService,
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
    this.sharedService.getListParty2().subscribe(data => {
      this.listParty = data;
    });
  }
  addPlan() {
    const eventPlan = new EventPlan();
    eventPlan.name = 'место';
    this.eventPlans.push(eventPlan);
  }

  startVote() {
      let message = new Message();
      message.timerOne = this.timePhaseOne * 60;
      message.timerTwo = this.timePhaseTwo * 60;
      this.sharedService.startVote(this.eventPlans).subscribe(data => {
        if (data) {
          this.messageService.sendMessage(message);
          this.timerService.startTimer(message);
        }
      });
  }
}
