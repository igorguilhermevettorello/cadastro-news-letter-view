import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/usuarios/usuario.service';
import { Router } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'cabecalho',
  templateUrl: './cabecalho.component.html'
})

export class CabecalhoComponent {

  @Input() userName: string = null;
  @Input() userInfo: string = null;
  @Input() userImagem: string = 'img/avatar-user.png';
  @Input() userCreatedAt: string = null;
  @Input() userUpdatedAt: string = null;

  constructor(
    private router: Router,
    private userService: UserService) {

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

  logout(event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['./login']);
  }

  perfil(event) {
    event.preventDefault();
    this.router.navigate(['./perfil']);
  }

  user(event) {
    event.preventDefault();
    this.router.navigate(['./menus-listar/', 2]);
  }

  public setUserName(userName) {
    if (localStorage.getItem("userName") === null) localStorage.setItem("userName", userName);
    this.userName = userName;
  }

  public setUserImagem(userImagem) {
    if (localStorage.getItem("userImagem") === null) localStorage.setItem("userImagem", userImagem);
    this.userImagem = userImagem;
  }

  public setUserCreatedAt(userCreatedAt) {
    if (localStorage.getItem("userCreatedAt") === null) localStorage.setItem("userCreatedAt", userCreatedAt);
    this.userCreatedAt = `Criado em: ${userCreatedAt}`;
  }

  public setUserUpdatedAt(userUpdatedAt) {
    if (localStorage.getItem("userUpdatedAt") === null) localStorage.setItem("userUpdatedAt", userUpdatedAt);
    this.userUpdatedAt = `Alterado em: ${userUpdatedAt}`;
  }
}