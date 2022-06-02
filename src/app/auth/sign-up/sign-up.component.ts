import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  userCreateForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.userCreateForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      contactNo: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.userCreateForm.controls;
  }

  saveUserData() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userCreateForm.invalid) {
      return;
    }

    let userModel = new User()
    userModel.email = this.f['email'].value;
    userModel.password = this.f['password'].value;
    userModel.firstName = this.f['firstName'].value;
    userModel.lastName = this.f['lastName'].value;
    userModel.contactNo = this.f['contactNo'].value

    this.authService.SignUp(userModel)
  }

  resetForm() {
    this.userCreateForm.reset();
    this.submitted = false;
  }

}
