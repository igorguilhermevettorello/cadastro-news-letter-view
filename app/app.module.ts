import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy, CommonModule } from '@angular/common';

import { Globals } from './globals';
import { LoggedInGuard } from './logged-in.guard';
import { UserService } from './sistema/services/usuarios/usuario.service';
import 'rxjs/add/operator/map';

import { CabecalhoModule } from './sistema/cabecalho/cabecalho.module';
import { MenuModule } from './sistema/menu/menu.module';

import { SiteComponent }   from './sistema/site/site.component';
import { LoginComponent } from './sistema/login/login.component';
import { UsuariosCadastrarComponent } from './sistema/usuarios/cadastrar/cadastrar.component';
import { UsuariosListarComponent } from './sistema/usuarios/listar/listar.component';
import { PrincipalComponent }   from './sistema/principal/principal.component';
import { PerfilComponent }   from './sistema/perfil/perfil.component';
import { MenusListarComponent } from './sistema/menus/listar/listar.component';
import { MenusCadastrarComponent } from './sistema/menus/cadastrar/cadastrar.component';
import { PermissoesListarComponent } from './sistema/permissoes/listar/listar.component';
import { PermissoesCadastrarComponent } from './sistema/permissoes/cadastrar/cadastrar.component';
import { HabitacoesListarComponent } from './sistema/habitacoes/listar/listar.component';
import { HabitacoesCadastrarComponent } from './sistema/habitacoes/cadastrar/cadastrar.component';

import { WindowRef } from './WindowRef';

import { routing } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MenuModule,
    CabecalhoModule,
    routing,
    FormsModule,
    CommonModule
  ],
  declarations: [
    AppComponent,
    SiteComponent,
    PrincipalComponent,
    LoginComponent,
    PerfilComponent,
    MenusListarComponent,
    MenusCadastrarComponent,
    UsuariosListarComponent,
    UsuariosCadastrarComponent,
    PermissoesListarComponent,
    PermissoesCadastrarComponent,
    HabitacoesListarComponent,
    HabitacoesCadastrarComponent
  ],
  providers: [
    Globals,
    LoggedInGuard,
    UserService,
    WindowRef
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}