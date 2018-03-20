import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { Globals } from './globals';
import { LoggedInGuard } from './logged-in.guard';
import { UserService } from './sistema/services/usuarios/usuario.service';
import 'rxjs/add/operator/map';

import { CabecalhoModule } from './sistema/cabecalho/cabecalho.module';
import { MenuModule } from './sistema/menu/menu.module';

import { SiteComponent }   from './sistema/site/site.component';
import { LoginComponent } from './sistema/login/login.component';
import { UsuariosCadastrarComponent } from './sistema/usuarios/cadastrar/cadastrar.component';
import { PrincipalComponent }   from './sistema/principal/principal.component';
import { PerfilComponent }   from './sistema/perfil/perfil.component';

import { routing } from './app.routes';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MenuModule,
    CabecalhoModule,
    routing,
    FormsModule
  ],
  declarations: [
    AppComponent,
    SiteComponent,
    PrincipalComponent,
    LoginComponent,
    PerfilComponent,
    UsuariosCadastrarComponent
  ],
  providers: [
    Globals,
    LoggedInGuard,
    UserService
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}