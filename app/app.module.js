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
var platform_browser_1 = require('@angular/platform-browser');
var app_component_1 = require('./app.component');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var common_1 = require('@angular/common');
var globals_1 = require('./globals');
var logged_in_guard_1 = require('./logged-in.guard');
var usuario_service_1 = require('./sistema/services/usuarios/usuario.service');
require('rxjs/add/operator/map');
var cabecalho_module_1 = require('./sistema/cabecalho/cabecalho.module');
var menu_module_1 = require('./sistema/menu/menu.module');
var site_component_1 = require('./sistema/site/site.component');
var login_component_1 = require('./sistema/login/login.component');
var cadastrar_component_1 = require('./sistema/usuarios/cadastrar/cadastrar.component');
var listar_component_1 = require('./sistema/usuarios/listar/listar.component');
var principal_component_1 = require('./sistema/principal/principal.component');
var perfil_component_1 = require('./sistema/perfil/perfil.component');
var listar_component_2 = require('./sistema/menus/listar/listar.component');
var cadastrar_component_2 = require('./sistema/menus/cadastrar/cadastrar.component');
var listar_component_3 = require('./sistema/permissoes/listar/listar.component');
var cadastrar_component_3 = require('./sistema/permissoes/cadastrar/cadastrar.component');
var listar_component_4 = require('./sistema/habitacoes/listar/listar.component');
var cadastrar_component_4 = require('./sistema/habitacoes/cadastrar/cadastrar.component');
var WindowRef_1 = require('./WindowRef');
var app_routes_1 = require('./app.routes');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                menu_module_1.MenuModule,
                cabecalho_module_1.CabecalhoModule,
                app_routes_1.routing,
                forms_1.FormsModule,
                common_1.CommonModule
            ],
            declarations: [
                app_component_1.AppComponent,
                site_component_1.SiteComponent,
                principal_component_1.PrincipalComponent,
                login_component_1.LoginComponent,
                perfil_component_1.PerfilComponent,
                listar_component_2.MenusListarComponent,
                cadastrar_component_2.MenusCadastrarComponent,
                listar_component_1.UsuariosListarComponent,
                cadastrar_component_1.UsuariosCadastrarComponent,
                listar_component_3.PermissoesListarComponent,
                cadastrar_component_3.PermissoesCadastrarComponent,
                listar_component_4.HabitacoesListarComponent,
                cadastrar_component_4.HabitacoesCadastrarComponent
            ],
            providers: [
                globals_1.Globals,
                logged_in_guard_1.LoggedInGuard,
                usuario_service_1.UserService,
                WindowRef_1.WindowRef
            ],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map