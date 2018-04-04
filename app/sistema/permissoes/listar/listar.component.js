"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var http_1 = require('@angular/http');
var globals_1 = require('../../../globals');
var PermissoesListarComponent = (function () {
    function PermissoesListarComponent(route, http, globals, router) {
        this.route = route;
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.mensagem = null;
        this.status = null;
        this.alertStatus = null;
        this.lista = [];
        this.paginacao = [];
    }
    PermissoesListarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.page = +params['page']; // (+) converts string 'id' to a number
            _this.page = isNaN(_this.page) ? 1 : _this.page;
            _this.getLista();
        });
    };
    PermissoesListarComponent.prototype.getLista = function () {
        var _this = this;
        var url = this.globals.url + '/usuarios/usuarios/' + this.page;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (res) {
            var lista = res.json();
            _this.lista = lista.lista || [];
            _this.paginacao = lista.paginacao || [];
        }, function (error) {
            console.log('error', error);
            if (error.status == 0) {
                _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
            }
            else if (error.status == 401) {
                _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            }
            else {
                _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
            }
        });
    };
    PermissoesListarComponent.prototype.ngAfterViewInit = function () { };
    PermissoesListarComponent.prototype.setMensagem = function (status, msg, alertStatus, event) {
        if (event)
            event.preventDefault();
        this.status = status;
        this.mensagem = msg;
        this.alertStatus = alertStatus;
    };
    PermissoesListarComponent.prototype.redirect = function (event, opcao, elemento) {
        event.preventDefault();
        if (opcao == 'paginar') {
            this.router.navigate(['./permissoes-listar/', elemento.pagina]);
        }
        else if (opcao == 'editar') {
            this.router.navigate(['./permissoes-cadastrar/', elemento.id]);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PermissoesListarComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PermissoesListarComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PermissoesListarComponent.prototype, "alertStatus", void 0);
    PermissoesListarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'permissoes-listar',
            providers: [globals_1.Globals],
            templateUrl: './listar.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, globals_1.Globals, router_1.Router])
    ], PermissoesListarComponent);
    return PermissoesListarComponent;
}());
exports.PermissoesListarComponent = PermissoesListarComponent;
//# sourceMappingURL=listar.component.js.map