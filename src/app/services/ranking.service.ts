// serviço de rank para a API

import { Injectable } from "@angular/core";
import { Ranking } from "../models/ranking.models";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RankingService{
  private listaRanking: any[];
  private url = 'http://localhost:3000/ranking';

  constructor(private httpClient: HttpClient){
    this.listaRanking = [];
  }

  get ranking(){
    return this.listaRanking;
  }

  nomesRanking(): Observable<Ranking[]> {
    return this.httpClient.get<Ranking[]>(this.url);
  }

  adicionar(ranking: Ranking): Observable<Ranking> {
    this.adicionarData(ranking);
    return this.httpClient.post<Ranking>(this.url, ranking)
  }

  private adicionarData(ranking: any){
    ranking.data = new Date();
  }
}
