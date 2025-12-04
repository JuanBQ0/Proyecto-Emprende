import { CommonModule, formatCurrency } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectoServices } from '../../../services/proyectos.services';
import { DrawGaleriaComponent } from "../../../components/Draw_Galeria/Draw_Galeria.component";
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';
import { ProgramaAcademico } from '../../../interface/programa-academico.enum';

@Component({
  selector: 'app-galeria-proyectos',
  imports: [CommonModule, FormsModule, DrawGaleriaComponent],
  templateUrl: './Galeria_Proyectos.component.html',
  styleUrl: './Galeria_Proyectos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GaleriaProyectosComponent implements OnInit {

  proyectos: ProyectoRegistrado[] = [];
  proyectosFiltrados: ProyectoRegistrado[] = [];
  proyectoSeleccionado: ProyectoRegistrado | null = null;

  programas: ProgramaAcademico[] = [];
  selectedPrograma: ProgramaAcademico | null = null;

  constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
    // Cargar proyectos aprobados
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
    this.proyectosFiltrados = [...this.proyectos];

    // Cargar programas desde el servicio
    this.programas = this.proyectoService.programas;

    // Escuchar cambios de programa seleccionado
    this.proyectoService.programaSeleccionado$.subscribe(programa => {
      this.selectedPrograma = programa;

      if (programa) {
        // Filtrar proyectos que tengan al menos un estudiante con el programa seleccionado
        this.proyectosFiltrados = this.proyectos.filter(p =>
          p.estudiantes.some(est => est.programaAcademico === programa)
        );
      } else {
        this.proyectosFiltrados = [...this.proyectos];
      }
    });
  }

  seleccionarPrograma(programa: ProgramaAcademico) {
    this.proyectoService.setProgramaSeleccionado(programa);
  }

  abrirModal(proyecto: ProyectoRegistrado) {
    this.proyectoSeleccionado = proyecto;
  }

  cerrarModal() {
    this.proyectoSeleccionado = null;
  }

  trackById(index: number, item: ProyectoRegistrado) {
    return item.id;
  }
}
