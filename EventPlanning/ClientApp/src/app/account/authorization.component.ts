import {Component, NgZone, OnInit, Output, EventEmitter} from '@angular/core';
import {SharedService} from '../../services/shared.service';
import {User} from '../../models/model.dto';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent implements OnInit {
  user: User;
  @Output()
  onEntry = new EventEmitter();
  @Output()
  onRegistration = new EventEmitter();

  constructor(
    private sharedService: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.user = this.sharedService.user;
  }
  enter() {
    this.sharedService.getAccount(this.user).subscribe(data => {
      if (data != null) {
        this.sharedService.user = data;
        this.onEntry.emit();
      } else {
        this.user = new User();
        this.user.login = 'Нет такого';
        this.user.password = 'пользователя';
      }
    });
  }
  registration() {
    this.onRegistration.emit();
  }
}
