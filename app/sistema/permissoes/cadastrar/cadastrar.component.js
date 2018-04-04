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
var PermissoesCadastrarComponent = (function () {
    function PermissoesCadastrarComponent(route, http, globals, router) {
        this.route = route;
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.mensagem = null;
        this.status = null;
        this.alertStatus = null;
        this.hasError = {
            usuario_id: { hasError: null, msg: null }
        };
        this.usuarios = [];
        this.menus = [];
        this.menus_aux = [];
        this.pais = [];
        this.usuario = {
            id: null,
            permissoes: []
        };
    }
    PermissoesCadastrarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
            _this.id = (!isNaN(_this.id)) ? _this.id : '';
            _this.usuario.id = _this.id;
            _this.getSelectUsuarios(_this.id);
            _this.getInfoPermissoes(_this.id);
        });
    };
    PermissoesCadastrarComponent.prototype.ngAfterViewInit = function () { };
    PermissoesCadastrarComponent.prototype.limparCampos = function (opcao) {
        this.mensagem = null;
        for (var k in this.hasError) {
            if (k == opcao) {
                this.hasError[k].hasError = null;
                this.hasError[k].msg = null;
            }
        }
    };
    PermissoesCadastrarComponent.prototype.beforeSave = function (event) {
        event.preventDefault();
        var verificar = true;
        if (!this.usuario.id) {
            this.hasError.usuario_id.hasError = 'has-error';
            this.hasError.usuario_id.msg = 'Usuário é obrigatório';
            verificar = false;
        }
        if (verificar) {
            this.save(event);
        }
    };
    PermissoesCadastrarComponent.prototype.save = function (event) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('x-access-token', localStorage.getItem('auth_token'));
        headers.append('Content-Type', 'application/json');
        var dados = {
            usuario: this.usuario,
            menu: this.menus
        };
        //if (dados.usuario.id === null) {
        var url = this.globals.url + '/permissoes/permissao/';
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
        //} else {
        //  let url = this.globals.url + '/usuarios/usuario/' + dados.usuario.id;
        //  this.http.put(url, JSON.stringify(dados), { headers: headers })
        //    .subscribe((response) => {
        //      let res = response.json()
        //      this.setMensagem('alert-success', 'Registro atualizado com sucesso.', 'Sucesso', null);
        //    }, error =>  {
        //      console.log('error', error);
        //      if (error.status == 0) {
        //        this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
        //      } else if (error.status == 401) {
        //        this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        //      } else if (error.status == 400) {
        //        let msg = error.json();
        //        if (typeof msg.msg == "undefined") {
        //          this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        //        } else {
        //          this.setMensagem('alert-danger', msg.msg, 'Erro', null);
        //        }
        //      } else if (error.status == 500) {
        //        this.setMensagem('alert-danger', 'Ocorreu um erro interno. Nossa equipe já está trabalhando para resolve-lo.', 'Erro', null);
        //      } else {
        //        this.setMensagem('alert-danger', 'Erro inesperado. Entre em contato com administrador.', 'Erro', null);
        //      }
        //    });
        //}
    };
    PermissoesCadastrarComponent.prototype.getInfoPermissoes = function (id) {
        var _this = this;
        var url = this.globals.url + '/permissoes/permissao/' + id;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            _this.menus_aux = response.json();
            console.log('this.menus_aux', _this.menus_aux);
            _this.organizarMenu(null);
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
    };
    PermissoesCadastrarComponent.prototype.getSelectUsuarios = function (id) {
        var _this = this;
        var url = this.globals.url + '/usuarios/select/' + id;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            _this.usuarios = response.json() || [];
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
    };
    PermissoesCadastrarComponent.prototype.setMensagem = function (status, msg, alertStatus, event) {
        if (event)
            event.preventDefault();
        this.status = status;
        this.mensagem = msg;
        this.alertStatus = alertStatus;
    };
    PermissoesCadastrarComponent.prototype.limparForm = function (event) {
        event.preventDefault();
        this.usuario = {
            id: null
        };
        this.hasError = {
            nome: { hasError: null, msg: null },
            email: { hasError: null, msg: null },
            login: { hasError: null, msg: null },
            password: { hasError: null, msg: null },
            confirma: { hasError: null, msg: null }
        };
    };
    PermissoesCadastrarComponent.prototype.organizarMenu = function (item) {
        var _this = this;
        item = (typeof item == "undefined" || item === null) ? this.menus_aux.filter(function (item, index) { return index == _this.menus.length; }).map(function (item) { return item; }) : item;
        item = (typeof item.length == "undefined") ? item : item[0];
        if (this.menus.length == 0) {
            item.padding = 0;
            item.color = (item.ativo) ? '#000000' : '#FFFFFF';
            this.menus.push(item);
        }
        this.menus_aux.filter(function (mn) { return mn.menu_id == item.id; }).map(function (mn) {
            mn.padding = (typeof item.padding == "undefined") ? 15 : item.padding + 15;
            mn.color = (item.ativo) ? '#000000' : '#FFFFFF';
            _this.menus.push(mn);
            _this.organizarMenu(mn);
        });
    };
    PermissoesCadastrarComponent.prototype.atualizarPermissao = function (event, item) {
        event.preventDefault();
        item.ativo = !item.ativo;
        item.color = (item.ativo) ? '#000000' : '#FFFFFF';
    };
    PermissoesCadastrarComponent.prototype.mudarUsuario = function (event) {
        console.log("mudarUsuario", this.usuario.id);
        //console.log("event", event);
        console.log("event.target.value", event.target.value);
        //console.log("event.currentTarget", event.currentTarget);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PermissoesCadastrarComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PermissoesCadastrarComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PermissoesCadastrarComponent.prototype, "alertStatus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PermissoesCadastrarComponent.prototype, "hasError", void 0);
    PermissoesCadastrarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'permissoes-cadastrar',
            providers: [globals_1.Globals],
            templateUrl: './cadastrar.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, globals_1.Globals, router_1.Router])
    ], PermissoesCadastrarComponent);
    return PermissoesCadastrarComponent;
}());
exports.PermissoesCadastrarComponent = PermissoesCadastrarComponent;
//# sourceMappingURL=cadastrar.component.js.map