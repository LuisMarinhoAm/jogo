import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LogAcoes } from '../models/acoes.models';
import { Personagem } from '../models/person.models';
import { Ranking } from '../models/ranking.models';
import { RankingService } from '../services/ranking.service';

@Component({
  selector: 'app-jogo',
  templateUrl: './jogo.component.html',
  styleUrls: ['./jogo.component.scss']
})
export class JogoComponent implements OnInit {

  constructor(
    private router: Router,
    private service: RankingService
  ){}


// Declarações de variaveis
//=================================================

  winnerName: string;
  playerName: string = '';
  score: number = 0;
  turnos: number = 0;
  jogoEmAndamento = true;
  log: LogAcoes[] = [];

  player: Personagem = {
    playerAtivo: 1,
    nome: 'Jogador',
    vida: 100,
    normalMin: 5,
    normalMax: 10,
    espTurn: 2,
    espMin: 10,
    espMax: 20,
    curaMin: 5,
    curaMax: 15,
  }

  npc: Personagem = {
    playerAtivo: 0,
    nome: 'Monstro (NPC)',
    vida: 100,
    normalMin: 6,
    normalMax: 12,
    espTurn: 0,
    espMin: 8,
    espMax: 16,
    atordoamento: 0
  }

// Funções dos botões
//=================================================
  Ataque(){
    this.ataque(this.player,this.npc);
    this.NpcAtaque();
    this.turnos++;
  }

  Especial(){
    this.ataqueEspecial(this.player,this.npc);
    this.npc.atordoamento = this.RandNumber(0,2);
    this.NpcAtaque();
    this.turnos++;
  }

  Curar(){
    this.cura(this.player);
    this.NpcAtaque();
    this.turnos++;
  }

  Voltar(){
    this.router.navigateByUrl('home');
  }


// Funções das ações
//=================================================

  NpcAtaque(){
    if(this.jogoEmAndamento){
      if(this.npc.atordoamento){
        this.npc.atordoamento = 0;
        this.registraLog(0, 'stun', 'Inimigo atordoado');
        this.npc.espTurn++;
      }else if(this.npc.espTurn >= 2){
        this.ataqueEspecial(this.npc,this.player);
      }else{
        this.ataque(this.npc,this.player);
      }
    }
  }

  cura(personagem : Personagem){
    let cura = this.RandNumber(personagem.curaMin, personagem.curaMax);
    personagem.vida += cura;
    personagem.vida = personagem.vida > 100 ? 100 : personagem.vida;
    this.registraLog(personagem.playerAtivo,'cura',personagem.nome + ' usou "Curar" (+' + cura + ' pontos de vida)');
    personagem.espTurn++;
  }

  ataque(atacante : Personagem, defensor: Personagem){
    let dano = this.RandNumber(5, 10);
    defensor.vida -= dano;
    let nomeLog = atacante.playerAtivo ? atacante.nome : 'Inimigo';
    this.registraLog(atacante.playerAtivo, 'atkBas', nomeLog + ' usou "Ataque Normal" (-' + dano + ' pontos de vida)');
    this.verificaFimDeJogo();
    atacante.espTurn++;
  }

  ataqueEspecial(atacante : Personagem, defensor: Personagem){
    let dano = this.RandNumber(atacante.espMin, atacante.espMax);
    defensor.vida -= dano;
    let nomeLog = atacante.playerAtivo ? atacante.nome : 'Inimigo';
    this.registraLog(atacante.playerAtivo, 'atkEsp',nomeLog + ' usou "Ataque Especial" (-' + dano + ' pontos de vida)');
    this.verificaFimDeJogo();
    atacante.espTurn = 0;
  }

  checkEspecial(){
    if (this.player.espTurn < 2){
      return true;
    }
    return false;
  }

// Funções de andamento do jogo
//=================================================

  verificaFimDeJogo(){
    if(this.player.vida <= 0 || this.npc.vida <= 0){
      this.jogoEmAndamento = false;
      this.verificaVencedor();
      if (this.player.vida < 0){
        this.player.vida = 0;
      }else if (this.npc.vida < 0){
        this.npc.vida = 0;
      }
      this.score = Math.round((this.player.vida * 1000) / this.turnos);
    }
  }

  verificaVencedor(){
    if (this.npc.vida <= 0) {
      this.winnerName = this.player.nome;
      return 1;
    }else{
      this.winnerName = this.npc.nome;
      return 0;
    }
  }

// Funções de Log
//=================================================

checkName(){
  if (this.playerName == '') {
    return 1;
  }else{
    return 0;
  }
}

registraLog(personagem: number, acao: string, texto: string){
  const novoLog = new LogAcoes();
  novoLog.personagem = personagem;
  novoLog.acao = acao;
  novoLog.texto = texto;
  this.log.unshift(novoLog);
}

buscaCorLog(linhaLog: LogAcoes){
  return {
    'jogador': linhaLog.personagem == 1,
    'inimigo': linhaLog.personagem == 0,
    'log-bar': true,
    'verde-claro': linhaLog.acao == 'cura' && linhaLog.personagem == 1,
    'azul-claro': linhaLog.acao == 'atkBas' && linhaLog.personagem == 1,
    'amarelo-claro': linhaLog.acao == 'atkEsp' && linhaLog.personagem == 1,
    'vermelho-claro': linhaLog.personagem == 0,
  };
}

RegRanking(){
    if (!this.checkName()) {
      const valorEmitir: Ranking = {
        playerName: this.playerName,
        score: this.score
      };
      console.log(valorEmitir);
      this.service.adicionar(valorEmitir).subscribe(
        (resultado) => {
        console.log(resultado);
        },
        (error) => console.error(error)
      );
      this.router.navigateByUrl('ranking');
    }
  }


// Funções gerais
//=================================================

  RandNumber(min: number, max: number){
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit(): void {
  }

}
