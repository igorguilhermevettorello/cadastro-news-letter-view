import { Component, Inject, Directive, Output, Input, OnInit, AfterViewInit, ViewChild, EventEmitter } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../../globals';
import { Router, ActivatedRoute } from '@angular/router'

declare let jquery : any;
declare let $ : any;

@Component({
  moduleId: module.id,
  selector: 'news-cadastrar',
  providers: [ Globals ],
  templateUrl: './cadastrar.component.html'
})

export class NewsCadastrarComponent implements OnInit, AfterViewInit {

  @Input() mensagem: string = null;
  @Input() status: string = null;
  @Input() alertStatus: string = null;
  @Input() habilitarSave: boolean = false;

  @ViewChild('fileInput') fileInput;

  @Input() hasError: any = {
    html: {hasError: null, msg: null},
    imagem : {hasError: null, msg: null}
  };

  @Input() imgSource: string = null;
  @Input() width: number = 100;
  @Input() height: number = 100;

  @Input() links: any = [];

  private id: number;
  private sub: any;
  private news: any = {
    html: "",
    imagem: ""
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
       if (this.id != '') this.getNewsLetter(this.id);
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

    console.log("id", this.id);

    let verificar = true;

    if (this.links.length == 0) {
      this.setMensagem('alert-danger', 'Links não cadastrados.', 'Erro', null);
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

    let areas = this.links.map(item => `<area shape="rect" coords="${item.coordenada1},${item.coordenada2},${item.coordenada3},${item.coordenada4}" href="${item.link}" alt="${item.link}" target="_blank">`).join(``);

    let descricao = `<!DOCTYPE html>
                     <html>
                       <head>
                         <title></title>
                       </head>
                       <body>
                         <div style="margin:0px; padding: 0px; width: ${this.width}px; height:${this.height}px">
                           <img src="${this.imgSource}" width="${this.width}" height="${this.height}" usemap="#planetmap">
                           <map name="planetmap" id="planetmap">
                             ${areas}
                           </map>
                         </div>
                       </body>
                     <html>`;

    let coordenadas = this.links.map(item=>item).filter(item=>!item.deleted);

    let dados = {
      news: {
        id : this.id,
        descricao : descricao,
        imagem: this.imgSource,
        width: this.width,
        height: this.height
      },
      coordenadas : coordenadas
    };

    if (dados.news.id === "") {
      let url = this.globals.url + '/news/news';
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
          } else if (error.status == 404) {
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
      let url = this.globals.url + '/news/news/' + dados.news.id;
      this.http.put(url, JSON.stringify(dados), { headers: headers })
        .subscribe((response) => {

          let res = response.json();
          this.imgSource = res.news.imagem;
          this.width = parseInt(res.news.width);
          this.height = parseInt(res.news.height);
          this.links = res.coordenadas;

          this.setMensagem('alert-success', 'Registro alterado com sucesso.', 'Sucesso', null);

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
          } else if (error.status == 404) {
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

  public getNewsLetter(id) {
    let url = this.globals.url + '/news/news/' + id;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.get(url, { headers: headers })
      .subscribe((response) => {
        let res = response.json();
        console.log("res", res);

        this.habilitarSave = !this.habilitarSave;
        this.imgSource = res.news.imagem;
        this.width = parseInt(res.news.width);
        this.height = parseInt(res.news.height);
        this.links = res.coordenadas;

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
        } else if (error.status == 404) {
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
        this.router.navigate(['./news-cadastrar']);
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
      html : {hasError: null, msg: null},
      imagem : {hasError: null, msg: null}
    };
  }

  public uploadImagem(event) {

    //this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
    //console.log("teste");
    //return false;

    //this.habilitarSave = !this.habilitarSave;

    event.preventDefault();
    let fileBrowser = this.fileInput.nativeElement;
    let formData = new FormData();

    if (fileBrowser.files[0]) {
      formData.append('files', fileBrowser.files[0]);
    } else {
      this.hasError.imagem.hasError = 'has-error';
      this.hasError.imagem.msg = 'Campo Imagem é obrigatório.';
      return false;
    }

    let url = this.globals.url + '/imagens/imagens';
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('x-access-token', authToken);

    this.http.post(url, formData, { headers: headers })
      .subscribe((res) => {
        let imagem = res.json();
        this.habilitarSave = !this.habilitarSave;
        this.imgSource = imagem.imagem;
      }, error =>  {
        console.log('error', error);
        if (error.status == 0) {
          this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        } else if (error.status == 401) {
          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        } else if (error.status == 400) {
          let msg = error.json();
          console.log("msg", msg);
          if (typeof msg.msg == "undefined") {
            this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
          } else {
            this.status = 'alert-danger';
            this.mensagem = msg.msg;
            this.alertStatus = 'Erro';
            console.log("this.mensagem", this.mensagem);
          }
        } else if (error.status == 500) {
          this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
        } else {
          this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        }
      });
  }

  public adicionaLink(event) {

    event.preventDefault();

    let link = {
      id : "",
      deleted: false,
      coordenada1: 0,
      coordenada2: 0,
      coordenada3: 0,
      coordenada4: 0,
      link: "",
      visivel:true
    }

    this.links.push(link);
  }

  public deleteCoordenadas(link) {
    let url = this.globals.url + '/news/coordenadas/' + link.id;
    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    this.http.delete(url, { headers: headers })
      .subscribe((response) => {
        this.removerLinkView(link);
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

  public removerLinkView(link) {
    link.deleted = true;
  }

  public removerLink(event, link) {
    event.preventDefault();
    (link.id === "") ? this.removerLinkView(link) : this.deleteCoordenadas(link);
  }

  public ocultarMostrarLink(event, link) {
    event.preventDefault();
    link.visivel = !link.visivel;
  }
}