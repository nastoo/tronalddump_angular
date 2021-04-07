import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Targets } from '../models/Targets';
import { GetSingleTargetService } from '../service/get-single-target.service';

@Component({
  selector: 'app-singular-target',
  templateUrl: './singular-target.component.html',
  styleUrls: ['./singular-target.component.scss']
})
export class SingularTargetComponent implements OnInit {
  target$?: Observable<Targets> = undefined;

  public page:number = -1;
  public total:number = 0;
  public citations:Array<string> = [];
  public name:string;
  public imageName:string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private getTarget: GetSingleTargetService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.name) {
      this.incrementePage();

    }

  }
  public chercheCitations () {
    this.getTarget.getSingleTarget(this.activatedRoute.snapshot.params.name, this.page).subscribe(
        (value => {
          this.name = this.activatedRoute.snapshot.params.name;

          if(this.name.split(" ")[1] == undefined){
            this.imageName = this.name.split(" ")[0];
          }else{
            this.imageName = this.name.split(" ")[0]+this.name.split(" ")[1];
          }

          for(let $i:number=0;$i<value.count;$i++){
            this.citations.push(value._embedded.quotes[$i].value);
            this.total = value.total;
          }
        })
    )
  }
  public incrementePage() {
    this.citations = [];
    this.page ++;
    this.chercheCitations();
  }

  public decrementePage() {
    this.citations = [];
    this.page --;
    this.chercheCitations();
  }



}
