import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-quote',
  templateUrl: './search-quote.component.html',
  styleUrls: ['./search-quote.component.scss']
})
export class SearchQuoteComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    document.getElementById('firstLink').style.color = '#3F9AF5';
    document.getElementById('secondLink').style.color = '#3F9AF5';
    document.getElementById('thirdLink').style.color = '#0066CC';

  }

}
