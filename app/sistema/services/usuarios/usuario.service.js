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
//import { HttpClient } from '@angular/common/http';
var globals_1 = require('../../../globals');
var router_1 = require('@angular/router');
var UserService = (function () {
    function UserService(http, globals, router) {
        this.http = http;
        this.globals = globals;
        this.router = router;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem('auth_token');
    }
    UserService.prototype.login = function (usuario) {
        var _this = this;
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var url = this.globals.url + '/authentication';
        return this.http.post(url, JSON.stringify(usuario), { headers: headers })
            .map(function (response) {
            var res = response.json();
            if (res.auth_token) {
                localStorage.setItem('auth_token', res.auth_token);
                _this.loggedIn = true;
            }
        });
    };
    UserService.prototype.logout = function () {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('menu');
        localStorage.removeItem('userCreatedAt');
        localStorage.removeItem('userImagem');
        localStorage.removeItem('userName');
        localStorage.removeItem('userUpdatedAt');
        this.loggedIn = false;
    };
    UserService.prototype.isLoggedIn = function () {
        return this.loggedIn;
    };
    UserService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, globals_1.Globals, router_1.Router])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=usuario.service.js.map