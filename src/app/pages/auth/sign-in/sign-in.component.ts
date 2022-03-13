import { Component, OnInit } from '@angular/core';
import { OptionsForm } from '@auth/intefaces/opctions-forms.interface';
import { ACTIONS } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-sign-in',
  template: `<app-form-login
                [options]="options"
              ></app-form-login>`,
  styleUrls: ['./sign-in.component.sass']
})
export class SignInComponent implements OnInit {

  options : OptionsForm = {
    id: ACTIONS.signIn.key,
    label: ACTIONS.signIn.label
  }
  constructor() { }

  ngOnInit(): void {
  }

}
