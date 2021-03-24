import { Injectable } from '@angular/core';
import { Authors } from '../app/models/Authors';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GetAllAuthorsService {

  constructor(private http:HttpClient) { }

  public getAuthorsList() {
    return this.http.get<Authors>('https://api.tronalddump.io/tag');
  }
}
