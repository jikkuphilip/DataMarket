import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  logout () {
    localStorage.removeItem('isLoggedIn')
    this.route.navigate(['Login'])

  }

}
