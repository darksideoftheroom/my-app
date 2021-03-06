import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  repositoryService: RepositoryService;
  highscoreData;
  username;

  constructor(repositoryService: RepositoryService, private cookieService: CookieService ) {
    this.repositoryService = repositoryService;
  }

  ngOnInit(): void {
    this.username = this.cookieService.get('user');
    this.repositoryService.loadUserHighscore(this.username).subscribe((responseData) => {
      console.log(responseData); //for debugging, doesn't work yet
      //this.highscoreData = responseData.message;
    }); 
  }

}
