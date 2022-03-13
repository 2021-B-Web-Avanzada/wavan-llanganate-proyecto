import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent{

  user$ = this.authService.user$;

  constructor(
    private readonly authService: AuthService,
  ) { }

  async onLogout(): Promise<void>{
    try {
      await this.authService.signOut();
    } catch(error){
      console.log(error);
    }
  }

}
