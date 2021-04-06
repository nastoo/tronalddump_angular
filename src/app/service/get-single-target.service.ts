import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Targets } from '../models/Targets';

@Injectable({
  providedIn: 'root'
})
export class GetSingleTargetService {

  constructor(private http:HttpClient) { }

  public getSingleTarget(name:string, page:number){
    return this.http.get<Targets>(`https://api.tronalddump.io/search/quote?query=${name}&page=${page}`);
  }

}
