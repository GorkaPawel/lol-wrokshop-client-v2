import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewUser} from '../../models/user';
import {AuthService} from '../../services/auth.service';
import {debounceTime} from 'rxjs/operators';
import {distinctUntilChanged} from 'rxjs/internal/operators/distinctUntilChanged';
import {AllValidationErrors} from '../../../shared/form.models';
import {Subscription} from 'rxjs';
import {FormsService} from '../../../shared/forms.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  errors: AllValidationErrors[] = [];
  subscription: Subscription;
  onRegister() {
    const user = new NewUser(
      this.registerForm.get('email').value,
      this.registerForm.get('passwords.password').value,
      this.registerForm.get('passwords.passwordConfirm').value,
    );
    this.authService.register(user);
  }
  getErrorMessage(controlName: string): string {
    return this.forms.getErrorMessage(controlName, this.errors);
  }
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      passwords: this.fb.group({
          password: ['', [
            Validators.required,
            Validators.minLength(5)
          ]],
          passwordConfirm: ['']
        },
        {validators: this.forms.controlsNotMatch}),
    });
    this.subscription = this.registerForm.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
    )
      .subscribe(() => {
        this.errors = this.forms.getValidationErrors(this.registerForm.controls);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private forms: FormsService
  ) {
  }
}
