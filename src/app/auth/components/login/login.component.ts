import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ExistingUser} from '../../models/user';
import {AllValidationErrors} from '../../../shared/form.models';
import {Subscription} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {FormsService} from '../../../shared/forms.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  errors: AllValidationErrors[] = [];
  subscription: Subscription;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private forms: FormsService
  ) {
  }

  onLogin() {
    const user = new ExistingUser(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
    this.authService.login(user);
  }

  getErrorMessage(controlName: string): string {
    return this.forms.getErrorMessage(controlName, this.errors);
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5)
      ]],
    });
    this.subscription = this.loginForm.valueChanges.pipe(
      debounceTime(700),
      distinctUntilChanged(),
    )
      .subscribe(() => {
        this.errors = this.forms.getValidationErrors(this.loginForm.controls);
      });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
