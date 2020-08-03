import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegistrationService} from '../registration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: any;
  postData: any;
  passwordErr: boolean = false;
  confirmPassword: any;

  constructor(private route: Router, private register: RegistrationService, private toast: ToastrService) {
 

   }

  ngOnInit() {
    this.user = localStorage.getItem('user')
    this.postData = {};
  }

  verifyPassword () {
    if (this.postData.password && this.confirmPassword) {
    console.log('chcekc', this.postData.password, this.confirmPassword)
    if (this.postData.password !== this.confirmPassword) this.passwordErr = true;
    else this.passwordErr = false;
    }
    }


  registerData () {
    if (!this.passwordErr) {
    console.log('post', this.postData)
    this.register.registerUser(this.postData).subscribe(resp => {
      console.log('resp', resp)
      this.toast.success('Successfully Registered', 'Success');
    //  if(this.postData.usertype === 'seller') this.toast.info('Password has been sent to the registered email address', 'Info')
     this.route.navigate(['Login'])
      this.postData = {};
      this.confirmPassword = null;
    }, error => {
      this.toast.error('Failed to register', 'Error')
    })
  }

  }

  goTologin () {
    this.route.navigate(['Login'])
  }

}
