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
var usuario_service_1 = require('../services/usuarios/usuario.service');
var router_1 = require('@angular/router');
var CabecalhoComponent = (function () {
    function CabecalhoComponent(router, userService) {
        this.router = router;
        this.userService = userService;
        this.userName = null;
        this.userInfo = null;
        this.userImagem = 'img/avatar-user.png';
        this.userCreatedAt = null;
        this.userUpdatedAt = null;
        this.userName =
            (localStorage.getItem("userName") === null) ?
                null : localStorage.getItem("userName");
        this.userImagem =
            (localStorage.getItem("userImagem") === null) ?
                null : localStorage.getItem("userImagem");
        this.userCreatedAt =
            (localStorage.getItem("userCreatedAt") === null) ?
                null : 'Criado em: ' + localStorage.getItem("userCreatedAt");
        this.userUpdatedAt =
            (localStorage.getItem("userUpdatedAt") === null) ?
                null : 'Alterado em: ' + localStorage.getItem("userUpdatedAt");
    }
    CabecalhoComponent.prototype.logout = function (event) {
        event.preventDefault();
        this.userService.logout();
        this.router.navigate(['./login']);
    };
    CabecalhoComponent.prototype.perfil = function (event) {
        event.preventDefault();
        this.router.navigate(['./perfil']);
    };
    CabecalhoComponent.prototype.user = function (event) {
        event.preventDefault();
        this.router.navigate(['./usuarios/cadastrar']);
    };
    CabecalhoComponent.prototype.setUserName = function (userName) {
        if (localStorage.getItem("userName") === null)
            localStorage.setItem("userName", userName);
        this.userName = userName;
    };
    CabecalhoComponent.prototype.setUserImagem = function (userImagem) {
        if (localStorage.getItem("userImagem") === null)
            localStorage.setItem("userImagem", userImagem);
        this.userImagem = userImagem;
    };
    CabecalhoComponent.prototype.setUserCreatedAt = function (userCreatedAt) {
        if (localStorage.getItem("userCreatedAt") === null)
            localStorage.setItem("userCreatedAt", userCreatedAt);
        this.userCreatedAt = "Criado em: " + userCreatedAt;
    };
    CabecalhoComponent.prototype.setUserUpdatedAt = function (userUpdatedAt) {
        if (localStorage.getItem("userUpdatedAt") === null)
            localStorage.setItem("userUpdatedAt", userUpdatedAt);
        this.userUpdatedAt = "Alterado em: " + userUpdatedAt;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CabecalhoComponent.prototype, "userName", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CabecalhoComponent.prototype, "userInfo", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CabecalhoComponent.prototype, "userImagem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CabecalhoComponent.prototype, "userCreatedAt", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CabecalhoComponent.prototype, "userUpdatedAt", void 0);
    CabecalhoComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cabecalho',
            templateUrl: './cabecalho.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, usuario_service_1.UserService])
    ], CabecalhoComponent);
    return CabecalhoComponent;
}());
exports.CabecalhoComponent = CabecalhoComponent;
//# sourceMappingURL=cabecalho.component.js.map