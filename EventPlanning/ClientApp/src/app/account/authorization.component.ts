import {Component, NgZone, OnInit, Output, EventEmitter} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {SharedService} from '../../services/shared.service';
import {User} from '../../models/model.dto';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html'
})
export class AuthorizationComponent implements OnInit {
  user: User;
  @Output()
  onLogin = new EventEmitter();

  constructor(
    private hubService: ChatService,
    private service: SharedService,
    private _ngZone: NgZone
  ) {
  }

  ngOnInit(): void {
    this.user = this.service.user;
  }
  enter() {
    this.service.getAccount(this.user).subscribe(data => {
      if (data != null) {
        this.service.user = data;
        this.onLogin.emit(2);
      } else {
        this.user = new User();
        this.user.login = 'Нет такого';
        this.user.password = 'пользователя';
      }
    });
  }
  onRegistration() {
    this.onLogin.emit(0);
  }
}
