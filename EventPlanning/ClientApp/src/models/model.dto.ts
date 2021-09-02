export class Message {
  type: string;
  timerOne: number;
  timerTwo: number;
  currently: number;
}
export class User {
  id: string;
  login: string;
  userName: string;
  password: string;
  constructor(
  ) {
    this.userName = '';
    this.password = '';
    this.login = '';
  }
}
export class EventPlan {
  id: string;
  name: string;
  constructor(
  ) {
    this.name = '';
  }
}
export class FirstVote {
  id: string;
  userId: string;
  eventPlanId: string;
  name: string;
  consent: boolean;
  constructor() {
    this.consent = false;
  }
}
export class SecondVote {
  id: string;
  consent: boolean;
  userId: string;
}





