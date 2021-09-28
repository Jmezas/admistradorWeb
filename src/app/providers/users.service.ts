import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createFormData } from '../../app/components/utils/index';
import { AuthService } from '../components/auth/auth.service';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private auth: AuthService) { }

 getUsers(query?: {}) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    const data = createFormData(query);
   
    return this.http.get(environment.APIURI + 'users?' + data);
  }

  getUser(id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    return this.http.get(environment.APIURI + 'users/' + id, { headers });
  }

  updateUser(id: string, update) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });

    console.log(id,update, this.auth.returnToken())
    return this.http.put(environment.APIURI + 'users/' + id, update, { headers });
  }
  createUser(user) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    return this.http.post(environment.APIURI + 'users', user, { headers });
  }
  public deleteUser(id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    return this.http.delete(environment.APIURI + 'users/' + id, { headers });
  }
}
