import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {RegistrationService} from '../registration.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {
  upload: any = {};
  uploadFile: File = null;
  

  constructor(private route: Router, private service: RegistrationService, private toast: ToastrService) { }

  ngOnInit() {
  }

  appendFilename (files: FileList) {
    this.uploadFile = files.item(0);
    console.log('file', this.uploadFile)
  }

  uploadData () {
    if (this.uploadFile) {
    this.upload.myFile = this.uploadFile
    this.service.fileUpload(this.upload).subscribe(resp => {
      this.toast.success('File Uploaded successfully', "Success")
      this.upload = {};
      this.uploadFile = null;
    }, err => {
      this.toast.error('Failed to upload', 'Error')
    })
  } else this.toast.warning('Please Choose a file', 'Warning')

  }


  logout () {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    this.route.navigate(['Login']);
  }

}
