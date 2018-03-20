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
var usuario_service_1 = require('../services/usuarios/usuario.service');
var cabecalho_component_1 = require('../cabecalho/cabecalho.component');
var LoginComponent = (function () {
    function LoginComponent(http, globals, router, userService) {
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.userService = userService;
        this.mensagem = null;
        this.hasError = {
            login: { hasError: null, msg: null },
            password: { hasError: null, msg: null }
        };
        this.usuario = {
            login: null,
            password: null
        };
    }
    LoginComponent.prototype.ngOnInit = function () { };
    LoginComponent.prototype.ngAfterViewInit = function () { };
    LoginComponent.prototype.efetuarLogin = function (event) {
        event.preventDefault();
        var verificar = true;
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
    };
    LoginComponent.prototype.limparCampos = function (opcao) {
        this.mensagem = null;
        for (var k in this.hasError) {
            if (k == opcao) {
                this.hasError[k].hasError = null;
                this.hasError[k].msg = null;
            }
        }
    };
    LoginComponent.prototype.logar = function () {
        var _this = this;
        this.userService.login(this.usuario)
            .subscribe(function (response) {
            _this.router.navigate(['./principal']);
        }, function (error) {
            if (error.status == 0) {
                _this.mensagem = "Não foi possível conectar com o servidor.";
            }
            else if (error.status == 401) {
                _this.mensagem = "Usuário não encotrado.";
            }
            else {
                _this.mensagem = "Erro inesperado. Entre em contato com administrador.";
            }
        });
    };
    __decorate([
        core_1.ViewChild(cabecalho_component_1.CabecalhoComponent), 
        __metadata('design:type', cabecalho_component_1.CabecalhoComponent)
    ], LoginComponent.prototype, "cabecalho", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LoginComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LoginComponent.prototype, "hasError", void 0);
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'login',
            providers: [globals_1.Globals],
            templateUrl: './login.component.html'
        }), 
        __metadata('design:paramtypes', [http_1.Http, globals_1.Globals, router_1.Router, usuario_service_1.UserService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map