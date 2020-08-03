import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import {RegistrationService} from '../registration.service';
import {environment} from '../../environments/environment';
declare var require : any
const FileSaver = require('file-saver');


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
  enableRank : boolean;
  searchFilter: any = {};

  displayedColumns: string[] = ['position', 'name', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);



  constructor(private route: Router, private service: RegistrationService) { 
  
  }

  ngOnInit() {
    this.getFiles();
  }

  setDatasource () {
    if (this.enableRank) {
      this.displayedColumns = ['position', 'name', 'rank', 'symbol'];
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.searchFilter.keyword = null;
    }
    else  {
    this.displayedColumns= ['position', 'name', 'symbol'];
    let showingData = [];
    this.files.map((item,i) => {
      showingData.push({
        position: i + 1,
        file_title: item.file_title,
        encrypted_file_name: item.encrypted_file_name
      })
    })
    const tableData: PeriodicElement[] = showingData;
    this.dataSource = new MatTableDataSource(tableData);
    }


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
          encrypted_file_name: item.encrypted_file_name
        })
      })
      const tableData: PeriodicElement[] = showingData;
      this.dataSource = new MatTableDataSource(tableData);
    })

  }

  searchData () {
    let showingData = []
    this.service.filterFiles(this.searchFilter).subscribe((resp:any) =>  {
      this.files = resp.data;
      this.files.map((item,i) => {
        showingData.push({
          position: i + 1,
          file_title: item.file_title,
          rank: item.rank,
          encrypted_file_name: item.encrypted_file_name
        })
    })
    const tableData: PeriodicElement[] = showingData;
    this.dataSource = new MatTableDataSource(tableData);
  })
}

  fileDownload (data) {
    let obj :  any = {};
    obj.file = data.encrypted_file_name;
    obj.file = obj.file.replace('.enc','')
    this.service.fileDownload(obj).subscribe((resp:any) => {
      let fileData = environment.BASE_URL+resp.url;
    window.open(fileData);
    });
  }

}
