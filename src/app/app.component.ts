import { asLiteral } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private cookieService: CookieService) { }
  
  isLoggedin = false;

  ngOnInit(): void {

    const allCookies: {} = this.cookieService.get('user');

    console.log(allCookies);

    if(allCookies != ''){
/*       this.visible();
 */      this.isLoggedin = true;
    }
  }


/*   visible(){
    document.getElementById("profile").classList.remove("unvisible");
    document.getElementById("logout").classList.remove("unvisible");
    document.getElementById("login").classList.add("unvisible");
    document.getElementById("signup").classList.add("unvisible");
  } */
}
