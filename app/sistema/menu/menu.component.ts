import { Component, Inject, Input, OnInit, AfterViewInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Globals } from '../../globals';
import { Router } from '@angular/router'
import { appMenu } from '../../constant'

declare let jquery : any;
declare let $ : any;

@Component({
  moduleId: module.id,
  selector: 'menu',
  providers: [ Globals ],
  templateUrl: './menu.component.html'
})

export class MenuComponent implements OnInit, AfterViewInit {

  @Input() mensagem: string = null;
  @Input() menu: string = null;
  @Input() userName: string = null;

  __menu: Array<Object> = []

  constructor(
    private http: Http,
    private globals: Globals,
    private router: Router ) {

    this.userName =
      (localStorage.getItem("userName") === null) ?
        null : localStorage.getItem("userName");

  }

  public setUserName(userName) {
    if (localStorage.getItem("userName") === null) localStorage.setItem("userName", userName);
    this.userName = userName;
  }

  ngOnInit(){
    this.getMenu(1);
    //this.menu = '<li class="treeview" title="2-6"><a href="#"><i class="fa fa-share"></i><span>Menu</span><span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu"><li class="treeview li-2" title="4-5"><a href="#" style="padding-left: 15px">Usuários<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-2"><li class="treeview li-4"><a href="#" style="padding-left: 30px">cadastrar</a></li><li class="treeview li-5"><a href="#" style="padding-left: 30px">listar</a></li></ul></li><li class="treeview li-6" title="7-8"><a href="#" style="padding-left: 15px">Pessoas<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-6"><li class="treeview li-7"><a href="#" style="padding-left: 30px">cadastrar</a></li><li class="treeview li-8" title="9-10"><a href="#" style="padding-left: 30px">listar<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-8"><li class="treeview li-9" title="11-12"><a href="#" style="padding-left: 45px">simples<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-9"><li class="treeview li-11"><a href="#" style="padding-left: 60px">nome</a></li><li class="treeview li-12" title="13"><a href="#" style="padding-left: 60px">sei lá<span class="pull-right pull-right-menu"><span class="glyphicon glyphicon-chevron-left rotate"></span></span></a><ul class="treeview-menu ul-12"><li class="treeview li-13"><a href="#" style="padding-left: 75px">sei la 2</a></li></ul></li></ul></li><li class="treeview li-10"><a href="#" style="padding-left: 45px">elaborada</a></li></ul></li></ul></li></ul></li>';
  }

  ngAfterViewInit() {

    $(".treeview")
      .hide()
      .first()
      .show()
      .click((event) => {

        event.preventDefault();

        $(event.target)
          .parents("li.treeview")
          .first()
          .find("a")
          .first()
          .find("span.rotate")
          .toggleClass("down");

        if (typeof $(event.target).parents("li.treeview").attr("title") == "undefined") {
          return false;
        }

        $(event.target)
          .parents("li.treeview")
          .attr("title")
          .split("-")
          .map((item) => {
            let identUL = `.ul-${item}`;
            let identLI = `.li-${item}`;
            if ($(identUL).length >= 1) {
              $(identUL).parent("li").slideToggle("slow");
            } else if ($(identLI).length >= 1) {
              $(identLI).slideToggle("slow");
            }
          });
      });
  }

  public testar(event) {
    event.preventDefault();
    console.log("event", event.target);
  }

  public createHtmlMenu(menu) {

    console.log('menu', menu);

    let ids, sub, str : string = null;

    //if (menu.sub) {
    //  ids = menu.sub.map(item => item.id).join('-');
    //  sub = menu.sub.map(item => `
    //    <li class="treeview li-${item.id}" data-id="${item.id}">
    //      <a href="#" style="padding-left: 15px" onclick="actionMenu(event)">
    //        ${item.descricao}
    //        <span class="pull-right pull-right-menu">
    //          <span class="glyphicon glyphicon-chevron-left rotate"></span>
    //        </span>
    //      </a>
    //    <li>`).join(``);
    //}

    str = `<li class="treeview" data-id="${menu.id}" data-padding="0">
             <a href="#" class="link-menu" onclick="actionMenu(event)">
               ${menu.descricao}
               <span class="pull-right pull-right-menu">
                 <span class="glyphicon glyphicon-chevron-left rotate"></span>
               </span>
             </a>
           </li>`;

    //this.menu = (menu.sub) ? `${str}<ul>${sub}</ul></li>` : `${str}<li>`;
    //this.inicializarMenu();
    this.menu = str;

  }

  public inicializarMenu() {
    if ($(".treeview").length == 0) {
      setTimeout(() => {
        this.inicializarMenu();
      }, 1000);
    } else {
      $(".treeview").hide().first().show();
    }
  }

  public getMenu(id) {

    let headers = new Headers();
    let authToken = localStorage.getItem('auth_token');
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', authToken);

    let url = this.globals.url + '/menus/menu/' + id;
    this.http.get(url, { headers: headers })
      .subscribe((res) => {

        let menu = res.json();

        this.__menu.push(menu);

        localStorage.setItem('menu', JSON.stringify(this.__menu));

        if (id == 1) this.createHtmlMenu(menu);

        if (typeof menu.sub != 'undefined') menu.sub.map(item => this.getMenu(item.id));

      }, error =>  {
        console.log('error', error);
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