import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private cookieService: CookieService) { }

  ngOnInit(): void {
    this.cookieService.delete('user');
    this.reload();
  }
  reload(){
    window.location.href = "http://localhost:4200/login";
  }
}
