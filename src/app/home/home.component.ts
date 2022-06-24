//Componente da home. Transformado em menu inicial

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private service: RankingService
  ){}


  pageJogo(){
    this.router.navigateByUrl('jogo');
  }

  pageRegras(){
    this.router.navigateByUrl('regras');
  }

  pageRanking(){
    this.router.navigateByUrl('ranking');
  }

  ngOnInit(): void {
  }

}
