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
  getFaza(val: User): Observable<any> {
    return this.http.post<any>('/Planning/getFaza', val);
  }
  startVote(val: any) {
    return this.http.post('/Planning/startVote', val);
  }
  setFaza5(): Observable<any> {
    return this.http.get<any>('/Planning/setFaza5');
  }
  setFaza2(): Observable<any> {
    return this.http.get<any>('/Planning/setFaza2');
  }
  getTimeOne(): Observable<any> {
    return this.http.get<any>('/Planning/getTimeOne');
  }
  getTimeTwo(): Observable<any> {
    return this.http.get<any>('/Planning/getTimeTwo');
  }
  givetVote(val: any) {
    return this.http.post('/Planning/givetVote', val);
  }
  givetVote2(val: any) {
    return this.http.post('/Planning/givetVote2', val);
  }
  getFirstVote(): Observable<any> {
    return this.http.get<any>('/Planning/getFirstVote');
  }
  getPlanLider(): Observable<any> {
    return this.http.get<any>('/Planning/getPlanLider');
  }
  getListParty(): Observable<any> {
    return this.http.get<any>('/Planning/getListParty');
  }
  getListParty2(): Observable<any> {
    return this.http.get<any>('/Planning/getListParty2');
  }
}
