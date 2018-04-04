import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals';

@Component({
    moduleId: module.id,
    selector: 'permissoes-listar',
    providers: [ Globals ],
    templateUrl: './listar.component.html'
})

export class PermissoesListarComponent implements OnInit, AfterViewInit  {

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

  public getLista() {

    let url = this.globals.url + '/usuarios/usuarios/' + this.page;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((res) => {
        let lista = res.json();
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

  public redirect(event, opcao, elemento) {
    event.preventDefault();
    if (opcao == 'paginar') {
      this.router.navigate(['./permissoes-listar/', elemento.pagina]);
    } else if (opcao == 'editar') {
      this.router.navigate(['./permissoes-cadastrar/', elemento.id]);
    }
  }
}