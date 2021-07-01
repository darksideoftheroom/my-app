import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { RepositoryService } from '../repository.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  secs = 0;
  @Output() secondPassed = new EventEmitter<number>();
  @Input() solved = false;

  repositoryService: RepositoryService;

  constructor(repositoryService: RepositoryService, private cookieService: CookieService ) {
    this.repositoryService = repositoryService;
  }

  ngOnInit(): void {
    this.timer();
    this.repositoryService.sendHighscore("test", 20).subscribe();
  }

  // Funktion, die jede Sekunde aufgerufen wird
  // Zählt die Sekunden und erkennt, dass Spiel fertig ist
  timer(): void{
	// Wenn noch nicht alle Paare gefunden wurden
	  if(!this.solved){
		  // Zählen der aktuellen Sekunde
		  this.secs++;

      //Schicke den Emitter aus, um zu zeigen, dass eine Sekunde vergangen ist
      this.secondPassed.emit(this.secs);
		  // Aktualisieren der Sekunden auf der Seite
  
		  document.getElementById('zeitlabel').innerText = this.secs + '';
		  // Zeit soll wieder eine Sekunde weiterlaufen
      setTimeout(() => this.timer(), 1000);
	}
	// Es wurden alle Paare gefunden
	else{
    this.calcScore();  
	}
}
  calcScore():void{
    let score = 100 - this.secs;
    console.log(score);
    if(score < 0){
      score = 0;
    }
    var username = this.cookieService.get('user');
    if(username !== '')
    {
      this.repositoryService.sendHighscore(username, score).subscribe();
    }
    alert("Your score: " + score + "/100");
  }
}
