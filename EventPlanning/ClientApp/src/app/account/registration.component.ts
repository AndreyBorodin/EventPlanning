import {Component, NgZone, OnInit, Output, EventEmitter} from '@angular/core';
import {ChatService} from '../../services/chat.service';
import {SharedService} from '../../services/shared.service';
import {User} from '../../models/model.dto';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'
})
export class RegistrationComponent implements OnInit {
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
    this.user = new User();
  }
  onRegistr() {
    if(this.user.login != '' && this.user.password != '' && this.user.userName != '') {
      this.service.addUser(this.user).subscribe(data => {
        if (data != null) {
          this.service.user.login = this.user.login;
          this.service.user.password = this.user.password;
          this.onLogin.emit(1);
        }
      });
    }
  }
  onAutor() {
    this.onLogin.emit(1);
  }

}
