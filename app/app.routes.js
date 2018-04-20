"use strict";
var router_1 = require('@angular/router');
var logged_in_guard_1 = require('./logged-in.guard');
var login_component_1 = require('./sistema/login/login.component');
var principal_component_1 = require('./sistema/principal/principal.component');
var perfil_component_1 = require('./sistema/perfil/perfil.component');
var cadastrar_component_1 = require('./sistema/usuarios/cadastrar/cadastrar.component');
var listar_component_1 = require('./sistema/usuarios/listar/listar.component');
var listar_component_2 = require('./sistema/menus/listar/listar.component');
var cadastrar_component_2 = require('./sistema/menus/cadastrar/cadastrar.component');
var listar_component_3 = require('./sistema/permissoes/listar/listar.component');
var cadastrar_component_3 = require('./sistema/permissoes/cadastrar/cadastrar.component');
var listar_component_4 = require('./sistema/habitacoes/listar/listar.component');
var cadastrar_component_4 = require('./sistema/habitacoes/cadastrar/cadastrar.component');
var listar_component_5 = require('./sistema/news/listar/listar.component');
var cadastrar_component_5 = require('./sistema/news/cadastrar/cadastrar.component');
var appRoutes = [
    { path: "", component: login_component_1.LoginComponent, pathMatch: 'full' },
    { path: "login", component: login_component_1.LoginComponent },
    { path: "principal", component: principal_component_1.PrincipalComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "perfil", component: perfil_component_1.PerfilComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "usuarios-listar", component: listar_component_1.UsuariosListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "usuarios-listar/:page", component: listar_component_1.UsuariosListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "usuarios-cadastrar", component: cadastrar_component_1.UsuariosCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "usuarios-cadastrar/:id", component: cadastrar_component_1.UsuariosCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "menus-listar", component: listar_component_2.MenusListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "menus-listar/:id", component: listar_component_2.MenusListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "menus-cadastrar", component: cadastrar_component_2.MenusCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "menus-cadastrar/:id", component: cadastrar_component_2.MenusCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "permissoes-listar", component: listar_component_3.PermissoesListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "permissoes-listar/:id", component: listar_component_3.PermissoesListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "permissoes-cadastrar", component: cadastrar_component_3.PermissoesCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "permissoes-cadastrar/:id", component: cadastrar_component_3.PermissoesCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "habitacoes-listar", component: listar_component_4.HabitacoesListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "habitacoes-listar/:id", component: listar_component_4.HabitacoesListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "habitacoes-cadastrar", component: cadastrar_component_4.HabitacoesCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "habitacoes-cadastrar/:id", component: cadastrar_component_4.HabitacoesCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "news-listar", component: listar_component_5.NewsListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "news-listar/:id", component: listar_component_5.NewsListarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "news-cadastrar", component: cadastrar_component_5.NewsCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] },
    { path: "news-cadastrar/:id", component: cadastrar_component_5.NewsCadastrarComponent, canActivate: [logged_in_guard_1.LoggedInGuard] }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes, { useHash: true });
//# sourceMappingURL=app.routes.js.map