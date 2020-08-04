import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Patient } from 'src/app/models/api/patient.model';
import { PatientService } from 'src/app/services/data/patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-create',
  templateUrl: './patient-create.component.html',
  styleUrls: ['./patient-create.component.sass'],
  providers: [FormBuilder, PatientService]
})
export class PatientCreateComponent {

  formGroup: FormGroup;
  titleAlert: string = 'This field is required';
  post: any = '';

  constructor(
    private formBuilder: FormBuilder,
    private _patientService: PatientService,
    private router: Router
    ) { }

  createForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
    surname: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
    lastname: new FormControl('', [Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*')]),
    dni: new FormControl('', [Validators.required, Validators.maxLength(50), Validators.pattern('[a-zA-Z0-9 ]*')]),
    phone: new FormControl('', [Validators.maxLength(50), Validators.pattern('[0-9 +()]*')]),
    phoneAlt: new FormControl('', [Validators.maxLength(50), Validators.pattern('[0-9+() ]*')]),
    adress: new FormControl('', [Validators.maxLength(255), Validators.pattern('[a-zA-Z0-9 /]*')]),
    city: new FormControl('', [Validators.maxLength(255), Validators.pattern('[a-zA-Z0-9+() ]*')]),
    pc: new FormControl('', [Validators.maxLength(255), Validators.pattern('[0-9 ]*')]),
    sex: new FormControl(''),
    note: new FormControl('', [Validators.maxLength(255), Validators.pattern('[a-zA-Zà-úÀ-Ù0-9+()/ ]*')]),
    email: new FormControl('', [Validators.maxLength(255), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]),
    bornDate:  new FormControl(new Date(1990, 0, 1), Validators.required),
  });

  public hasError = (controlName: string, errorName: string) =>{
    return this.createForm.controls[controlName].hasError(errorName);
  }

  validateForm(form: FormGroup): boolean{

    let formIsValidated: boolean = true;
    Object.keys(form.controls).forEach(key => {
      const controlErrors: ValidationErrors = form.get(key).errors;
      if (controlErrors != null) {
            formIsValidated = false;
          }
      });
      return formIsValidated;
    }

  create() {

    if(this.validateForm(this.createForm)) {
      let newPatient: Patient = new Patient();
      newPatient.name = this.createForm.controls.name.value;
      newPatient.surname = this.createForm.controls.surname.value;
      newPatient.lastname = this.createForm.controls.lastname.value;
      newPatient.dni = this.createForm.controls.dni.value;
      newPatient.phone = this.createForm.controls.phone.value;
      newPatient.phoneAlt = this.createForm.controls.phoneAlt.value;
      newPatient.adress = this.createForm.controls.adress.value;
      newPatient.city = this.createForm.controls.city.value;
      newPatient.pc = this.createForm.controls.pc.value;
      newPatient.sex = this.createForm.controls.sex.value;
      newPatient.note = this.createForm.controls.note.value;
      newPatient.email = this.createForm.controls.email.value;
      newPatient.bornDate = this.createForm.controls.bornDate.value;
      
      console.log(newPatient);

      this._patientService.Create(newPatient).subscribe(
        result => {
          console.log(result);
          this.router.navigate(['/c/patient/' + result.nhc]);
        }, error =>  {
          console.log(error);
        });

    }


  }
}