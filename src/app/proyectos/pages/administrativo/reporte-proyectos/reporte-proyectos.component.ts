import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { Estudiante, ProyectoRegistrado, TipoParticipante } from '../../../interface/proyecto.interface';
import { CommonModule, KeyValuePipe } from '@angular/common';


@Component({
  selector: 'app-reporte-proyectos',
  standalone: true, 
  imports: [NavAdministrativoComponent, CommonModule, KeyValuePipe],
  templateUrl: './reporte-proyectos.component.html',
  styleUrls: ['./reporte-proyectos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteProyectosComponent implements OnInit {
  proyectos: ProyectoRegistrado[] = [];

  totalProyectos = 0;
  proyectosPorCategoria: { [key: string]: number } = {};
  participantesPorTipo: { [key in TipoParticipante]?: number } = {};
  totalUPCistas = 0;
  totalEgresados = 0; // 👈 inicialízala en 0 para evitar undefined

  ngOnInit(): void {
    const guardados = localStorage.getItem('proyectosAprobados');
    this.proyectos = guardados ? JSON.parse(guardados) : [];
    this.calcularEstadisticas();
  }

  calcularEstadisticas() {
    this.totalProyectos = this.proyectos.length;
    this.proyectosPorCategoria = {};
    this.participantesPorTipo = {};
    this.totalUPCistas = 0;
    this.totalEgresados = 0;

    for (const proyecto of this.proyectos) {
      // 📌 Categorías
      if (proyecto.categoria) {
        this.proyectosPorCategoria[proyecto.categoria] =
          (this.proyectosPorCategoria[proyecto.categoria] || 0) + 1;
      }

      // 📌 Participantes
      for (const est of proyecto.estudiantes as Estudiante[]) {
        if (est.EstudianteUPC) {
          this.totalUPCistas++;
        }

        if (est.tipoParticipante) {
          this.participantesPorTipo[est.tipoParticipante] =
            (this.participantesPorTipo[est.tipoParticipante] || 0) + 1;

          // contar egresados
          if (est.tipoParticipante === TipoParticipante.EgresadoEmprendedor) {
            this.totalEgresados++;
          }
        }
      }
    }
  }
}
