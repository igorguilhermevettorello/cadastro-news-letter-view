import { Component, Inject, Directive, Output, Input, OnInit, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals';
import { Router, ActivatedRoute } from '@angular/router'

declare let jquery : any;
declare let $ : any;

@Component({
  moduleId: module.id,
  selector: 'usuarios-cadastrar',
  providers: [ Globals ],
  templateUrl: './cadastrar.component.html'
})

export class UsuariosCadastrarComponent implements OnInit, AfterViewInit {

  @Input() mensagem: string = null;
  @Input() status: string = null;
  @Input() alertStatus: string = null;

  @Input() hasError: any = {
    nome : {hasError: null, msg: null},
    email : {hasError: null, msg: null},
    login : {hasError: null, msg: null},
    password : {hasError: null, msg: null},
    confirma : {hasError: null, msg: null}
  };

  private id: number;
  private sub: any;

  private pessoa: any = {
    id: null,
    nome: null,
    email: null
  };

  private usuario: any = {
    id: null,
    login: null,
    password: null,
    confirma: null,
  }

  constructor(
    private route: ActivatedRoute,
    private http: Http,
    private globals: Globals,
    private router: Router ) { }

  ngOnInit(){
    this.sub = this.route.params.subscribe(params => {
       this.id = + params['id']; // (+) converts string 'id' to a number
       if (!isNaN(this.id)) this.getUsuario(this.id);
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
    let tabInfo = false;
    let tabLogin = false;

    if (!this.pessoa.nome) {
      this.hasError.nome.hasError = 'has-error';
      this.hasError.nome.msg = 'Nome é obrigatório';
      verificar = false;
      tabInfo = true;
    }

    if (!this.pessoa.email) {
      this.hasError.email.hasError = 'has-error';
      this.hasError.email.msg = 'E-mail é obrigatório';
      verificar = false;
      tabInfo = true;
    }

    if (!this.usuario.login) {
      this.hasError.login.hasError = 'has-error';
      this.hasError.login.msg = 'Login é obrigatório';
      verificar = false;
      tabLogin = true;
    }

    if (this.usuario.password) {
      if (this.usuario.password !== this.usuario.confirma) {
        this.hasError.password.hasError = 'has-error';
        this.hasError.password.msg = 'Senhas não conferem';
        verificar = false;
        tabLogin = true;
      }
    } else {
      this.hasError.password.hasError = 'has-error';
      this.hasError.password.msg = 'Senha é obrigatória';
      verificar = false;
      tabLogin = true;
    }

    if (verificar) {
      this.save(event);
    } else {
      if (tabInfo) {
        $("#tab-info").click();
      } else if (tabLogin) {
        $("#tab-login").click();
      }
    }
  }

  public save(event) {

    let headers = new Headers();
    headers.append('x-access-token', localStorage.getItem('auth_token'));
    headers.append('Content-Type', 'application/json');

    let dados = {
      usuario: this.usuario,
      pessoa: this.pessoa
    };

    console.log("dados", dados);

    if (dados.usuario.id === null) {
      let url = this.globals.url + '/usuarios/usuario/';
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
    } else {
      let url = this.globals.url + '/usuarios/usuario/' + dados.usuario.id;
      this.http.put(url, JSON.stringify(dados), { headers: headers })
        .subscribe((response) => {
          let res = response.json()
          this.pessoa.id = res.pessoa.id;
          this.setMensagem('alert-success', 'Registro atualizado com sucesso.', 'Sucesso', null);
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
  }

  public getUsuario(id) {

    let url = this.globals.url + '/usuarios/usuario/' + id;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        let res = response.json();
        this.usuario.id = res.id;
        this.usuario.login = res.login;
        this.pessoa.id = res.pessoa_id;
        this.pessoa.nome = res.nome;
        this.pessoa.email = res.email;
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

  public limparForm(event) {

    event.preventDefault();

    this.pessoa = {
      id: null,
      nome: null,
      email: null
    };

    this.usuario = {
      id: null,
      login: null,
      password: null,
      confirma: null,
    };

    this.hasError = {
      nome : {hasError: null, msg: null},
      email : {hasError: null, msg: null},
      login : {hasError: null, msg: null},
      password : {hasError: null, msg: null},
      confirma : {hasError: null, msg: null}
    };
  }

  public fecharView(event) {
    event.preventDefault();
    this.router.navigate(['./principal/']);
  }
}