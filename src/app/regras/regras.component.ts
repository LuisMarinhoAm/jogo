import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'app-regras',
  templateUrl: './regras.component.html',
  styleUrls: ['./regras.component.scss']
})
export class RegrasComponent implements OnInit {

  constructor(
    private router: Router,
    private service: RankingService
  ){}

  botaoHome(){
    this.router.navigateByUrl('home');
  }

  ngOnInit(): void {
  }

}
