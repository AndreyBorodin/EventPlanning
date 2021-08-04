import {Component, EventEmitter, NgZone, OnInit, Output} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {SharedService} from '../../services/shared.service';
import {EventPlan, StartVote} from '../../models/model.dto';


@Component({
  selector: 'app-create-vote',
  templateUrl: './createVote.component.html'
})
export class CreateVoteComponent implements OnInit {
  eventPlans: EventPlan[];
  timeFazaOne: number;
  timeFazaTwo: number;
  @Output()
  onStartFazaOne = new EventEmitter();
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
  }

  addPlan() {
    const eventPlan = new EventPlan();
    eventPlan.name = 'место';
    this.eventPlans.push(eventPlan);
  }

  startVote() {
      const startVote = new StartVote();
      startVote.eventPlans = this.eventPlans;
      startVote.timeFazaOne = this.timeFazaOne;
      startVote.timeFazaTwo = this.timeFazaTwo;
      this.service.startVote(startVote).subscribe(data => {
        if (data) {
          this.onStartFazaOne.emit(this.timeFazaOne);
        }
      });
  }
}
