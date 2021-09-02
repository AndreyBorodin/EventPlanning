import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {EventPlan} from '../../models/model.dto';

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
    private sharedService: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.getPlanLeader();
    this.getListParty();
  }
  getPlanLeader(){
    this.sharedService.getPlanLeader().subscribe(data => {
      this.planLeader = data;
    });
  }
  getListParty(){
    this.sharedService.getListParty2().subscribe(data => {
      this.listParty = data;
    });
  }
}
