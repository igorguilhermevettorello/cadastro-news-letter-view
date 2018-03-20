"use strict";
var router_1 = require('@angular/router');
var logged_in_guard_1 = require('./logged-in.guard');
var site_component_1 = require('./sistema/site/site.component');
var login_component_1 = require('./sistema/login/login.component');
var principal_component_1 = require('./sistema/principal/principal.component');
var perfil_component_1 = require('./sistema/perfil/perfil.component');
var cadastrar_component_1 = require('./sistema/usuarios/cadastrar/cadastrar.component');
var appRoutes = [
    { path: "", component: site_component_1.SiteComponent, pathMatch: 'full' },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "usuarios-cadastrar", component: cadastrar_component_1.UsuariosCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "principal", component: principal_component_1.PrincipalComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "perfil", component: perfil_component_1.PerfilComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "**", component: principal_component_1.PrincipalComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routes.js.map