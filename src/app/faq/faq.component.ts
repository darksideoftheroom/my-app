import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  panelOpenState = false; /* makes sure, that all the accordion panels are closed at the start, for a cleaner look */
}
