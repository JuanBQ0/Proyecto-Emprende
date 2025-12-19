import { CommonModule, formatCurrency } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProyectoServices } from '../../../services/proyectos.services';
import { DrawGaleriaComponent } from "../../../components/Draw_Galeria/Draw_Galeria.component";
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';
import { ProgramaAcademico } from '../../../interface/programa-academico.enum';
import { CarruselComponent } from "../../../components/Carrusel/Carrusel.component";

@Component({
  selector: 'app-galeria-proyectos',
  imports: [CommonModule, FormsModule, DrawGaleriaComponent, CarruselComponent],
  templateUrl: './Galeria_Proyectos.component.html',
  styleUrl: './Galeria_Proyectos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class GaleriaProyectosComponent implements OnInit, OnDestroy {

  proyectos: ProyectoRegistrado[] = [];
  proyectosFiltrados: ProyectoRegistrado[] = [];
  proyectoSeleccionado: ProyectoRegistrado | null = null;

  programas: ProgramaAcademico[] = [];
  selectedPrograma: ProgramaAcademico | null = null;
  imagenes: string[] = [
    'image/Decorador/carrusel.jpg',
    'image/Decorador/carrusel1.jpg',
    'image/Decorador/carrusel2.jpg',
    'image/Decorador/carrusel3.jpg',
  ];

  imagenActual = 0;
  intervaloId: any;

  constructor(private proyectoService: ProyectoServices) {}
  ngOnDestroy(): void {
  if (this.intervaloId) {
    clearInterval(this.intervaloId);
  }
}

  ngOnInit(): void {
      // -------- CARRUSEL AUTOMÁTICO --------
    this.intervaloId = setInterval(() => {
      this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
    }, 6000);

    // -------- LÓGICA DE PROYECTOS --------
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
    this.proyectosFiltrados = [...this.proyectos];
    this.programas = this.proyectoService.programas;
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
