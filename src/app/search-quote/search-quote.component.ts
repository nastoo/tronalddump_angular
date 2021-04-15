import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {GetSingleTargetService} from '../service/get-single-target.service';

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

                            el._embedded.quotes.forEach(citation => {
                                this.resultsArray.push(citation.value);
                            })

                    },
                    error: () => {
                        this.resultsArray.push("There is nothing to display");
                    }
                });
            }
        });
    }

    resetSearch() {
        this.name.setValue(null);
        this.resultsArray = [];
    }
}
