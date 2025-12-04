import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'nav-administrativo',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './nav-administrativo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavAdministrativoComponent {
  
constructor(private router: Router) {}
  isMenuOpen = false;
  logout() {
    // Aquí puedes limpiar localStorage o cualquier sesión de docente
    localStorage.removeItem('usuarioDocente');
    this.router.navigate(['/log']); // redirige al login
  }
}
