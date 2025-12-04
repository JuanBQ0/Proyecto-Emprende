import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { ProyectoRegistrado, TipoParticipante } from '../../../interface/proyecto.interface';
import { CommonModule, KeyValuePipe } from '@angular/common';
import { Estudiante } from '../../../interface/estudiante.interface';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reporte-proyectos',
  standalone: true,
  imports: [NavAdministrativoComponent, CommonModule, KeyValuePipe, FormsModule],
  templateUrl: './reporte-proyectos.component.html',
  styleUrls: ['./reporte-proyectos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReporteProyectosComponent implements OnInit {

  proyectos: ProyectoRegistrado[] = [];

  arroba = '@';

  // ───── PROYECTOS
  totalProyectos = 0;
  activos = 0;
  inactivos = 0;
  graduados = 0;
  sinEstado = 0;

  // ───── PROGRAMAS
  proyectosPorPrograma: { [key: string]: number } = {};

  // ───── PARTICIPANTES
  participantesPorTipo: { [key in TipoParticipante]?: number } = {};
  totalUPCistas = 0;
  totalEgresados = 0;
  totalExternos = 0;

  // ───── DOCENTES
  totalDocentes = 0;
  docentesPorPrograma: { [key: string]: number } = {};


  ngOnInit(): void {

    const guardados = localStorage.getItem('proyectosAprobados');

    this.proyectos = guardados ? JSON.parse(guardados) : [];

    this.calcularEstadisticas();
  }


  calcularEstadisticas() {

    // RESET
    this.totalProyectos = this.proyectos.length;
    this.activos = 0;
    this.inactivos = 0;
    this.graduados = 0;
    this.sinEstado = 0;

    this.totalUPCistas = 0;
    this.totalEgresados = 0;
    this.totalExternos = 0;
    this.proyectosPorPrograma = {};
    this.participantesPorTipo = {};
    this.docentesPorPrograma = {};

    const docentesUnicos = new Set<string>();


    for (const proyecto of this.proyectos) {

      // ───────────────────────────────
      // ESTADOS DE PROYECTOS
      // ───────────────────────────────
      switch (proyecto.estadoSeguimiento) {
        case 'Activo':
          this.activos++;
          break;
        case 'Inactivo':
          this.inactivos++;
          break;
        case 'Graduado':
          this.graduados++;
          break;
        default:
          this.sinEstado++;
          break;
      }


      // ───────────────────────────────
      // DOCENTES
      // ───────────────────────────────
      if (proyecto.docenteAsignadoId) {
        docentesUnicos.add(proyecto.docenteAsignadoId);

        const prog =
          proyecto.estudiantes?.[0]?.programaAcademico;

        if (prog) {
          this.docentesPorPrograma[prog] =
            (this.docentesPorPrograma[prog] || 0) + 1;
        }
      }

            // ───────────────────────────────
      // ESTUDIANTES
      // ───────────────────────────────
      for (const est of proyecto.estudiantes) {

        // Programa académico
        const prog = est.programaAcademico;

        if (prog) {
          this.proyectosPorPrograma[prog] =
            (this.proyectosPorPrograma[prog] || 0) + 1;
        }

        // Tipo de participante
        if (est.tipoParticipante) {

          this.participantesPorTipo[est.tipoParticipante] =
            (this.participantesPorTipo[est.tipoParticipante] || 0) + 1;

          if (est.tipoParticipante === TipoParticipante.EstudianteEmprendedor) {
            this.totalUPCistas++;
          }

          if (est.tipoParticipante === TipoParticipante.EgresadoEmprendedor) {
            this.totalEgresados++;
          }

          if (est.tipoParticipante === TipoParticipante.MicroempresarioExterno) {
            this.totalExternos++;
          }
        }

      }

    }

    this.totalDocentes = docentesUnicos.size;
  }
}
