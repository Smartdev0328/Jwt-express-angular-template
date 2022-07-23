import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  data = {};
  contacts = [];
  constructor(private contactService:ContactService) { }

  ngOnInit() {
    this.getData();
  }
  getData() {
      this.contactService.contactList(this.data).subscribe(res => {

        let resP = JSON.parse(JSON.stringify(res));
        console.log(resP);
        if (resP.success != undefined) {
          this.contacts=resP.data;
        } else if (resP.error) {
        }
      });
  }
}
