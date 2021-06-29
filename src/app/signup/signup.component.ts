import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SignupdataService } from '../signupdata.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})


export class SignupComponent implements OnInit {

 email = new FormControl('', [Validators.required, Validators.email]);
 itsrequired = new FormControl('', [Validators.required]);
 itsrequiredTwo = new FormControl('', [Validators.required]);
 lethiseight = new FormControl('', Validators.minLength(8));
 lethiseightTwo = new FormControl('', Validators.minLength(8));

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value length of 8';
    }
    if(this.itsrequired.hasError('required')){
      return 'You must enter a password';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }


  hide = true;
  signupService: SignupdataService;

  constructor(signupService: SignupdataService) {
    this.signupService = signupService;
  }

  ngOnInit(): void {
    
  }

  signup(username: string, password: string, password2: string, company: string, street: string, pcode: number):void {
    if(password === ''){
      alert("Password can not be empty");
    }
    if(username === ''){
      alert("Username can not be empty");
    }
    if(password.length >= 8 && username != ''){
      if (password === password2) {
        alert("Erfolg!");
        console.log(username, company, street, pcode);
        console.log("Signup successful");
    }
    }
    if(password.length < 8){
      alert("Password length: min 8");
      console.log("signup failed");
    } 
    if (password != password2) {
      alert("Passwords do not match");
      console.log("signup failed");
    }
  }
}


