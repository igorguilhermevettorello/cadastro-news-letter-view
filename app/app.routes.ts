import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';

import { SiteComponent } from './sistema/site/site.component';
import { LoginComponent } from './sistema/login/login.component';
import { PrincipalComponent } from './sistema/principal/principal.component';
import { PerfilComponent } from './sistema/perfil/perfil.component';
import { UsuariosCadastrarComponent } from './sistema/usuarios/cadastrar/cadastrar.component';
import { UsuariosListarComponent } from './sistema/usuarios/listar/listar.component';
import { MenusListarComponent } from './sistema/menus/listar/listar.component';
import { MenusCadastrarComponent } from './sistema/menus/cadastrar/cadastrar.component';
import { PermissoesListarComponent } from './sistema/permissoes/listar/listar.component';
import { PermissoesCadastrarComponent } from './sistema/permissoes/cadastrar/cadastrar.component';
import { NewsListarComponent } from './sistema/news/listar/listar.component';
import { NewsCadastrarComponent } from './sistema/news/cadastrar/cadastrar.component';

const appRoutes: Routes = [
  {path: "", component: LoginComponent, pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "principal", component: PrincipalComponent, canActivate: [LoggedInGuard]},
  {path: "perfil", component: PerfilComponent, canActivate: [LoggedInGuard]},
  {path: "usuarios-listar", component: UsuariosListarComponent, canActivate: [LoggedInGuard]},
  {path: "usuarios-listar/:page", component: UsuariosListarComponent, canActivate: [LoggedInGuard]},
  {path: "usuarios-cadastrar", component: UsuariosCadastrarComponent, canActivate: [LoggedInGuard]},
  {path: "usuarios-cadastrar/:id", component: UsuariosCadastrarComponent, canActivate: [LoggedInGuard]},
  {path: "menus-listar", component: MenusListarComponent, canActivate: [LoggedInGuard]},
  {path: "menus-listar/:id", component: MenusListarComponent, canActivate: [LoggedInGuard]},
  {path: "menus-cadastrar", component: MenusCadastrarComponent, canActivate: [LoggedInGuard]},
  {path: "menus-cadastrar/:id", component: MenusCadastrarComponent, canActivate: [LoggedInGuard]},
  {path: "permissoes-listar", component: PermissoesListarComponent, canActivate: [LoggedInGuard]},
  {path: "permissoes-listar/:id", component: PermissoesListarComponent, canActivate: [LoggedInGuard]},
  {path: "permissoes-cadastrar", component: PermissoesCadastrarComponent, canActivate: [LoggedInGuard]},
  {path: "permissoes-cadastrar/:id", component: PermissoesCadastrarComponent, canActivate: [LoggedInGuard]},
  {path: "news-listar", component: NewsListarComponent, canActivate: [LoggedInGuard]},
  {path: "news-listar/:id", component: NewsListarComponent, canActivate: [LoggedInGuard]},
  {path: "news-cadastrar", component: NewsCadastrarComponent, canActivate: [LoggedInGuard]},
  {path: "news-cadastrar/:id", component: NewsCadastrarComponent, canActivate: [LoggedInGuard]}
  //{path: "**", component: PrincipalComponent}
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });