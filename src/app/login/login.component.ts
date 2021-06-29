import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { LogindataService } from '../logindata.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email = new FormControl('', [Validators.required, Validators.email]);
  itsrequired = new FormControl('', [Validators.required]);
 
 
   getErrorMessage() {
     if (this.email.hasError('required')) {
       return 'You must enter a value';
     }
     if(this.itsrequired.hasError('required')){
       return 'You must enter a password';
     }
     return this.email.hasError('email') ? 'Not a valid email' : '';
   }

  hide = true;
  loginService: LogindataService;

  constructor(loginService: LogindataService) {
    this.loginService = loginService;
  }

  ngOnInit(): void {
    
  }

  login(username: string, password: string):void {
    if(password === ''){
      alert("Password can not be empty");
    }
    if(username === ''){
      alert("Username can not be empty");
    }
    if (username === "test@test.at" &&
    password === "12345678") {
      alert("Welcome!");
      console.log("Login successful");
    } else {
      alert("Login failed");
      console.log("Login failed");
    }
  }

}

