import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals';
import { WindowRef } from '../../../WindowRef';

@Component({
    moduleId: module.id,
    selector: 'habitacoes-listar',
    providers: [ Globals ],
    templateUrl: './listar.component.html'
})

export class HabitacoesListarComponent implements OnInit, AfterViewInit  {

  @Input() mensagem: string = null;
  @Input() status: string = null;
  @Input() alertStatus: string = null;

  private page: number;
  private sub: any;
  private lista: Array<Object> = [];
  private paginacao: Array<Object> = []

  constructor (
    private route: ActivatedRoute,
    private http: Http,
    private globals: Globals,
    private router: Router,
    private window: WindowRef ) {
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
       this.page = + params['id']; // (+) converts string 'id' to a number
       this.page = isNaN(this.page) ? 1 : this.page;
       this.getLista();
    });
  }

  public getLista() {
    let url = this.globals.url + '/habitacoes/habitacoes/' + this.page;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((res) => {
        let lista = res.json();
        console.log("lista", lista);
        this.lista = lista.lista || [];
        this.paginacao = lista.paginacao || [];
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

  ngAfterViewInit() { }

  public setMensagem(status, msg, alertStatus, event) {
    if (event) event.preventDefault();
    this.status = status;
    this.mensagem = msg;
    this.alertStatus = alertStatus;
  }

  public gerarPdf(id, url) {
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        let __pad = response.json();
        window.open(__pad.filename);
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else if (error.status == 403) {
          let msg = error.json();
          this.setMensagem('alert-danger', msg.msg, 'Erro', null);
        } else if (error.status == 400) {
          let msg = error.json();
          if (typeof msg.msg == "undefined") {
            this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
          } else {
            this.setMensagem('alert-danger', msg.msg, 'Erro', null);
          }
        } else if (error.status == 500) {
          this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
        } else {
          this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        }
      });

  }

  public deletar(id) {
    let url = this.globals.url + '/habitacoes/habitacao/' + id;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.delete(url, { headers: headers })
      .subscribe((response) => {
        this.getLista();
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else if (error.status == 403) {
          let msg = error.json();
          this.setMensagem('alert-danger', msg.msg, 'Erro', null);
        } else if (error.status == 400) {
          let msg = error.json();
          if (typeof msg.msg == "undefined") {
            this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
          } else {
            this.setMensagem('alert-danger', msg.msg, 'Erro', null);
          }
        } else if (error.status == 500) {
          this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
        } else {
          this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        }
      });

  }

  public redirect(event, opcao, elemento) {
    event.preventDefault();
    if (opcao == 'paginar') {
      this.router.navigate(['./habitacoes-listar/', elemento.pagina]);
    } else if (opcao == 'editar') {
      this.router.navigate(['./habitacoes-cadastrar/', elemento.id]);
    } else if (opcao == 'principal') {
      this.router.navigate(['./principal/']);
    } else if (opcao == 'pdf') {
      let url = this.globals.url + '/pdf/gerar/' + elemento.id;
      this.gerarPdf(elemento.id, url);
    } else if (opcao == 'recibo') {
      let url = this.globals.url + '/pdf/recibo/' + elemento.id;
      this.gerarPdf(elemento.id, url);
    } else if (opcao == 'deletar') {
      this.deletar(elemento.id);
    }
  }
}