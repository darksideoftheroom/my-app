import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  secs = 0;
  @Output() secondPassed = new EventEmitter<number>();
  @Input() solved = false;

  constructor() { }

  ngOnInit(): void {
    this.timer();
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
      // TODO: innerHTML nicht verwenden!
		  document.getElementById('zeitlabel').innerHTML = this.secs + '';
		  // Zeit soll wieder eine Sekunde weiterlaufen
      setTimeout(() => this.timer(), 1000);
	}
	// Es wurden alle Paare gefunden
	else{
		alert("done");
	}
}

}
