import {Component, OnInit} from '@angular/core';
import {GetRandomQuoteService} from "../get-random-quote.service";
import {GetAllAuthorsService} from "../get-all-authors.service";
import {Tag} from "../models/Authors";

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

    public citationAuteur: string;
    public fakeAuteur: Array<string> = [];
    public citation: string;
    public authorArray: Array<Tag>;
    public authorArrayLenght: number;
    public randomArray: Array<string> = [];
    public score: number = 0;

    constructor(private getRandomQuoteService: GetRandomQuoteService, private getAllAuthorsService: GetAllAuthorsService) {
    }


    ngOnInit(): void {
        this.getNewQuote();
    }

    public getNewQuote() {
        this.getRandomQuoteService.getRandomQuote().subscribe(
            (value => {
                this.citationAuteur = value.tags[0];
                this.citation = value.value;
                this.getAuthor(this.citationAuteur);
                if (this.citationAuteur == undefined) {
                    this.getNewQuote();
                }
                this.citation = this.searchAndReplaceInString(this.citation, this.citationAuteur);

            }));

    }

    public searchAndReplaceInString(string: string, elementToSearch: string) {
        let wordsArray: Array<string> = string.split(" ");
        let searchingWordsArray: Array<string> = elementToSearch.split(" ");
        console.log(wordsArray);

        wordsArray.forEach(word => {
            searchingWordsArray.forEach(toSearchSingle => {
                let differentCases: Array<string> = [];
                differentCases.push(toSearchSingle.toUpperCase());
                differentCases.push(toSearchSingle.toLowerCase());
                differentCases.push(((toSearchSingle.substring(0, 1)).toUpperCase()) + ((toSearchSingle.substring(1)).toLowerCase()));

                differentCases.forEach(possibility => {
                    if (possibility.includes(possibility)) {
                        string = string.replace(possibility, " _________ ");
                    }
                });
            });
        });

       return string;

    }

    public getAuthor(ignoreAuteur: string) {
        this.getAllAuthorsService.getAuthorsList().subscribe(
            (value => {

                this.authorArray = value._embedded.tag;
                this.authorArrayLenght = value.total;
                this.fakeAuteur = [];

                const filteredAuteursArray = this.authorArray.filter(function (auteur) {
                    return auteur.value != ignoreAuteur
                });


                let auteur1: string = filteredAuteursArray[this.getRandomInt(this.authorArrayLenght)].value;
                let auteur2: string = filteredAuteursArray[this.getRandomInt(this.authorArrayLenght)].value;

                while (auteur1 === auteur2) {
                    auteur2 = filteredAuteursArray[this.getRandomInt(this.authorArrayLenght)].value;
                }

                this.fakeAuteur.push(auteur1, auteur2, ignoreAuteur);

                let fake1: number = this.getRandomInt(this.fakeAuteur.length);
                let fake2: number = this.getRandomInt(this.fakeAuteur.length);
                let fake3: number = this.getRandomInt(this.fakeAuteur.length);

                while (fake1 == fake2 || fake1 == fake3 || fake2 == fake3) {
                    fake1 = this.getRandomInt(this.fakeAuteur.length);
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


    // Mettre un attribut réponse qui sera affiché dans la modal, que la réponse soit bonne ou non
    public isAnswerCorrect(subject: string) {
        if (subject === this.citationAuteur) {
            console.log("C'est cool !");
            this.score++;
            this.getNewQuote();


        } else {
            console.log("You suck");
            this.score = this.score - 0.25;
            this.getNewQuote();
        }
    }


}
