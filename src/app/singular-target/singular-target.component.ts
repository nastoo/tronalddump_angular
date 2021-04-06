import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Authors } from '../models/Authors';
import { Targets } from '../models/Targets';
import { GetSingleTargetService } from '../service/get-single-target.service';

@Component({
  selector: 'app-singular-target',
  templateUrl: './singular-target.component.html',
  styleUrls: ['./singular-target.component.scss']
})
export class SingularTargetComponent implements OnInit {
  target$?: Observable<Targets> = undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private getTarget: GetSingleTargetService,
  ) { }

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.params.name) {
      this.getTarget.getSingleTarget(this.activatedRoute.snapshot.params.name).subscribe(
        (value => {

          for(let $i:number=0;$i<value.count;$i++){
            console.log(value._embedded.quotes[$i].value);
          }

        })
      )


      // this.target$ = this.getTarget.getSingleTarget(this.activatedRoute.snapshot.params.name)
      // .pipe( tap((character)=>{console.log('toto')} ));
    }

  }

}
