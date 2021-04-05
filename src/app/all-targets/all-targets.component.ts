import { Component, OnInit } from '@angular/core';
import { Tag } from '../models/Authors';
import { GetAllAuthorsService } from '../service/get-all-authors.service';

@Component({
  selector: 'app-all-targets',
  templateUrl: './all-targets.component.html',
  styleUrls: ['./all-targets.component.scss']
})
export class AllTargetsComponent implements OnInit {

  public targetArray: Array<Tag>;

  constructor(public getAllAuthorsService:GetAllAuthorsService) { }

  ngOnInit(): void {

    document.getElementById('firstLink').style.color = '#3F9AF5';
    document.getElementById('secondLink').style.color = '#0066CC';

    this.getAllTargets();

  }

  public getAllTargets(){
    this.getAllAuthorsService.getAuthorsList().subscribe(
      (value => {
        this.targetArray = value._embedded.tag;

        console.log(this.targetArray);
      })
    );
  }

}
