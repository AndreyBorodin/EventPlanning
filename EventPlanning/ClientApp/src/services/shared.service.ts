import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/model.dto';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public user: User = new User();
  public timer: number;
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) { }

  getAccount(val: any): Observable<any> {
    return this.http.post<any>('/Planning/login', val);
  }
  addUser(val: any) {
    return this.http.post('/Planning/addUser', val);
  }
  getPhase(val: User): Observable<any> {
    return this.http.post<any>('/Planning/getPhase', val);
  }
  startVote(val: any) {
    return this.http.post('/Planning/startVote', val);
  }
  addVoteOne(val: any) {
    return this.http.post('/Planning/addVoteOne', val);
  }
  addVoteTwo(val: any) {
    return this.http.post('/Planning/addVoteTwo', val);
  }
  getFirstVote(): Observable<any> {
    return this.http.get<any>('/Planning/getFirstVote');
  }
  getPlanLeader(): Observable<any> {
    return this.http.get<any>('/Planning/getPlanLeader');
  }
  getListParty(): Observable<any> {
    return this.http.get<any>('/Planning/getListParty');
  }
  getListParty2(): Observable<any> {
    return this.http.get<any>('/Planning/getListParty2');
  }
  getCountVoted(): Observable<any> {
    return this.http.get<any>('/Planning/getCountVoted');
  }
}
