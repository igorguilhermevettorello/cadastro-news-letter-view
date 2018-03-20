import { Component, Injectable, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Globals } from '../../globals';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';
import { MenuComponent } from '../menu/menu.component';

declare let jquery : any;
declare let $ : any;

@Component({
    moduleId: module.id,
    selector: 'principal',
    templateUrl: './principal.component.html'
})

export class PrincipalComponent implements OnInit, AfterViewInit  {

  @ViewChild(CabecalhoComponent) cabecalho: CabecalhoComponent;
  @ViewChild(MenuComponent) menu: MenuComponent;

  @Input() mensagem: string = null;
  @Input() status: string = null;
  @Input() alertStatus: string = null;

  constructor (
    private http: Http,
    private globals: Globals) {
    this.getInfoUser();
  }

  ngOnInit() {}

  ngAfterViewInit() { }

  public getInfoUser() {

    let url = this.globals.url + '/perfil/perfil/';
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        let res = response.json();
        //this.usuario.login = res.login;
        //this.pessoa.nome = res.pessoa.nome;
        //this.pessoa.email = res.pessoa.email;
        this.menu.setUserName(res.pessoa.nome);
        this.cabecalho.setUserName(res.pessoa.nome);
        this.cabecalho.setUserImagem(res.pessoa.imagem);
        this.cabecalho.setUserCreatedAt(this.dataParaTexto(new Date(res.pessoa.createdAt)));
        this.cabecalho.setUserUpdatedAt(this.dataParaTexto(new Date(res.pessoa.updatedAt)));
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else {
          this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        }
      });
  }

  public setMensagem(status, msg, alertStatus, event) {
    if (event) event.preventDefault();
    this.status = status;
    this.mensagem = msg;
    this.alertStatus = alertStatus;
  }

  public dataParaTexto(data) {
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`;
  }

}