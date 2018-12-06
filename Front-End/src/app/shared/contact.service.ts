import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private firebase: AngularFireDatabase, private datePipe: DatePipe) { }

  ContactList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.minLength(8)]),
    address: new FormControl(''),
    img: new FormControl(),
    facebook: new FormControl(0),
   
  });

  initializeFormGroup() {
    this.form.setValue({
      id: null,
      first_name: '',
      last_name: '',
      phone: '',
      address: '',
      facebook: '1',
      img: 0,
  
    });
  }



}
