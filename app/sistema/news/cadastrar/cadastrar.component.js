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
var NewsCadastrarComponent = (function () {
    function NewsCadastrarComponent(route, http, globals, router) {
        this.route = route;
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.mensagem = null;
        this.status = null;
        this.alertStatus = null;
        this.habilitarSave = false;
        this.hasError = {
            html: { hasError: null, msg: null },
            imagem: { hasError: null, msg: null }
        };
        this.imgSource = null;
        this.width = 100;
        this.height = 100;
        this.links = [];
        this.news = {
            html: "",
            imagem: ""
        };
    }
    NewsCadastrarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this.route.params.subscribe(function (params) {
            _this.id = +params['id']; // (+) converts string 'id' to a number
            _this.id = (!isNaN(_this.id)) ? _this.id : '';
            if (_this.id != '')
                _this.getNewsLetter(_this.id);
        });
    };
    NewsCadastrarComponent.prototype.ngAfterViewInit = function () { };
    NewsCadastrarComponent.prototype.limparCampos = function (opcao) {
        this.mensagem = null;
        for (var k in this.hasError) {
            if (k == opcao) {
                this.hasError[k].hasError = null;
                this.hasError[k].msg = null;
            }
        }
    };
    NewsCadastrarComponent.prototype.beforeSave = function (event) {
        event.preventDefault();
        console.log("id", this.id);
        var verificar = true;
        if (this.links.length == 0) {
            this.setMensagem('alert-danger', 'Links não cadastrados.', 'Erro', null);
            verificar = false;
        }
        if (verificar) {
            this.save(event);
        }
    };
    NewsCadastrarComponent.prototype.save = function (event) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('x-access-token', localStorage.getItem('auth_token'));
        headers.append('Content-Type', 'application/json');
        var areas = this.links.map(function (item) { return ("<area shape=\"rect\" coords=\"" + item.coordenada1 + "," + item.coordenada2 + "," + item.coordenada3 + "," + item.coordenada4 + "\" href=\"" + item.link + "\" alt=\"" + item.link + "\" target=\"_blank\">"); }).join("");
        var descricao = "<!DOCTYPE html>\n                     <html>\n                       <head>\n                         <title></title>\n                       </head>\n                       <body>\n                         <div style=\"margin:0px; padding: 0px; width: " + this.width + "px; height:" + this.height + "px\">\n                           <img src=\"" + this.imgSource + "\" width=\"" + this.width + "\" height=\"" + this.height + "\" usemap=\"#planetmap\">\n                           <map name=\"planetmap\" id=\"planetmap\">\n                             " + areas + "\n                           </map>\n                         </div>\n                       </body>\n                     <html>";
        var coordenadas = this.links.map(function (item) { return item; }).filter(function (item) { return !item.deleted; });
        var dados = {
            news: {
                id: this.id,
                descricao: descricao,
                imagem: this.imgSource,
                width: this.width,
                height: this.height
            },
            coordenadas: coordenadas
        };
        if (dados.news.id === "") {
            var url = this.globals.url + '/news/news';
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
                else if (error.status == 404) {
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
            var url = this.globals.url + '/news/news/' + dados.news.id;
            this.http.put(url, JSON.stringify(dados), { headers: headers })
                .subscribe(function (response) {
                var res = response.json();
                _this.imgSource = res.news.imagem;
                _this.width = parseInt(res.news.width);
                _this.height = parseInt(res.news.height);
                _this.links = res.coordenadas;
                _this.setMensagem('alert-success', 'Registro alterado com sucesso.', 'Sucesso', null);
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
                else if (error.status == 404) {
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
    NewsCadastrarComponent.prototype.getNewsLetter = function (id) {
        var _this = this;
        var url = this.globals.url + '/news/news/' + id;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.get(url, { headers: headers })
            .subscribe(function (response) {
            var res = response.json();
            console.log("res", res);
            _this.habilitarSave = !_this.habilitarSave;
            _this.imgSource = res.news.imagem;
            _this.width = parseInt(res.news.width);
            _this.height = parseInt(res.news.height);
            _this.links = res.coordenadas;
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
            else if (error.status == 404) {
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
            _this.router.navigate(['./news-cadastrar']);
        });
    };
    NewsCadastrarComponent.prototype.setMensagem = function (status, msg, alertStatus, event) {
        if (event)
            event.preventDefault();
        this.status = status;
        this.mensagem = msg;
        this.alertStatus = alertStatus;
    };
    NewsCadastrarComponent.prototype.limparForm = function (event) {
        event.preventDefault();
        this.usuario = {
            id: null
        };
        this.hasError = {
            html: { hasError: null, msg: null },
            imagem: { hasError: null, msg: null }
        };
    };
    NewsCadastrarComponent.prototype.uploadImagem = function (event) {
        //this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
        //console.log("teste");
        //return false;
        var _this = this;
        //this.habilitarSave = !this.habilitarSave;
        event.preventDefault();
        var fileBrowser = this.fileInput.nativeElement;
        var formData = new FormData();
        if (fileBrowser.files[0]) {
            formData.append('files', fileBrowser.files[0]);
        }
        else {
            this.hasError.imagem.hasError = 'has-error';
            this.hasError.imagem.msg = 'Campo Imagem é obrigatório.';
            return false;
        }
        var url = this.globals.url + '/imagens/imagens';
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('x-access-token', authToken);
        this.http.post(url, formData, { headers: headers })
            .subscribe(function (res) {
            var imagem = res.json();
            _this.habilitarSave = !_this.habilitarSave;
            _this.imgSource = imagem.imagem;
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
                console.log("msg", msg);
                if (typeof msg.msg == "undefined") {
                    _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
                }
                else {
                    _this.status = 'alert-danger';
                    _this.mensagem = msg.msg;
                    _this.alertStatus = 'Erro';
                    console.log("this.mensagem", _this.mensagem);
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
    NewsCadastrarComponent.prototype.adicionaLink = function (event) {
        event.preventDefault();
        var link = {
            id: "",
            deleted: false,
            coordenada1: 0,
            coordenada2: 0,
            coordenada3: 0,
            coordenada4: 0,
            link: "",
            visivel: true
        };
        this.links.push(link);
    };
    NewsCadastrarComponent.prototype.deleteCoordenadas = function (link) {
        var _this = this;
        var url = this.globals.url + '/news/coordenadas/' + link.id;
        var headers = new http_1.Headers();
        var authToken = localStorage.getItem('auth_token');
        headers.append('Content-Type', 'application/json');
        headers.append('x-access-token', authToken);
        this.http.delete(url, { headers: headers })
            .subscribe(function (response) {
            _this.removerLinkView(link);
        }, function (error) {
            console.log('error', error);
            if (error.status == 0) {
                _this.setMensagem('alert-danger', 'Não foi possível conectar com o servidor.', 'Erro', null);
            }
            else if (error.status == 401) {
                _this.setMensagem('alert-danger', 'Usuário não encotrado.', 'Erro', null);
            }
            else if (error.status == 403) {
                var msg = error.json();
                _this.setMensagem('alert-danger', msg.msg, 'Erro', null);
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
    NewsCadastrarComponent.prototype.removerLinkView = function (link) {
        link.deleted = true;
    };
    NewsCadastrarComponent.prototype.removerLink = function (event, link) {
        event.preventDefault();
        (link.id === "") ? this.removerLinkView(link) : this.deleteCoordenadas(link);
    };
    NewsCadastrarComponent.prototype.ocultarMostrarLink = function (event, link) {
        event.preventDefault();
        link.visivel = !link.visivel;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsCadastrarComponent.prototype, "mensagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsCadastrarComponent.prototype, "status", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsCadastrarComponent.prototype, "alertStatus", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NewsCadastrarComponent.prototype, "habilitarSave", void 0);
    __decorate([
        core_1.ViewChild('fileInput'), 
        __metadata('design:type', Object)
    ], NewsCadastrarComponent.prototype, "fileInput", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NewsCadastrarComponent.prototype, "hasError", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NewsCadastrarComponent.prototype, "imgSource", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NewsCadastrarComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NewsCadastrarComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NewsCadastrarComponent.prototype, "links", void 0);
    NewsCadastrarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'news-cadastrar',
            providers: [globals_1.Globals],
            templateUrl: './cadastrar.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, http_1.Http, globals_1.Globals, router_1.Router])
    ], NewsCadastrarComponent);
    return NewsCadastrarComponent;
}());
exports.NewsCadastrarComponent = NewsCadastrarComponent;
//# sourceMappingURL=cadastrar.component.js.map