import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService: CookieService) { }
  //logout component just deletes the cookie and redirects to the login page, maybe could've been solved with less code
  ngOnInit(): void {
    this.cookieService.delete('user');
    this.reload();
  }
  reload(){
    window.location.href = "http://localhost:4200/login";
  }
}
