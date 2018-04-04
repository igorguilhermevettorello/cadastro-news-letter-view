import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals';

@Component({
    moduleId: module.id,
    selector: 'usuarios-listar',
    providers: [ Globals ],
    templateUrl: './listar.component.html'
})

export class UsuariosListarComponent implements OnInit, AfterViewInit  {

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
    private router: Router ) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.page = + params['page']; // (+) converts string 'id' to a number
       this.page = isNaN(this.page) ? 1 : this.page;
       this.getLista();
    });
  }

  ngAfterViewInit() { }

  public getLista() {

    let url = this.globals.url + '/usuarios/usuarios/' + this.page;
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

  public deletar(id) {

    let url = this.globals.url + '/usuarios/usuario/' + id;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.delete(url, { headers: headers })
      .subscribe((res) => {
        this.setMensagem('alert-success', 'Registro deletado com sucesso.', 'Sucesso', null);
        this.page = 1;
        this.getLista();
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

  public redirect(event, opcao, elemento) {
    event.preventDefault();
    if (opcao == 'paginar') {
      this.router.navigate(['./usuarios-listar/', elemento.pagina]);
    } else if (opcao == 'editar') {
      this.router.navigate(['./usuarios-cadastrar/', elemento.id]);
    } else if (opcao == 'deletar') {
      this.deletar(elemento.id);
    }
  }

  public fecharView(event) {
    event.preventDefault();
    this.router.navigate(['./principal/']);
  }
}