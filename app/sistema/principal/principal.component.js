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
var http_1 = require('@angular/http');
var globals_1 = require('../../globals');
var cabecalho_component_1 = require('../cabecalho/cabecalho.component');
var menu_component_1 = require('../menu/menu.component');
var PrincipalComponent = (function () {
    function PrincipalComponent(http, globals) {
        this.http = http;
        this.globals = globals;
        this.mensagem = null;
        this.status = null;
        this.alertStatus = null;
        this.getInfoUser();
    }
    PrincipalComponent.prototype.ngOnInit = function () { };
    PrincipalComponent.prototype.ngAfterViewInit = function () { };
    PrincipalComponent.prototype.getInfoUser = function () {
        var _this = this;
        var url = this.globals.url + '/perfil/perfil/';
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            var res = response.json();
            //this.usuario.login = res.login;
            //this.pessoa.nome = res.pessoa.nome;
            //this.pessoa.email = res.pessoa.email;
            _this.menu.setUserName(res.pessoa.nome);
            _this.cabecalho.setUserName(res.pessoa.nome);
            _this.cabecalho.setUserImagem(res.pessoa.imagem);
            _this.cabecalho.setUserCreatedAt(_this.dataParaTexto(new Date(res.pessoa.createdAt)));
            _this.cabecalho.setUserUpdatedAt(_this.dataParaTexto(new Date(res.pessoa.updatedAt)));
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
    PrincipalComponent.prototype.setMensagem = function (status, msg, alertStatus, event) {
        if (event)
            event.preventDefault();
        this.status = status;
        this.mensagem = msg;
        this.alertStatus = alertStatus;
    };
    PrincipalComponent.prototype.dataParaTexto = function (data) {
        return data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    };
    __decorate([
        core_1.ViewChild(cabecalho_component_1.CabecalhoComponent), 
        __metadata('design:type', cabecalho_component_1.CabecalhoComponent)
    ], PrincipalComponent.prototype, "cabecalho", void 0);
    __decorate([
        core_1.ViewChild(menu_component_1.MenuComponent), 
        __metadata('design:type', menu_component_1.MenuComponent)
    ], PrincipalComponent.prototype, "menu", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PrincipalComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PrincipalComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PrincipalComponent.prototype, "alertStatus", void 0);
    PrincipalComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'principal',
            templateUrl: './principal.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, globals_1.Globals])
    ], PrincipalComponent);
    return PrincipalComponent;
}());
exports.PrincipalComponent = PrincipalComponent;
//# sourceMappingURL=principal.component.js.map