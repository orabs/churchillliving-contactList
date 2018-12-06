import { OnInit, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { NotificationService } from '../../shared/notification.service';
import { ContactService } from '../../shared/contact.service';
import { HttpService } from '../../shared/http.service';



@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  filesToUpload:any;
   formData: any = new FormData();
  img_profile:any = "../../../assets/img/default-dp.png";
  selectedFile: File = null;

  

  constructor(private service: ContactService,
    private notificationService: NotificationService,
    public dialogRef: MatDialogRef<ContactComponent>,
    public http:HttpService
    ) { }



  ngOnInit() {
  
    
  }
 

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.notificationService.success(':: Submitted successfully');
  }

  onSubmit() {
    if (this.service.form.valid) {
      let form = this.service.form.value
      this.http.upload_image(this.formData).subscribe(
        data => {
          console.log("POST Request is successful ", data);
          this.http.addNewContact(form["first_name"], form["last_name"], form["phone"], form["address"], form["facebook"], data['path']);
        },
        error => {
          console.log("Error", error);
        }
      );
      this.service.initializeFormGroup();
      this.notificationService.success(':: Submitted successfully');
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  
  
}


  readURL(event: any): void {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.selectedFile = <File>event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.img_profile = reader.result;
      reader.readAsDataURL(file);
      this.filesToUpload = <Array<File>>event.target.files[0];
        this.formData.append("file", file);

      
    }

}

}
