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
var globals_1 = require('../../../globals');
var router_1 = require('@angular/router');
var UsuariosCadastrarComponent = (function () {
    function UsuariosCadastrarComponent(route, http, globals, router) {
        this.route = route;
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.mensagem = null;
        this.status = null;
        this.alertStatus = null;
        this.hasError = {
            nome: { hasError: null, msg: null },
            email: { hasError: null, msg: null },
            login: { hasError: null, msg: null },
            password: { hasError: null, msg: null },
            confirma: { hasError: null, msg: null }
        };
        this.pessoa = {
            id: null,
            nome: null,
            email: null
        };
        this.usuario = {
            id: null,
            login: null,
            password: null,
            confirma: null,
        };
    }
    UsuariosCadastrarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
            if (!isNaN(_this.id))
                _this.getUsuario(_this.id);
        });
    };
    UsuariosCadastrarComponent.prototype.ngAfterViewInit = function () { };
    UsuariosCadastrarComponent.prototype.limparCampos = function (opcao) {
        this.mensagem = null;
        for (var k in this.hasError) {
            if (k == opcao) {
                this.hasError[k].hasError = null;
                this.hasError[k].msg = null;
            }
        }
    };
    UsuariosCadastrarComponent.prototype.beforeSave = function (event) {
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
        else {
            this.hasError.password.hasError = 'has-error';
            this.hasError.password.msg = 'Senha é obrigatória';
            verificar = false;
            tabLogin = true;
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
    UsuariosCadastrarComponent.prototype.save = function (event) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('x-access-token', localStorage.getItem('auth_token'));
        headers.append('Content-Type', 'application/json');
        var dados = {
            usuario: this.usuario,
            pessoa: this.pessoa
        };
        console.log("dados", dados);
        if (dados.usuario.id === null) {
            var url = this.globals.url + '/usuarios/usuario/';
            this.http.post(url, JSON.stringify(dados), { headers: headers })
                .subscribe(function (res) {
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
                    var msg = error.json();
                    if (typeof msg.msg == "undefined") {
                        _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                    }
                    else {
                        _this.setMensagem('alert-danger', msg.msg, 'Erro', null);
                    }
                }
                else if (error.status == 500) {
                    _this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
                }
                else {
                    _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
                }
            });
        }
        else {
            var url = this.globals.url + '/usuarios/usuario/' + dados.usuario.id;
            this.http.put(url, JSON.stringify(dados), { headers: headers })
                .subscribe(function (response) {
                var res = response.json();
                _this.pessoa.id = res.pessoa.id;
                _this.setMensagem('alert-success', 'Registro atualizado com sucesso.', 'Sucesso', null);
            }, function (error) {
                console.log('error', error);
                if (error.status == 0) {
                    _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
                }
                else if (error.status == 401) {
                    _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                }
                else if (error.status == 400) {
                    var msg = error.json();
                    if (typeof msg.msg == "undefined") {
                        _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                    }
                    else {
                        _this.setMensagem('alert-danger', msg.msg, 'Erro', null);
                    }
                }
                else if (error.status == 500) {
                    _this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
                }
                else {
                    _this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
                }
            });
        }
    };
    UsuariosCadastrarComponent.prototype.getUsuario = function (id) {
        var _this = this;
        var url = this.globals.url + '/usuarios/usuario/' + id;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            var res = response.json();
            _this.usuario.id = res.id;
            _this.usuario.login = res.login;
            _this.pessoa.id = res.pessoa_id;
            _this.pessoa.nome = res.nome;
            _this.pessoa.email = res.email;
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
    UsuariosCadastrarComponent.prototype.setMensagem = function (status, msg, alertStatus, event) {
        if (event)
            event.preventDefault();
        this.status = status;
        this.mensagem = msg;
        this.alertStatus = alertStatus;
    };
    UsuariosCadastrarComponent.prototype.limparForm = function (event) {
        event.preventDefault();
        this.pessoa = {
            id: null,
            nome: null,
            email: null
        };
        this.usuario = {
            id: null,
            login: null,
            password: null,
            confirma: null,
        };
        this.hasError = {
            nome: { hasError: null, msg: null },
            email: { hasError: null, msg: null },
            login: { hasError: null, msg: null },
            password: { hasError: null, msg: null },
            confirma: { hasError: null, msg: null }
        };
    };
    UsuariosCadastrarComponent.prototype.fecharView = function (event) {
        event.preventDefault();
        this.router.navigate(['./principal/']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UsuariosCadastrarComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UsuariosCadastrarComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], UsuariosCadastrarComponent.prototype, "alertStatus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], UsuariosCadastrarComponent.prototype, "hasError", void 0);
    UsuariosCadastrarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'usuarios-cadastrar',
            providers: [globals_1.Globals],
            templateUrl: './cadastrar.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, globals_1.Globals, router_1.Router])
    ], UsuariosCadastrarComponent);
    return UsuariosCadastrarComponent;
}());
exports.UsuariosCadastrarComponent = UsuariosCadastrarComponent;
//# sourceMappingURL=cadastrar.component.js.map