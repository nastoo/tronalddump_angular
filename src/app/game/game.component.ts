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
  public fakeAuteur:Array<string> = [];
  public citation:string;
  public authorArray:any;
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
      }));
  }
  
  public getAuthor(ignoreAuteur:string) {
    this.getAllAuthorsService.getAuthorsList().subscribe(
      (value => {      
      
        this.authorArray = value._embedded.tag;
        this.authorArrayLenght = value.total;
        this.fakeAuteur = [];

        let auteur1:string = this.authorArray[this.getRandomInt(this.authorArrayLenght)].value;
        let auteur2:string = this.authorArray[this.getRandomInt(this.authorArrayLenght)].value;



        while(auteur1 == ignoreAuteur || auteur2==ignoreAuteur){
          auteur1 = this.authorArray[this.getRandomInt(this.authorArrayLenght)].value;
          auteur2 = this.authorArray[this.getRandomInt(this.authorArrayLenght)].value;
        }
        
        while(auteur1 == auteur2){
          auteur2 = this.authorArray[this.getRandomInt(this.authorArrayLenght)].value;
        }

        console.log(this.citationAuteur);
        
        this.fakeAuteur.push(this.authorArray[this.getRandomInt(this.authorArrayLenght)].value, this.authorArray[this.getRandomInt(this.authorArrayLenght)].value, ignoreAuteur);

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
