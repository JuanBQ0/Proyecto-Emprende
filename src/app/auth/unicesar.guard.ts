import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UnicesarGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const email = localStorage.getItem('userEmail');

    if (email && email.endsWith('@unicesar.edu.co')) {
      return true; // ✅ Acceso permitido
    }

    // Acceso denegado, redirige a verificación
    this.router.navigate(['/verifica-correo']);
    return false;
  }

}
