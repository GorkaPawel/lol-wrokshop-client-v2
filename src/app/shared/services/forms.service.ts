import {Injectable} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {AllValidationErrors, FormGroupControls} from '../models/form.models';

@Injectable({
  providedIn: 'root'
})
export class FormsService {

  private errorMessages = {
    required: 'This field is required.',
    controlsNotMatch: 'Fields are not the same.',
    minlength: 'This field has minimum length of 5.',
    email: 'Provide valid email.'
  };
  constructor() {
  }

  controlsNotMatch(group: FormGroup): { [key: string]: any } | any {
    const fields = Object.keys(group.controls);
    const values = fields.map(controlName => {
      return group.controls[controlName].value;
    });
    if (!values.every(value => value === values[0])) {
      return {controlsNotMatch: true};
    }
    return null;
  }
  getErrorMessage(controlName: string, errors: AllValidationErrors[]): string {
    const controlError = errors.find((error: AllValidationErrors ) => {
      return error.hasOwnProperty(controlName);
    });
    if (controlError) {
      return this.errorMessages[controlError[controlName]];
    }
    return '';
  }
  getValidationErrors(controls: FormGroupControls): AllValidationErrors[] {
    let errors: AllValidationErrors[] = [];
    Object.keys(controls).forEach(key => {
      const control = controls[key];
      if (control instanceof FormGroup) {
        errors = errors.concat(this.getValidationErrors(control.controls));
      }
      // errors: {error_name: boolean, ...}
      const controlErrors = controls[key].errors;
      if (controlErrors !== null) {
        errors.push({[key]: Object.keys(controlErrors).join(' ')});
      }
    });
    return errors;
  }
}

