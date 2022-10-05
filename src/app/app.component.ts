import { Component, OnInit, VERSION } from '@angular/core';
import { JogoCharadasComponent } from '../jogoCharadas/jogo-charadas/jogo-charadas.component';

import palavrasData from './Files/palavras.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  linhas = 6;
  colunas = 5;

  letras = [];

  tentativa = 1;
  letrasDaTentativa = 0;
  palavraDaTentativa = '';

  palavra = '';

  palavraChave: string[];

  constructor() {
    this.palavraChave = palavrasData[Math.floor(Math.random() * 7)].palavra;

    for (let i = 0; i < 5; i++) {
      this.palavra += this.palavraChave[i].toUpperCase();
    }

    this.letras = [];
    for (let i = 0; i < this.linhas; i++) {
      this.letras[i] = [];
      for (let j = 0; j < this.colunas; j++) {
        this.letras[i][j] = { caracter: '', status: 'celula' };
      }
    }
  }

  ngOnInit() {}

  colocaCaracter(c) {
    if (this.letrasDaTentativa < this.colunas && this.tentativa <= 6) {
      this.letras[this.tentativa - 1][this.letrasDaTentativa].caracter = c;
      this.letrasDaTentativa++;
    }
  }

  removeCaracter() {
    if (this.letrasDaTentativa > 0 && this.tentativa <= 6) {
      this.letras[this.tentativa - 1][this.letrasDaTentativa - 1].caracter = '';
      this.letrasDaTentativa--;
    }
  }

  confirmaPalavra() {
    if (this.letrasDaTentativa == 5 && this.tentativa <= 6) {
      this.verificaSeAcertou();
    }
  }

  verificaSeAcertou() {
    var acertou = true;
    var erros = [];
    for (let i = 0; i < this.colunas; i++) {
      if (this.letras[this.tentativa - 1][i].caracter != this.palavra[i]) {
        acertou = false;
        erros.push(this.letras[this.tentativa - 1][i].caracter);
      } else {
        this.letras[this.tentativa - 1][i].status = 'celula-acerto';
        if (
          document.getElementById(this.letras[this.tentativa - 1][i].caracter)
            .style.backgroundColor != 'green'
        ) {
          document.getElementById(
            this.letras[this.tentativa - 1][i].caracter
          ).style.backgroundColor = 'green';
        }
      }
    }
    if (acertou) {
      //mensagem de vitória
      alert(
        'Você venceu! A palavra era ' +
          this.palavra +
          '. Pressione F5 para recomeçar.'
      );
    } else {
      for (let i = 0; i < this.colunas; i++) {
        if (this.letras[this.tentativa - 1][i].status != 'celula-acerto') {
          var achou = false;
          var index = i;

          for (let j = 0; j < this.colunas; j++) {
            if (
              this.palavra[j] == this.letras[this.tentativa - 1][i].caracter
            ) {
              achou = true;
              index = j;
            }
          }
          if (
            achou &&
            this.letras[this.tentativa - 1][index].status != 'celula-acerto' &&
            this.letras[this.tentativa - 1][index].status != 'celula-neutro'
          ) {
            this.letras[this.tentativa - 1][i].status = 'celula-neutro';
            if (
              document.getElementById(
                this.letras[this.tentativa - 1][i].caracter
              ).style.backgroundColor != 'orange' &&
              document.getElementById(
                this.letras[this.tentativa - 1][i].caracter
              ).style.backgroundColor != 'green'
            ) {
              document.getElementById(
                this.letras[this.tentativa - 1][i].caracter
              ).style.backgroundColor = 'orange';
            }
          } else {
            this.letras[this.tentativa - 1][i].status = 'celula-erro';
            if (
              document.getElementById(
                this.letras[this.tentativa - 1][i].caracter
              ).style.backgroundColor != 'orange' &&
              document.getElementById(
                this.letras[this.tentativa - 1][i].caracter
              ).style.backgroundColor != 'green' &&
              document.getElementById(
                this.letras[this.tentativa - 1][i].caracter
              ).style.backgroundColor != 'darkgrey'
            ) {
              document.getElementById(
                this.letras[this.tentativa - 1][i].caracter
              ).style.backgroundColor = 'darkgrey';
            }
          }
        }
      }
      this.tentativa++;
      this.letrasDaTentativa = 0;
      if (this.tentativa > 6) {
        //mensagem de game over
        alert(
          'Fim de jogo! a palavra era ' +
            this.palavra +
            ' pressione F5 para recomeçar.'
        );
      }
    }
  }
}
