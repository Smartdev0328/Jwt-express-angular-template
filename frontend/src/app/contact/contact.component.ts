import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  data = {};
  message_error = "";
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private contactService:ContactService) { }

  ngOnInit() {
    this.loadForm();
  }
  loadForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required]],
      query: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.data = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        subject: this.signupForm.value.subject,
        message: this.signupForm.value.message,
        query:this.signupForm.value.query,
      }

      this.contactService.contact(this.data).subscribe(res => {

        let resP = JSON.parse(JSON.stringify(res));
        console.log(resP);
        if (resP.success != undefined) {
          this.router.navigateByUrl("home");
        } else if (resP.error) {
          this.message_error = resP.error;
        }
      });
    }
    else{
          this.message_error ="invalid input";
    }


  }

}
