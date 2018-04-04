import { Component, Inject, Directive, Output, Input, OnInit, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals';
import { Router, ActivatedRoute } from '@angular/router'

declare let jquery : any;
declare let $ : any;

@Component({
  moduleId: module.id,
  selector: 'permissoes-cadastrar',
  providers: [ Globals ],
  templateUrl: './cadastrar.component.html'
})

export class PermissoesCadastrarComponent implements OnInit, AfterViewInit {

  @Input() mensagem: string = null;
  @Input() status: string = null;
  @Input() alertStatus: string = null;

  @Input() hasError: any = {
    usuario_id : {hasError: null, msg: null}
  };

  private id: number;
  private sub: any;
  private usuarios: Array<Object> = [];
  private menus: Array<Object> = [];
  private menus_aux: Array<Object> = [];
  private pais: Array<Object> = [];

  private usuario: any = {
    id: null,
    permissoes: []
  };

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private globals: Globals,
    private router: Router ) { }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
       this.id = + params['id']; // (+) converts string 'id' to a number
       this.id = (!isNaN(this.id)) ? this.id : '';
       this.usuario.id = this.id;
       this.getSelectUsuarios(this.id);
       this.getInfoPermissoes(this.id);
    });
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
    event.preventDefault();
    let verificar = true;

    if (!this.usuario.id) {
      this.hasError.usuario_id.hasError = 'has-error';
      this.hasError.usuario_id.msg = 'Usuário é obrigatório';
      verificar = false;
    }

    if (verificar) {
      this.save(event);
    }
  }

  public save(event) {
    let headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('auth_token'));
    headers.append('Content-Type', 'application/json');

    let dados = {
      usuario: this.usuario,
      menu: this.menus
    };

    //if (dados.usuario.id === null) {
      let url = this.globals.url + '/permissoes/permissao/';
      this.http.post(url, JSON.stringify(dados), { headers: headers })
        .subscribe((res) => {
          this.setMensagem('alert-success', 'Registro salvo com sucesso.', 'Sucesso', null);
        }, error =>  {
          console.log('error', error);
          if (error.status == 0) {
            this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
          } else if (error.status == 401) {
            this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
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
    //} else {
    //  let url = this.globals.url + '/usuarios/usuario/' + dados.usuario.id;
    //  this.http.put(url, JSON.stringify(dados), { headers: headers })
    //    .subscribe((response) => {
    //      let res = response.json()
    //      this.setMensagem('alert-success', 'Registro atualizado com sucesso.', 'Sucesso', null);
    //    }, error =>  {
    //      console.log('error', error);
    //      if (error.status == 0) {
    //        this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
    //      } else if (error.status == 401) {
    //        this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
    //      } else if (error.status == 400) {
    //        let msg = error.json();
    //        if (typeof msg.msg == "undefined") {
    //          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
    //        } else {
    //          this.setMensagem('alert-danger', msg.msg, 'Erro', null);
    //        }
    //      } else if (error.status == 500) {
    //        this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
    //      } else {
    //        this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
    //      }
    //    });
    //}
  }

  public getInfoPermissoes(id) {
    let url = this.globals.url + '/permissoes/permissao/' + id;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        this.menus_aux = response.json();
        console.log('this.menus_aux', this.menus_aux);
        this.organizarMenu(null);
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
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

  public getSelectUsuarios(id){

    let url = this.globals.url + '/usuarios/select/' + id;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        this.usuarios = response.json() || [];
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
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

  public setMensagem(status, msg, alertStatus, event) {
    if (event) event.preventDefault();
    this.status = status;
    this.mensagem = msg;
    this.alertStatus = alertStatus;
  }

  public limparForm(event) {

    event.preventDefault();

    this.usuario = {
      id: null
    };

    this.hasError = {
      nome : {hasError: null, msg: null},
      email : {hasError: null, msg: null},
      login : {hasError: null, msg: null},
      password : {hasError: null, msg: null},
      confirma : {hasError: null, msg: null}
    };
  }

  public organizarMenu(item) {
    item = (typeof item == "undefined" || item === null) ? this.menus_aux.filter((item,index) => index == this.menus.length).map(item => item) : item;
    item = (typeof item.length == "undefined") ? item : item[0];

    if (this.menus.length == 0) {
      item.padding = 0;
      item.color = (item.ativo) ? '#000000' : '#FFFFFF';
      this.menus.push(item);
    }

    this.menus_aux.filter(mn => mn.menu_id == item.id).map(mn => {
      mn.padding = (typeof item.padding == "undefined") ? 15 : item.padding + 15;
      mn.color = (item.ativo) ? '#000000' : '#FFFFFF';
      this.menus.push(mn);
      this.organizarMenu(mn);
    });
  }

  public atualizarPermissao(event, item) {
    event.preventDefault();
    item.ativo = !item.ativo;
    item.color = (item.ativo) ? '#000000' : '#FFFFFF';
  }

  public mudarUsuario(event) {
    console.log("mudarUsuario", this.usuario.id);
    //console.log("event", event);
    console.log("event.target.value", event.target.value);
    //console.log("event.currentTarget", event.currentTarget);
  }
}