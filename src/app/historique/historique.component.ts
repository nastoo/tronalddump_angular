import { Component, OnInit } from '@angular/core';
import { GetScore } from '../service/get-score.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.scss']
})
export class HistoriqueComponent implements OnInit {

  public listeScore:any;

  constructor(private historique:GetScore) { 
    this.listeScore = this.historique.getScore();
  }

  ngOnInit(): void {
  }

}
