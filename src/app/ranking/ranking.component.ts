import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ranking } from '../models/ranking.models';
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  ranking: any[];

  constructor(
    private router: Router,
    private service: RankingService
  ){}

  ngOnInit(): void {
    this.service.nomesRanking().subscribe((ranking: Ranking[]) => {
      this.organizaDesc(ranking);
      console.table(ranking);
      this.ranking = ranking;
    })
  }

  organizaDesc(ranking: any[]) {
    ranking.sort((a,b) => a.score > b.score ? -1 : 1);
  }

  botaoHome(){
    this.router.navigateByUrl('home');
  }
}
