import { Component, OnInit } from '@angular/core';
import {GetRandomQuoteService} from "../get-random-quote.service";
import {compileComponentFromMetadata} from "@angular/compiler";
import {GetAllAuthorsService} from "../get-all-authors.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  public citationAuteur:string;
  public fakeAuteur:Array<string>;
  public citation:string;
  public authorArray:any;
  public authorArrayLenght:number;
  constructor(private getRandomQuoteService:GetRandomQuoteService, private getAllAuthorsService:GetAllAuthorsService ) { }


  ngOnInit(): void {
    this.getNewQuote();
    this.getAuthor();
  }

  public getNewQuote() {
    this.getRandomQuoteService.getRandomQuote().subscribe((value => {
      this.citationAuteur = value.tags[0];
      this.citation = value.value;
    }));
  }
  
  public getAuthor() {
      this.getAllAuthorsService.getAuthorsList().subscribe((value => {
        this.authorArray = value._embedded.tag;
        this.authorArray.forEach(element => console.log(element.value));
        this.authorArrayLenght = value.total;
      }));
      console.log(this.getRandomInt(this.authorArrayLenght));

  }

  public getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

}
