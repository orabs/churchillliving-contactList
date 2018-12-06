import { ContactComponent } from '../contact/contact.component';
import { Component, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { NotificationService } from '../../shared/notification.service';
import { ContactService } from '../../shared/contact.service';
import { HttpService } from '../../shared/http.service';


@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactListComponent implements OnInit {


  serverUrl="http://localhost:3000"

  
  default_profile_iamge ="../../.assets/img/default-dp.png"
  currentContact:any=null;

  constructor(private service: ContactService,
    private dialog: MatDialog,
    private notificationService: NotificationService,
    public http: HttpService,
    ) { }

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['id','first_name', 'last_name', 'phone', 'address', 'img', 'facebook'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit() {
    this.http.getContacts().subscribe(
      list => {
        let data: any = list
        this.listData = new MatTableDataSource(data);
        this.listData.sort = this.sort;
        this.listData.paginator = this.paginator;
      });
  }



  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(ContactComponent,dialogConfig).afterClosed().subscribe(data=>{
      this.get_all_contacts()
    });
   
   
  }

  onDelete(){
    if(confirm('Are you sure to delete this record ?')){
    this.http.delete_contact({'id':this.currentContact.id}).subscribe(data=>{
      this.get_all_contacts()
    });
    this.notificationService.warn('! Deleted successfully');
    }
  }


  highlight(row) {
    this.currentContact=row;
  }


  get_all_contacts(){
    this.http.getContacts().subscribe(
        list => {
          let data: any = list
          this.listData.disconnect
          this.listData.data = data;
          this.listData.connect
          });
  }
}
