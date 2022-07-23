import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  ngOnInit() {

    // this.homeService.getData(localStorage.getItem('token').slice(1, -1)).subscribe(res => {
    //   console.log(res);
    //   this.mensaje = res;
    // });
  }

}
