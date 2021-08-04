import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {ChatService} from '../../services/chat.service';
import {Message} from '../../models/model.dto';
import {VoteOneComponent} from '../voteOne/voteOne.component';
import {VoteTwoComponent} from '../voteTwo/voteTwo.component';
import {WaitTwoComponent} from '../waitTwo/waitTwo.component';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html'
})
export class StartComponent implements OnInit {
  faza: number;
  @ViewChild(VoteOneComponent)
  voteOneComponent: VoteOneComponent;
  @ViewChild(WaitTwoComponent)
  waitTwoComponent: WaitTwoComponent;
  constructor(
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
    this.subscribeToEvents();
  }

  ngOnInit(): void {
    this.faza = 1;
  }

  private subscribeToEvents(): void {
    console.log('хаб сработал');
    this.hubService.messageReceived.subscribe((message: Message) => {
      this._ngZone.run(() => {
        console.log('Сработало обновление');
        this.getFaza();
      });
    });
  }

  getFaza() {
    if(this.service.user.id != null || this.service.user.id != undefined) {
      this.service.getFaza(this.service.user).subscribe(data => {
        this.faza = data;
        if(this.faza == 3){
            this.voteOneComponent.getFirstVote();
        }
        if(this.faza == 6){
          this.waitTwoComponent.getListParty();
        }
      });
    }
  }

  setLogin(event){
    this.faza = event;
    if(this.faza == 2){
      this.getFaza();
    }
  }

  onStartFazaOne(event) {
    this.hubService.sendMessage(new Message());
    this.doTimer(event);
  }
  async doTimer(time: number) {
    await this.delay(time * 60000 + 5);
    this.service.setFaza5().subscribe(data => {
      if (data) {
        this.hubService.sendMessage(new Message());
        this.getTimeTwo();
      }
    });
  }
  async doTimer2(time: number) {
    await this.delay(time * 60000 + 5);
    this.service.setFaza2().subscribe(data => {
      if (data) {
        this.hubService.sendMessage(new Message());
      }
    });
  }
  delay(delay: number) {
    return new Promise(r => {
      setTimeout(r, delay);
    });
  }
  getTimeTwo(){
    this.service.getTimeTwo().subscribe(data => {
      this.doTimer2(data);
    });
  }
}


