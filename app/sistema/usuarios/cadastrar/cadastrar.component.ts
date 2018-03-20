import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

declare let jquery : any;
declare let $ : any;

@Component({
    moduleId: module.id,
    selector: 'usuarios-cadastrar',
    templateUrl: './cadastrar.component.html'
})

export class UsuariosCadastrarComponent implements OnInit, AfterViewInit  {

  //@Input() titulo: string;
  //@Input() url: string;
  //descricao: string;

  usuario: any = {
    nome: null,
    email: null
  };

  constructor () {
    this.usuario.nome = null;
    this.usuario.email = null;
  }

  ngOnInit() { }

  ngAfterViewInit() {
    $('#datetimepicker3').datetimepicker({
      format: 'L'
    });
  }
}