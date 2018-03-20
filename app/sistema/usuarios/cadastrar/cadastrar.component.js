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
var UsuariosCadastrarComponent = (function () {
    function UsuariosCadastrarComponent() {
        //@Input() titulo: string;
        //@Input() url: string;
        //descricao: string;
        this.usuario = {
            nome: null,
            email: null
        };
        this.usuario.nome = null;
        this.usuario.email = null;
    }
    UsuariosCadastrarComponent.prototype.ngOnInit = function () { };
    UsuariosCadastrarComponent.prototype.ngAfterViewInit = function () {
        $('#datetimepicker3').datetimepicker({
            format: 'L'
        });
    };
    UsuariosCadastrarComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'usuarios-cadastrar',
            templateUrl: './cadastrar.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], UsuariosCadastrarComponent);
    return UsuariosCadastrarComponent;
}());
exports.UsuariosCadastrarComponent = UsuariosCadastrarComponent;
//# sourceMappingURL=cadastrar.component.js.map