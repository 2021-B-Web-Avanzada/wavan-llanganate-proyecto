import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OptionsForm } from '@auth/intefaces/opctions-forms.interface';
import { UserResponse } from '@auth/intefaces/user-response.interface';
import { AuthService } from '@auth/services/auth.service';
import { UserCredentials } from '@supabase/supabase-js';
import { ToastrService } from 'ngx-toastr';
import { ACTIONS } from 'src/app/shared/constants/constant';



@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.sass']
})
export class FormLoginComponent implements OnInit {

  @Input() options!: OptionsForm;

  authForm !: FormGroup;
  hide = true;
  signin = ACTIONS.signIn.key

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly toastService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  async onSubmit(): Promise<void> {
    this.authService.signUp(this.authForm.value);
    const credentials: UserCredentials = this.authForm.value;
    let actionToCall;
    if (this.options.id === ACTIONS.signIn.key) {
      actionToCall = this.authService.signIn(credentials);
    } else {
      actionToCall = this.authService.signUp(credentials);
    }

    try {
      const result = await actionToCall as UserResponse;
      if (result!.email) {
        this.redirectUser('home');
      } else {
        this.toastService.info(result!.message, 'Info');
      }
    } catch (error) {
      console.log(error);
    }
  }

  private initForm(): void {
    this.authForm = this.fb.group(
      {
        email: ['', Validators.required],
        password: ['', Validators.required],
      }
    )
  }

  private redirectUser(path: string): void {
    this.router.navigate([path]);

  }

}
