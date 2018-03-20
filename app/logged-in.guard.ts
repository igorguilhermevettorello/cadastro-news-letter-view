import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot,  RouterStateSnapshot } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import { UserService } from './sistema/services/usuarios/usuario.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private user: UserService) {}

  //canActivate() {
  //  return this.user.isLoggedIn();
  //}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    let logado = this.user.isLoggedIn()
    if (!logado) {
      this.router.navigate(['/login']);
    }
    return logado;
  }
}