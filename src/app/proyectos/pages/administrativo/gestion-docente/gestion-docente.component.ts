import { Component } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-gestion-docente',
  imports: [NavAdministrativoComponent, CommonModule, FormsModule],
  templateUrl: './gestion-docente.component.html',
  styleUrl: './gestion-docente.component.css'
})
export class GestionDocenteComponent {
docentes = JSON.parse(localStorage.getItem('docentes') || '[]');

  nuevoDocente = {
    nombre: '',
    correo: '',
    identificacion: '',
    password: ''
  };

  agregarDocente() {
    if (
      !this.nuevoDocente.nombre ||
      !this.nuevoDocente.correo ||
      !this.nuevoDocente.identificacion ||
      !this.nuevoDocente.password
    ) return;

    // Evitar duplicados por identificación
    const existe = this.docentes.some(
      (d: any) => d.identificacion === this.nuevoDocente.identificacion
    );
    if (existe) {
      alert('⚠️ Ya existe un docente con esa identificación.');
      return;
    }

    this.docentes.push({ ...this.nuevoDocente });
    localStorage.setItem('docentes', JSON.stringify(this.docentes));

    // Limpiar formulario
    this.nuevoDocente = { nombre: '', correo: '', identificacion: '', password: '' };
  }

  eliminarDocente(id: string) {
    this.docentes = this.docentes.filter((d: any) => d.identificacion !== id);
    localStorage.setItem('docentes', JSON.stringify(this.docentes));
  }
}
