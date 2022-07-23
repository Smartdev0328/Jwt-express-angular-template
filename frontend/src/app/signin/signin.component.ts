import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Auth } from '../models/auth.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  auth: Auth = new Auth(false, "", "");
  message_error: string = "";
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit() {
  }
  onSubmit(form: NgForm) {
    console.log(form.value)
    this.authService.signIn(form.value).subscribe(res => {
      let resP = JSON.parse(JSON.stringify(res));
      this.auth = resP as Auth;
      if (this.auth.auth == true) {
        localStorage.setItem('access_token', JSON.stringify(this.auth.accessToken));
        console.log(resP)
        this.authService.setUsername(resP.username);
        this.router.navigateByUrl("home");
      }
      else {
        this.message_error = this.auth.reason;
      }
    });
  }
}
