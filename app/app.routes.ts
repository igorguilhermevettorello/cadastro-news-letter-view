import { RouterModule, Routes } from '@angular/router';
import { LoggedInGuard } from './logged-in.guard';

import { SiteComponent }   from './sistema/site/site.component';
import { LoginComponent }   from './sistema/login/login.component';
import { PrincipalComponent }   from './sistema/principal/principal.component';
import { PerfilComponent }   from './sistema/perfil/perfil.component';
import { UsuariosCadastrarComponent }   from './sistema/usuarios/cadastrar/cadastrar.component';

const appRoutes: Routes = [
  {path: "", component: SiteComponent, pathMatch: 'full'},
  {path: "login", component: LoginComponent},
  {path: "usuarios-cadastrar", component: UsuariosCadastrarComponent, canActivate: [LoggedInGuard]},
  {path: "principal", component: PrincipalComponent, canActivate: [LoggedInGuard]},
  {path: "perfil", component: PerfilComponent, canActivate: [LoggedInGuard]},
  {path: "**", component: PrincipalComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
