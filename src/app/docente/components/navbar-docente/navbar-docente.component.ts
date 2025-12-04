import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar-docente',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar-docente.component.html',
  styleUrl: './navbar-docente.component.css'
})
export class NavbarDocenteComponent {

isMenuOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    // Aquí puedes limpiar localStorage o cualquier sesión de docente
    localStorage.removeItem('usuarioDocente');
    this.router.navigate(['/log']); // redirige al login
  }

}
