import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProyectoServices } from '../../services/proyectos.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramaAcademico } from '../../interface/programa-academico.enum';
import { ProyectoRegistrado } from '../../interface/proyecto.interface';

@Component({
  selector: 'app-draw-galeria',
  imports: [CommonModule, FormsModule],
  templateUrl: './Draw_Galeria.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DrawGaleriaComponent {
  programasAbiertos = false;
  selectedPrograma: ProgramaAcademico | null = null;

  // Lista de todos los proyectos (puedes traerlos de tu servicio)
  proyectos: ProyectoRegistrado[] = [];

  constructor(public proyectoService: ProyectoServices) {
    // Inicializar proyectos desde el servicio
    this.proyectos = this.proyectoService.obtenerProyectosRegistrados();
  }

  toggleProgramas() {
    this.programasAbiertos = !this.programasAbiertos;
  }

  seleccionarPrograma(programa: ProgramaAcademico) {
    // Alternar selección
    if (this.selectedPrograma === programa) {
      this.selectedPrograma = null;
    } else {
      this.selectedPrograma = programa;
    }

    // Avisar al servicio
    this.proyectoService.setProgramaSeleccionado(this.selectedPrograma);
  }

  // Proyectos filtrados según el programa seleccionado
  get proyectosFiltrados(): ProyectoRegistrado[] {
    if (!this.selectedPrograma) return this.proyectos;

    return this.proyectos.filter(proyecto =>
      proyecto.estudiantes.some(est => est.programaAcademico === this.selectedPrograma)
    );
  }

  // Función para eliminar proyecto
  eliminarProyecto(id: string) {
    this.proyectoService.eliminarProyecto(id);
    this.proyectos = this.proyectoService.obtenerProyectosRegistrados(); // actualizar lista
  }
  resetPrograma() {
  this.selectedPrograma = null;
  this.proyectoService.setProgramaSeleccionado(null);
}

}
