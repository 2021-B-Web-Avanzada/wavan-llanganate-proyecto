import { Component, OnInit } from '@angular/core';
import { OptionsForm } from '@auth/intefaces/opctions-forms.interface';
import { ACTIONS } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-sign-up',
  template: `<app-form-login
                [options]="options"
            ></app-form-login>`,
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {

  options : OptionsForm = {
    id: ACTIONS.signUp.key,
    label: ACTIONS.signUp.label
  }

  constructor() { }

  ngOnInit(): void {
  }

}
