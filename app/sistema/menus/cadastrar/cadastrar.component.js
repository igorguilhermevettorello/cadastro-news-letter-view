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
var MenusCadastrarComponent = (function () {
    function MenusCadastrarComponent(route, http, globals, router) {
        this.route = route;
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.mensagem = null;
        this.status = null;
        this.alertStatus = null;
        this.hasError = {
            descricao: { hasError: null, msg: null },
            controller: { hasError: null, msg: null },
            acao: { hasError: null, msg: null },
            menu_id: { hasError: null, msg: null }
        };
        this.menu = {
            id: null,
            descricao: null,
            controller: null,
            acao: null,
            menu_id: null
        };
        this.selectMenu = [];
    }
    MenusCadastrarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
            if (!isNaN(_this.id))
                _this.getMenu(_this.id);
        });
        this.getSelectMenu();
    };
    MenusCadastrarComponent.prototype.ngAfterViewInit = function () { };
    MenusCadastrarComponent.prototype.limparCampos = function (opcao) {
        this.mensagem = null;
        for (var k in this.hasError) {
            if (k == opcao) {
                this.hasError[k].hasError = null;
                this.hasError[k].msg = null;
            }
        }
    };
    MenusCadastrarComponent.prototype.beforeSave = function (event) {
        console.log("menu", this.menu);
        event.preventDefault();
        var verificar = true;
        if (!this.menu.descricao) {
            this.hasError.descricao.hasError = 'has-error';
            this.hasError.descricao.msg = 'Descrição é obrigatório';
            verificar = false;
        }
        if (!this.menu.menu_id) {
            this.hasError.menu_id.hasError = 'has-error';
            this.hasError.menu_id.msg = 'É necessário vincular o menu.';
            verificar = false;
        }
        console.log("dentro", this.hasError);
        if (verificar) {
            this.save(event);
        }
    };
    MenusCadastrarComponent.prototype.save = function (event) {
        var _this = this;
        var url = this.globals.url + '/menus/menus/';
        var headers = new http_1.Headers();
        headers.append('x-access-token', localStorage.getItem('auth_token'));
        headers.append('Content-Type', 'application/json');
        this.http.post(url, JSON.stringify(this.menu), { headers: headers })
            .subscribe(function (res) {
            console.log("subscribe > ", res.json());
            _this.setMensagem('alert-success', 'Registro salvo com sucesso.', 'Sucesso', null);
        }, function (error) {
            console.log('error', error);
            if (error.status == 0) {
                _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
            }
            else if (error.status == 401) {
                _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            }
            else if (error.status == 400) {
                _this.setMensagem('alert-danger', 'Não foi possível salvar o registro. Tente novamente.', 'Erro', null);
            }
            else {
                _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
            }
        });
    };
    MenusCadastrarComponent.prototype.getSelectMenu = function () {
        var _this = this;
        var url = this.globals.url + '/menus/lista/';
        var headers = new http_1.Headers();
        headers.append('x-access-token', localStorage.getItem('auth_token'));
        headers.append('Content-Type', 'application/json');
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            _this.selectMenu = response.json() || [];
            console.log('this.selectMenu', _this.selectMenu);
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
    MenusCadastrarComponent.prototype.getMenu = function (id) {
        var _this = this;
        var url = this.globals.url + '/menus/menus/' + id;
        var headers = new http_1.Headers();
        headers.append('x-access-token', localStorage.getItem('auth_token'));
        headers.append('Content-Type', 'application/json');
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            _this.menu = response.json() || {
                id: null,
                descricao: null,
                controller: null,
                acao: null,
                menu_id: null
            };
        }, function (error) {
            console.log('error', error);
            if (error.status == 0) {
                _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
            }
            else if (error.status == 401) {
                _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            }
            else if (error.status == 500) {
                _this.setMensagem('alert-danger', 'Erro Interno. Nossa equipe irá verificar essa inconsistência.', 'Erro', null);
            }
            else {
                _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
            }
        });
    };
    MenusCadastrarComponent.prototype.setMensagem = function (status, msg, alertStatus, event) {
        if (event)
            event.preventDefault();
        this.status = status;
        this.mensagem = msg;
        this.alertStatus = alertStatus;
    };
    MenusCadastrarComponent.prototype.limparForm = function (event) {
        event.preventDefault();
        this.menu = {
            id: null,
            descricao: null,
            controller: null,
            acao: null,
            menu_id: null
        };
        this.hasError = {
            descricao: { hasError: null, msg: null },
            controller: { hasError: null, msg: null },
            acao: { hasError: null, msg: null },
            menu_id: { hasError: null, msg: null }
        };
        if (!isNaN(this.id)) {
            this.router.navigate(['./menus-cadastrar/']);
        }
    };
    MenusCadastrarComponent.prototype.fecharView = function (event) {
        event.preventDefault();
        this.router.navigate(['./principal/']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenusCadastrarComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenusCadastrarComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], MenusCadastrarComponent.prototype, "alertStatus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], MenusCadastrarComponent.prototype, "hasError", void 0);
    MenusCadastrarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'menus-cadastrar',
            providers: [globals_1.Globals],
            templateUrl: './cadastrar.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, globals_1.Globals, router_1.Router])
    ], MenusCadastrarComponent);
    return MenusCadastrarComponent;
}());
exports.MenusCadastrarComponent = MenusCadastrarComponent;
//# sourceMappingURL=cadastrar.component.js.map