import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GetScore {

  constructor() { }

  private score:number;

  public getScore(){
      return this.score;
  }

  public setScore(newScore:number){
      this.score = newScore;
  }

}
