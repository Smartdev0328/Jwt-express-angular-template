import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service'
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  data = {};
  message: HttpErrorResponse;
  message_error = "";
  signupForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loadForm();
  }
  loadForm() {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      repeat_password: [{ value: '', disabled: true }],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required, Validators.min(0), Validators.max(1)]],

    });
    this.onChanges();
  }
  onChanges() {
    this.signupForm.get('password').valueChanges.subscribe(value => {
      if (this.signupForm.get('repeat_password').disabled) {
        this.signupForm.get('repeat_password').enable();
      }
    });
    this.signupForm.get('repeat_password').valueChanges.subscribe(value => {
      if (value != this.signupForm.get('password').value) {
        this.signupForm.controls['repeat_password'].setErrors({ 'match': false })
      } else {
        console.log("match");
        this.signupForm.controls['repeat_password'].clearValidators();
      }
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      console.log(this.signupForm.value);
      this.data = {
        name: this.signupForm.value.name,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        dob: this.signupForm.value.dob,
        gender:this.signupForm.value.gender,
      }

      this.authService.signUp(this.data).subscribe(res => {

        let resP = JSON.parse(JSON.stringify(res));
        console.log(resP);
        if (resP.auth == true) {
          localStorage.setItem('access_token', JSON.stringify(resP.accessToken));
          console.log(localStorage.getItem('access_token'))
          this.authService.setUsername(resP.username);
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
