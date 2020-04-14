import { Injectable } from '@angular/core';
import {environment} from '../environments/environment'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

registerUser(data) {
  console.log('data',data)
  return this.http.post(environment.BASE_URL+'api/registration/register/',data);
}

UserLogin(data) {
  return this.http.post(environment.BASE_URL+'api/registration/login/',data)
}
}
