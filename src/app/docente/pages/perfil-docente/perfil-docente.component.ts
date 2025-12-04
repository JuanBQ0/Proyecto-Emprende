import { Component, OnInit } from '@angular/core';
import { ProyectoRegistrado } from '../../../proyectos/interface/proyecto.interface';
import { ProyectoServices } from '../../../proyectos/services/proyectos.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavAdministrativoComponent } from "../../../proyectos/components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { NavbarDocenteComponent } from "../../components/navbar-docente/navbar-docente.component";

@Component({
  selector: 'app-perfil-docente',
  imports: [CommonModule, FormsModule, NavbarDocenteComponent],
  templateUrl: './perfil-docente.component.html',
  styleUrl: './perfil-docente.component.css'
})
export class PerfilDocenteComponent {
 docente = {
    nombre: 'Carlos',
    apellido: 'Pérez',
    cedula: '1098765432',
    correo: 'cperez@universidad.edu',
    telefono: '3104567890',
    activo: true,
    descripcion: 'Docente de la Unidad de Emprendimiento con más de 10 años de experiencia en mentoría de estudiantes y desarrollo de proyectos innovadores.',
    areasInteres: [
      'Innovación y emprendimiento',
      'Gestión de proyectos',
      'Tecnologías emergentes',
      'Educación y pedagogía aplicada'
    ],
    experiencia: [
      'Docente universitario en programas de emprendimiento',
      'Mentor de proyectos estudiantiles ganadores de concursos de innovación',
      'Consultor de startups universitarias',
      'Investigador en metodologías ágiles aplicadas a la educación'
    ],
    asignaturas: [
      'Taller de Innovación',
      'Planificación y Gestión de Proyectos',
      'Emprendimiento y Modelos de Negocio'
    ],
    linkedin: 'https://www.linkedin.com/in/carlosperez',
    researchgate: 'https://www.researchgate.net/profile/Carlos_Perez'
  };

  constructor() {}

  ngOnInit(): void {}
}


