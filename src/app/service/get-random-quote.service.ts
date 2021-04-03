import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { Quote } from '../models/Quote';

@Injectable({
  providedIn: 'root'
})
export class GetRandomQuoteService {

  constructor(private http:HttpClient) { }

  public getRandomQuote() {
    return this.http.get<Quote>('https://www.tronalddump.io/random/quote');
  }

}
