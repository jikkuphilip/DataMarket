import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {RegistrationService} from '../registration.service';
import { ToastrService } from 'ngx-toastr';



export interface PeriodicElement {
  filename: string;
  position: number;
  email: string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  // {position: 1, filename: 'Hydrogen', email:'sample'},


];

@Component({
  selector: 'app-batch-verification',
  templateUrl: './batch-verification.component.html',
  styleUrls: ['./batch-verification.component.css']
})


export class BatchVerificationComponent implements OnInit {

  
  displayedColumns: string[] = ['position', 'email', 'filename',];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  batchList : any

  constructor(private route: Router, private service: RegistrationService, private toast: ToastrService) { }

  ngOnInit() {
    this.getList();

  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  check(data) {
    console.log('here', data)
  }

  getList () {
    console.log('keravo')
    this.service.getBatchList().subscribe((resp:any) => {
      this.batchList = resp.results;
      this.batchList.map((item,i) => {
        item.position = i+1;
        item.filename = item.encrypted_file_name.split('.', 2)
        item.filename = item.filename[0] + '.' + item.filename[1]
        console.log('batch', this.batchList)
      })
      const data : PeriodicElement[] =this.batchList
      this.dataSource = new MatTableDataSource(data);
    });


  }

  batchVerify () {
    this.service.batchVerification().subscribe(resp => {
      this.toast.success('Users Verified Successfully', 'Success');
      this.getList();
    }, err => {
      this.toast.error('Failed to verify', 'Error')
    })

  }

  logout () {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    this.route.navigate(['Login']);
  }

}
