import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jogo-charadas',
  templateUrl: './jogo-charadas.component.html',
  styleUrls: ['./jogo-charadas.component.css'],
})
export class JogoCharadasComponent implements OnInit {
  linhas = 6;
  colunas = 5;

  letras = [];

  constructor() {
    this.letras = [];
    for (let i = 0; i < this.linhas; i++) {
      this.letras[i] = [];
      for (let j = 0; j < this.colunas; j++) {
        this.letras[i][j] = 'a';
      }
    }
  }

  ngOnInit() {}
}
