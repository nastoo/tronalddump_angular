import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {GetSingleTargetService} from '../service/get-single-target.service';
import {Citation} from "../models/Targets";

export interface SearchParams {
    name: string;
}

@Component({
    selector: 'app-search-quote',
    templateUrl: './search-quote.component.html',
    styleUrls: ['./search-quote.component.scss']
})

export class SearchQuoteComponent implements OnInit {
    @Output()

    search = new EventEmitter<SearchParams>();
    name = new FormControl('');
    resultsArray:String[] = [];

    constructor(private getSingleTargetService: GetSingleTargetService) {
    }

    ngOnInit(): void {
        document.getElementById('firstLink').style.color = '#3F9AF5';
        document.getElementById('secondLink').style.color = '#3F9AF5';
        document.getElementById('thirdLink').style.color = '#0066CC';
        this.getFormInput();
    }

    getFormInput() {
        this.name.valueChanges.subscribe(value => {
            this.resultsArray = [];
            if(value == '') {
                this.resultsArray = [];
            } else {
                this.getSingleTargetService.getTargets(value).subscribe({
                    next: el => {
                        this.resultsArray = [];
                        if(el._embedded == null) {
                            this.resultsArray.push("There is nothing to display");
                        } else {
                            el._embedded.quotes.forEach(citation => {
                                this.resultsArray.push(citation.value);
                            })
                        }

                    },
                    error: () => {
                        this.resultsArray.push("There is nothing to display");
                    },
                    complete: () => {
                    }
                });
            }
        });
    }

    resetSearch() {
        this.resultsArray = [];
        this.name.setValue(null);
    }
}
