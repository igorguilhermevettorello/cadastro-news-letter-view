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
var router_1 = require('@angular/router');
var cabecalho_component_1 = require('../cabecalho/cabecalho.component');
var PerfilComponent = (function () {
    function PerfilComponent(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.mensagem = null;
        this.status = null;
        this.alertStatus = null;
        this.hasError = {
            nome: { hasError: null, msg: null },
            email: { hasError: null, msg: null },
            imagem: { hasError: null, msg: null },
            login: { hasError: null, msg: null },
            password: { hasError: null, msg: null },
            confirma: { hasError: null, msg: null }
        };
        this.pessoa = {
            nome: null,
            email: null,
            imagem: null
        };
        this.usuario = {
            login: null,
            password: null,
            confirma: null,
        };
    }
    PerfilComponent.prototype.ngOnInit = function () {
        this.getPerfil();
    };
    PerfilComponent.prototype.ngAfterViewInit = function () { };
    PerfilComponent.prototype.limparCampos = function (opcao) {
        this.mensagem = null;
        for (var k in this.hasError) {
            if (k == opcao) {
                this.hasError[k].hasError = null;
                this.hasError[k].msg = null;
            }
        }
    };
    PerfilComponent.prototype.beforeSave = function (event) {
        event.preventDefault();
        var verificar = true;
        var tabInfo = false;
        var tabLogin = false;
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
        }
        else {
            if (tabInfo) {
                $("#tab-info").click();
            }
            else if (tabLogin) {
                $("#tab-login").click();
            }
        }
    };
    PerfilComponent.prototype.save = function (event) {
        var _this = this;
        var url = this.globals.url + '/perfil/perfil/';
        var fileBrowser = this.fileInput.nativeElement;
        var formData = new FormData();
        if (fileBrowser.files[0])
            formData.append('files', fileBrowser.files[0]);
        formData.append('nome', this.pessoa.nome);
        formData.append('email', this.pessoa.email);
        formData.append('login', this.usuario.login);
        formData.append('password', this.usuario.password);
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('x-access-token', authToken);
        this.http.post(url, formData, { headers: headers })
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
            else {
                _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
            }
        });
    };
    PerfilComponent.prototype.getPerfil = function () {
        var _this = this;
        var url = this.globals.url + '/perfil/perfil/';
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            var res = response.json();
            _this.usuario.login = res.login;
            _this.pessoa.nome = res.pessoa.nome;
            _this.pessoa.email = res.pessoa.email;
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
    PerfilComponent.prototype.setMensagem = function (status, msg, alertStatus, event) {
        if (event)
            event.preventDefault();
        this.status = status;
        this.mensagem = msg;
        this.alertStatus = alertStatus;
    };
    __decorate([
        core_1.ViewChild(cabecalho_component_1.CabecalhoComponent), 
        __metadata('design:type', cabecalho_component_1.CabecalhoComponent)
    ], PerfilComponent.prototype, "cabecalho", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PerfilComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PerfilComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PerfilComponent.prototype, "alertStatus", void 0);
    __decorate([
        core_1.ViewChild('fileInput'), 
        __metadata('design:type', Object)
    ], PerfilComponent.prototype, "fileInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PerfilComponent.prototype, "hasError", void 0);
    PerfilComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'perfil',
            providers: [globals_1.Globals],
            templateUrl: './perfil.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, globals_1.Globals, router_1.Router])
    ], PerfilComponent);
    return PerfilComponent;
}());
exports.PerfilComponent = PerfilComponent;
//# sourceMappingURL=perfil.component.js.map