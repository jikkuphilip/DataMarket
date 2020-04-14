import { Injectable, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private router: Router) {

  }
  canActivate(): boolean {
    if (localStorage.getItem('isLoggedIn')) return true
    else {
       this.router.navigate(['Login'])
       return false
    }

  }
  
}
