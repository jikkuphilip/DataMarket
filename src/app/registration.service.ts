import { Injectable } from '@angular/core';
import {environment} from '../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http';

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

fileUpload(data) {
  const formData: FormData = new FormData();
    formData.append('title', data.title)
    formData.append('file_upload', data.myFile, data.myFile.name);
    formData.append('email',localStorage.getItem('email'))
  return this.http.post(environment.BASE_URL+'api/file-upload/', formData)
}

getBatchList () {
  return this.http.get(environment.BASE_URL+'api/list-verify/');
}

batchVerification() {
  let filter: any = {limit: 100}
  return this.http.get<any>(environment.BASE_URL+'api/verify/verify/', {params: {limit: '100'}});
}

fileList () {
  return this.http.get(environment.BASE_URL+'api/file-list/');
}

fileDownload () {
  return this.http.get(environment.BASE_URL+'api/file-download/download/');
}
}
