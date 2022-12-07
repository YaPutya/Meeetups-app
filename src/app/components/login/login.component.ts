import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private router: Router, private authService: AuthService) {}

  sumbitLogin() {
    // console.log(this.loginForm.value)
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password ).subscribe(() => {
      this.router.navigate(['allMeetups'])
    }, err => alert(err.message));
    
    // subscribe(() => {
    //   this.router.navigate(['admin']),
    // }, 
    // err => alert(err.message)
    // );
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.min(8),
      ]),
    });

    // if (this.authService.isLoggedIn()) {
    //   this.router.navigate(['admin'])
    // }
  }
}
