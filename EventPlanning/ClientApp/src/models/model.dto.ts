export class Message {
  clientuniqueid: string;
  type: string;
  message: string;
  date: Date;
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
  idUserName: string;
  idEventsPlan: string;
  name: string;
  consent: boolean;
  constructor() {
    this.consent = false;
  }
}
export class SecondVote {
  id: string;
  consent: boolean;
  idUserName: string;
}
export class StartVote {
  eventPlans: EventPlan[];
  timeFazaOne: number;
  timeFazaTwo: number;
}





