import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifica-correo',
  imports: [CommonModule, FormsModule],
  templateUrl: './verifica-correo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerificaCorreoComponent {

  email: string = '';
  error: string = '';

  constructor(private router: Router) {}

  verificarCorreo() {
    const correo = this.email.trim().toLowerCase();

    if (correo.endsWith('@unicesar.edu.co')) {
      localStorage.setItem('userEmail', correo); // ✅ Guárdalo para que el guard lo lea
      this.router.navigate(['/admin']);           // ✅ Redirige después
    } else {
      this.error = 'Debes usar un correo institucional de Unicesar.';
    }
  }
 }
