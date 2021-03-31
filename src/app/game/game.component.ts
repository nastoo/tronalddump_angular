import { Component, OnInit } from '@angular/core';
import {GetRandomQuoteService} from "../get-random-quote.service";
import {GetAllAuthorsService} from "../get-all-authors.service";
import {Tag} from "../models/Authors";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  
  public citationAuteur:string;
  public fakeAuteur:Array<string> = [];
  public citation:string;
  public authorArray:Array<Tag>;
  public authorArrayLenght:number;
  public randomArray:Array<string> = [];
  
  constructor(private getRandomQuoteService:GetRandomQuoteService, private getAllAuthorsService:GetAllAuthorsService ) { }
  
  
  ngOnInit(): void {
    this.getNewQuote();    
  }
  
  public getNewQuote() {
    this.getRandomQuoteService.getRandomQuote().subscribe(
      (value => {
      this.citationAuteur = value.tags[0];
      this.citation = value.value;
      this.getAuthor(this.citationAuteur);
      if(this.citationAuteur == undefined) {
          this.getNewQuote();
      }
      }));
  }
  
  public getAuthor(ignoreAuteur:string) {
    this.getAllAuthorsService.getAuthorsList().subscribe(
      (value => {      
      
        this.authorArray = value._embedded.tag;
        this.authorArrayLenght = value.total;
        this.fakeAuteur = [];

        const filteredAuteursArray = this.authorArray.filter(function (auteur) {
            return auteur.value != ignoreAuteur
        });


        let auteur1:string = filteredAuteursArray[this.getRandomInt(this.authorArrayLenght)].value;
        let auteur2:string = filteredAuteursArray[this.getRandomInt(this.authorArrayLenght)].value;

        while(auteur1 === auteur2) {
            auteur2 = filteredAuteursArray[this.getRandomInt(this.authorArrayLenght)].value;
        }

        this.fakeAuteur.push(auteur1, auteur2, ignoreAuteur);

        let fake1:number = this.getRandomInt(this.fakeAuteur.length);
        let fake2:number = this.getRandomInt(this.fakeAuteur.length);
        let fake3:number = this.getRandomInt(this.fakeAuteur.length);

        while(fake1 == fake2 || fake1 == fake3 || fake2 == fake3){
          fake1= this.getRandomInt(this.fakeAuteur.length);
          fake2 = this.getRandomInt(this.fakeAuteur.length);
          fake3 = this.getRandomInt(this.fakeAuteur.length);        
        }


        this.randomArray[fake1] = this.fakeAuteur[0];
        this.randomArray[fake2] = this.fakeAuteur[1];
        this.randomArray[fake3] = this.fakeAuteur[2];

       console.log(this.randomArray);

      })
    );
  }
  
  public getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
}
