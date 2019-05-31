import {AbstractControl} from '@angular/forms';

export interface AllValidationErrors {
  [x: string]: string;
}
export interface FormGroupControls {
  [key: string]: AbstractControl;
}
