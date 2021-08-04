import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
import {FirstVote, Message} from '../../models/model.dto';

@Component({
  selector: 'app-wait-one',
  templateUrl: './waitOne.component.html'
})
export class WaitOneComponent implements OnInit {
  timer: number;
  minutes: number;
  seconds: number;

  constructor(
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.doTimer();
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
}
