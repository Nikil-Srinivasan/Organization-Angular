import { Injectable } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService implements ErrorStateMatcher {

  // Implementing the ErrorStateMatcher interface to customize form control error state

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    // Check if the form has been submitted
    const isSubmitted = form && form.submitted;

    // Return true if the control is invalid and has been touched, dirty, or the form is submitted
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
