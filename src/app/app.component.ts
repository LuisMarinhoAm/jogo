import { Component } from '@angular/core';
import { RankingService } from './services/ranking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Jogo';
  constructor(private service: RankingService) {}
}
