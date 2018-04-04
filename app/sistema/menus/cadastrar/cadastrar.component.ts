import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { NgSelectOption } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals';

@Component({
  moduleId: module.id,
  selector: 'menus-cadastrar',
  providers: [ Globals ],
  templateUrl: './cadastrar.component.html'
})

export class MenusCadastrarComponent implements OnInit, AfterViewInit {


  @Input() mensagem: string = null;
  @Input() status: string = null;
  @Input() alertStatus: string = null;

  @Input() hasError: any = {
    descricao : {hasError: null, msg: null},
    controller : {hasError: null, msg: null},
    acao : {hasError: null, msg: null},
    menu_id : {hasError: null, msg: null}
  };

  private id: number;
  private sub: any;

  private menu: any = {
    id: null,
    descricao: null,
    controller: null,
    acao: null,
    menu_id: null
  };

  selectMenu: Array<Object> = []

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private globals: Globals,
    private router: Router ) { }

  ngOnInit(){

    this.sub = this.route.params.subscribe(params => {
       this.id = + params['id']; // (+) converts string 'id' to a number
       if (!isNaN(this.id)) this.getMenu(this.id);
    });

    this.getSelectMenu();
  }

  ngAfterViewInit() { }

  public limparCampos(opcao) {
    this.mensagem = null;
    for(let k in this.hasError) {
      if (k == opcao) {
        this.hasError[k].hasError = null;
        this.hasError[k].msg = null;
      }
    }
  }

  public beforeSave(event) {

    console.log("menu", this.menu);

    event.preventDefault();
    let verificar = true;

    if (!this.menu.descricao) {
      this.hasError.descricao.hasError = 'has-error';
      this.hasError.descricao.msg = 'Descrição é obrigatório';
      verificar = false;
    }

    if (!this.menu.menu_id) {
      this.hasError.menu_id.hasError = 'has-error';
      this.hasError.menu_id.msg = 'É necessário vincular o menu.';
      verificar = false;
    }

    console.log("dentro", this.hasError);

    if (verificar) {
      this.save(event);
    }
  }

  public save(event) {

    let url = this.globals.url + '/menus/menus/';
    let headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('auth_token'));
    headers.append('Content-Type', 'application/json');

    this.http.post(url, JSON.stringify(this.menu), { headers: headers })
      .subscribe((res) => {
        console.log("subscribe > ", res.json());
        this.setMensagem('alert-success', 'Registro salvo com sucesso.', 'Sucesso', null);
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
         this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
         this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else if (error.status == 400) {
         this.setMensagem('alert-danger', 'Não foi possível salvar o registro. Tente novamente.', 'Erro', null);
        } else {
          this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        }
      });
  }

  public getSelectMenu() {
    let url = this.globals.url + '/menus/lista/';
    let headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('auth_token'));
    headers.append('Content-Type', 'application/json');

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        this.selectMenu = response.json() || [];
        console.log('this.selectMenu', this.selectMenu);
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

  public getMenu(id) {
    let url = this.globals.url + '/menus/menus/' + id;
    let headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('auth_token'));
    headers.append('Content-Type', 'application/json');

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        this.menu = response.json() || {
          id: null,
          descricao: null,
          controller: null,
          acao: null,
          menu_id: null
        };
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else if (error.status == 500) {
          this.setMensagem('alert-danger', 'Erro Interno. Nossa equipe irá verificar essa inconsistência.', 'Erro', null);
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

  public limparForm(event) {

    event.preventDefault();

    this.menu = {
      id: null,
      descricao: null,
      controller: null,
      acao: null,
      menu_id: null
    };

    this.hasError = {
      descricao : {hasError: null, msg: null},
      controller : {hasError: null, msg: null},
      acao : {hasError: null, msg: null},
      menu_id : {hasError: null, msg: null}
    };

    if (!isNaN(this.id)) {
      this.router.navigate(['./menus-cadastrar/']);
    }

  }

  public fecharView(event) {
    event.preventDefault();
    this.router.navigate(['./principal/']);
  }
}