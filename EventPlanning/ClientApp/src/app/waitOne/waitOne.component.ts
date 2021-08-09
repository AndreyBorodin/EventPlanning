import {Component, NgZone, OnInit} from '@angular/core';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-wait-one',
  templateUrl: './waitOne.component.html'
})
export class WaitOneComponent implements OnInit {
  minutes: number = 0;
  seconds: number = 0;
  countVoted: number = 0;

  constructor(
    private service: SharedService
  ) {
  }

  ngOnInit(): void {
    this.getCountVoted();
  }
  getCountVoted(){
    this.service.getCountVoted().subscribe(data => {
      this.countVoted = data;
    });
  }
}
