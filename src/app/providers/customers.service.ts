import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { createFormData } from '../../app/components/utils/index';
import { AuthService } from '../components/auth/auth.service';
import { environment } from '../../environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  getCustomers(query?: {}) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    const data = createFormData(query);
   
    return this.http.get(environment.APIURI + 'customers?' + data, { headers });
  }


  getCustomer(id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    return this.http.get(environment.APIURI + 'customers/' + id, { headers });
  }

  updateCustomer(id: string, update) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });

    console.log(id,update, this.auth.returnToken())
    return this.http.put(environment.APIURI + 'customers/' + id, update, { headers });
  }
  createCustomer(user) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    return this.http.post(environment.APIURI + 'customers', user, { headers });
  }
  public deleteCustomer(id: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    return this.http.delete(environment.APIURI + 'customers/' + id, { headers });
  }


  //lista orden
  public getOrders() {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', Authorization: this.auth.returnToken() });
    return this.http.get(environment.APIURI + 'order' );
  }
}
