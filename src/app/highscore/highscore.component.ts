import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../repository.service';

@Component({
  selector: 'app-highscore',
  templateUrl: './highscore.component.html',
  styleUrls: ['./highscore.component.css']
})

export class HighscoreComponent implements OnInit {

  repositoryService: RepositoryService;
  highscoreData;
  constructor(repositoryService: RepositoryService) {
    this.repositoryService = repositoryService;
  }

  ngOnInit(): void { /* saves received server data in highscoreData object */
    this.repositoryService.loadHighscore().subscribe((responseData) => {
      console.log(responseData);
      this.highscoreData = responseData.message;
    });
  }

}
