import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {RegistrationService} from '../registration.service';
import {environment} from '../../environments/environment'


export interface PeriodicElement {
  file_title: string;
  position: number;

}

const ELEMENT_DATA: PeriodicElement[] = [
];

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})

export class FileListComponent implements OnInit {
  files: any;

  displayedColumns: string[] = ['position', 'name', 'rank', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);



  constructor(private route: Router, private service: RegistrationService) { 
  
  }

  ngOnInit() {
    this.getFiles();
  }

  logout () {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    this.route.navigate(['Login']);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFiles () {
    let showingData = [];
    this.service.fileList().subscribe((resp:any) => {
      this.files = resp.results;
      console.log('files', this.files)
      this.files.map((item,i) => {
        showingData.push({
          position: i + 1,
          file_title: item.file_title,
        })

      })
      const tableData: PeriodicElement[] = showingData;
      this.dataSource = new MatTableDataSource(tableData);
    })

  }

  fileDownload () {
    this.service.fileDownload().subscribe((resp:any) => {
      let data = environment.BASE_URL+resp.url;
    window.open(data);
    });
  }

}
