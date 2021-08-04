import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
import {EventPlan, FirstVote, Message} from '../../models/model.dto';

@Component({
  selector: 'app-wait-two',
  templateUrl: './waitTwo.component.html'
})
export class WaitTwoComponent implements OnInit {
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
    this.doTimer();
    this.getPlanLider();
    this.getListParty();
  }
  async doTimer() {
    this.timer = this.service.timer;
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
    this.service.getListParty2().subscribe(data => {
      this.listParty = data;
    });
  }
}
