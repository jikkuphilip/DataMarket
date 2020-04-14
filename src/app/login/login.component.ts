import { Component, OnInit } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import {Router, ActivatedRoute} from '@angular/router';
import {RegistrationService} from '../registration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginUser: any;
  loginData: any;

  constructor(private route: Router, private data: ActivatedRoute, private service: RegistrationService,
    private toast: ToastrService) { }

  ngOnInit() {
    console.log('user', history)
    this.loginUser = localStorage.getItem('user')
    this.loginData = {};

  }

  goTohome () {
    this.route.navigate(['Home'])
  }

  goToregister () {
    this.route.navigate(['Register'])
  }

  login () {
    this.service.UserLogin(this.loginData).subscribe(resp => {
      this.toast.success('Login Successful', 'Success');
      localStorage.setItem('isLoggedIn','true');
      if (this.loginUser === 'Buyer')this.route.navigate(['ListFiles']);
      else if(this.loginUser === 'Seller') this.route.navigate(['FileUpload']);
      else this.route.navigate(['BatchVerification'])
    },err => {
      this.toast.error('Failed to login', 'Error');
    })
  }

}
