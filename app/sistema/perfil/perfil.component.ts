import { Component, Inject, Directive, Output, Input, OnInit, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals';
import { Router } from '@angular/router'
import { appMenu } from '../../constant';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';

declare let jquery : any;
declare let $ : any;

@Component({
  moduleId: module.id,
  selector: 'perfil',
  providers: [ Globals ],
  templateUrl: './perfil.component.html'
})

export class PerfilComponent implements OnInit, AfterViewInit {

  @ViewChild(CabecalhoComponent) cabecalho: CabecalhoComponent;
  @Input() mensagem: string = null;
  @Input() status: string = null;
  @Input() alertStatus: string = null;

  @ViewChild('fileInput') fileInput;

  @Input() hasError: any = {
    nome : {hasError: null, msg: null},
    email : {hasError: null, msg: null},
    imagem : {hasError: null, msg: null},
    login : {hasError: null, msg: null},
    password : {hasError: null, msg: null},
    confirma : {hasError: null, msg: null}
  };

  pessoa: any = {
    nome: null,
    email: null,
    imagem: null
  };

  usuario: any = {
    login: null,
    password: null,
    confirma: null,
  }

  constructor(
    private http: Http,
    private globals: Globals,
    private router: Router ) { }

  ngOnInit(){
    this.getPerfil();
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

    let url = this.globals.url + '/perfil/perfil/';

    let fileBrowser = this.fileInput.nativeElement;
    let formData = new FormData();

    if (fileBrowser.files[0])  formData.append('files', fileBrowser.files[0]);

    formData.append('nome', this.pessoa.nome);
    formData.append('email', this.pessoa.email);

    formData.append('login', this.usuario.login);
    formData.append('password', this.usuario.password);

    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('x-access-token', authToken);

    this.http.post(url, formData, { headers: headers })
      .subscribe((res) => {
        console.log("subscribe > ", res.json());
        this.setMensagem('alert-success', 'Registro salvo com sucesso.', 'Sucesso', null);
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

  public getPerfil() {
    let url = this.globals.url + '/perfil/perfil/';
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        let res = response.json();
        this.usuario.login = res.login;
        this.pessoa.nome = res.pessoa.nome;
        this.pessoa.email = res.pessoa.email;
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


}