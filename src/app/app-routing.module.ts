// Todas as rotas do app são declaradas aqui

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JogoComponent } from './jogo/jogo.component';
import { RankingComponent } from './ranking/ranking.component';
import { RegrasComponent } from './regras/regras.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path: 'jogo', component: JogoComponent},
  { path: 'regras', component: RegrasComponent},
  { path: 'ranking', component: RankingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
