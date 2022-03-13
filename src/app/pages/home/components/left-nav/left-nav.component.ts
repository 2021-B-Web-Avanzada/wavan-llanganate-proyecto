import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OPTIONS } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.sass']
})
export class LeftNavComponent implements OnInit {

  public route: string ="";
  menu = OPTIONS.menu;
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route = this.router.url;
  }
}
