import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
import {EventPlan, FirstVote, Message} from '../../models/model.dto';

@Component({
  selector: 'app-wait-two',
  templateUrl: './waitTwo.component.html'
})
export class WaitTwoComponent implements OnInit {
  minutes: number;
  seconds: number;
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
    this.service.getListParty2().subscribe(data => {
      this.listParty = data;
    });
  }
}
