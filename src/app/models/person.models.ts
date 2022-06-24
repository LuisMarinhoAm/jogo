// dar mais uma estudada. Apanhando muito ainda, mas deu certo.

export interface Personagem{
  playerAtivo: number;
  nome: string;
  vida: number;
  normalMin: number;
  normalMax: number;
  espTurn: number;
  espMin: number;
  espMax: number;
  curaMin?: number;
  curaMax?: number;
  atordoamento?: number
}
