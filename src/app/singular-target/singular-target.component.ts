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
  
  public page:number = 0;
  public total:number = 0;
  public citations:Array<String> = [];
  public citationSecours1:Array<String> = [];
  public debutNom:string;
  public finNom:string;
  
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private getTarget: GetSingleTargetService,
    ) { }
    
    ngOnInit(): void {
      if (this.activatedRoute.snapshot.params.name) {
        // this.incrementePage();
        //console.log(Math.floor(1/10)+1);
        this.chercheCitations2();
      }
      
    }

    public chercheCitations2 (){

      this.debutNom = this.activatedRoute.snapshot.params.name.split(" ")[0];
      this.finNom = this.activatedRoute.snapshot.params.name.split(" ")[1];

      this.getTarget.getSingleTarget(this.debutNom, this.page).subscribe(
        (value => {
          
          for(let $i:number=0;$i<Math.floor((value.total)/10)+1;$i++){
            
            this.getTarget.getSingleTarget(this.debutNom, $i).subscribe(
              (value => {
                
                for(let $i:number=0;$i<value.count;$i++){
                  this.citations.push(value._embedded.quotes[$i].value);
                }

                console.log(this.citations);

                this.getTarget.getSingleTarget(this.finNom, this.page).subscribe(
                  (value => {
                    for(let $j:number=0;$j<Math.floor((value.total)/10)+1;$j++){
                      this.getTarget.getSingleTarget(this.finNom, $j).subscribe(
                        (value => {

                          for(let $k:number=0;$k<value.count;$k++){
                            this.citationSecours1.push(value._embedded.quotes[$k].value);
                          }

                          console.log(this.citationSecours1);

                        })
                      )
                    }
                  })
                )

              }),
            );

            //this.citations.push(value._embedded.quotes[$i].value);
          }
        }),
      )

    }


    public chercheCitations () {

      this.debutNom = this.activatedRoute.snapshot.params.name.split(" ")[0];
      this.finNom = this.activatedRoute.snapshot.params.name.split(" ")[1];

      console.log(this.debutNom);
      console.log(this.finNom);



      // this.getTarget.getSingleTarget(this.activatedRoute.snapshot.params.name, this.page).subscribe(
      //   (value => {

      //     for(let $i:number=0;$i<value.count;$i++){
      //       this.citations.push(value._embedded.quotes[$i].value);
      //       this.total = value.total;
      //     }

      //     for(let $i:number=0;$i<this.activatedRoute.snapshot.params.name.split(" ").length;$i++){
      //       this.getTarget.getSingleTarget(this.activatedRoute.snapshot.params.name.split(" ")[$i], this.page).subscribe(
      //         (value => {
      //           for(let $i:number=0;$i<value.count;$i++){
      //             this.citationSecours1.push(value._embedded.quotes[$i].value);
      //           }

      //           let quoteNotIn:Array<String> = this.citationSecours1.filter(e => this.citations.indexOf(e) == -1);
                
      //           console.log(this.citations);
      //           console.log(quoteNotIn);

      //           quoteNotIn.forEach(quote => {
      //             this.citations.push(quote);
      //           });

      //           //console.log(this.citations);
      //         })
      //         )
      //       }
      //     })
      //     )

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
      