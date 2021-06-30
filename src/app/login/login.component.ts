import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { RepositoryService } from '../repository.service';
import { CookieService } from 'ngx-cookie-service';


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
  repositoryService: RepositoryService;
  router:Router;

  constructor(repositoryService: RepositoryService, router: Router, private cookieService: CookieService ) {
    this.repositoryService = repositoryService;
    this.router = router;
  }

  ngOnInit(): void {
    
  }

  login(username: string, password: string):void {
    if(password === ''){
      alert("Password can not be empty");
    }
    else if(username === ''){
      alert("Username can not be empty");
    }else{
      this.repositoryService.login(username, password).subscribe((responseData) => {
        console.log(responseData);
        if(responseData.message === "Login failed"){
          alert("Login failed");
        }
        else if(responseData.message === "Successful login"){
          alert("Erfolg!");
          this.cookieService.set('user', username);
          window.location.href = "http://localhost:4200/puzzle";
          //this.router.navigate(['/puzzle']);
        }
      });
    }
  }

}

