import { Component, Inject, Input, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals';
import { Router } from '@angular/router'
import { UserService } from '../services/usuarios/usuario.service';
import { CabecalhoComponent } from '../cabecalho/cabecalho.component';

@Component({
    moduleId: module.id,
    selector: 'login',
    providers: [ Globals ],
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, AfterViewInit  {

  @ViewChild(CabecalhoComponent) cabecalho: CabecalhoComponent;

  @Input() mensagem: string = null;

  @Input() hasError: any = {
    login : {hasError: null, msg: null},
    password : {hasError: null, msg: null}
  };

  usuario: any = {
    login: null,
    password: null
  };

  constructor(
    private http: Http,
    private globals: Globals,
    private router: Router,
    private userService: UserService) {}

  ngOnInit() { }

  ngAfterViewInit() { }

  public efetuarLogin(event) {
    event.preventDefault();
    let verificar = true;

    if (!this.usuario.login) {
      this.hasError.login.hasError = 'has-error';
      this.hasError.login.msg = 'Login é obrigatório';
      verificar = false;
    }

    if (!this.usuario.password) {
      this.hasError.password.hasError = 'has-error';
      this.hasError.password.msg = 'Senha é obrigatório';
      verificar = false;
    }

    if (verificar) {
      this.logar();
    }
  }

  public limparCampos(opcao) {
    this.mensagem = null;
    for(let k in this.hasError) {
      if (k == opcao) {
        this.hasError[k].hasError = null;
        this.hasError[k].msg = null;
      }
    }
  }

  public logar() {

    this.userService.login(this.usuario)
      .subscribe((response) => {
        this.router.navigate(['./principal']);
      }, error =>  {
        if (error.status == 0) {
          this.mensagem = "Não foi possível conectar com o servidor.";
        } else if (error.status == 401) {
          this.mensagem = "Usuário não encotrado.";
        } else {
          this.mensagem = "Erro inesperado. Entre em contato com administrador.";
        }
      });
  }
}