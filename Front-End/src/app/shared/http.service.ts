// Imports
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Import RxJs required methods


@Injectable()
export class HttpService {

    public url = 'http://localhost:3000/';
    public formData: FormData = new FormData();
    // Resolve HTTP using the constructor
    constructor(private http: HttpClient) { }
    // private instance variable to hold base url
 



    getContacts() {
        return this.http.get(this.url+"get_contacts")
    }

    addNewContact(first_name,last_name,phone,address,facebook,img) {

        this.http.post(this.url+"add_new_contact",
            {
                "first_name": first_name,
                "last_name": last_name,
                "phone": phone,
                "address": address,
                "facebook": facebook,
                "img": img,

            })
            .subscribe(
                data => {
                    console.log("POST Request is successful ", data);
                },
                error => {
                    console.log("Error", error);
                }
            );           

        
    }

    upload_image(img:any) {

        return this.http.post(this.url+'upload', img)
            

    }
    delete_contact(id: any) {

        return this.http.post(this.url + 'delete_contact', id)


    }

}