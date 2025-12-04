import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { ProyectoServices } from '../../../services/proyectos.services';
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { DrawGaleriaComponent } from "../../../components/Draw_Galeria/Draw_Galeria.component";
import { FormsModule } from '@angular/forms';
import { ProgramaAcademico } from '../../../interface/programa-academico.enum';

@Component({
  selector: 'app-gestion-proyectos',
  standalone: true,
  imports: [NavAdministrativoComponent, CommonModule, FormsModule],
  templateUrl: './gestion-proyectos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionProyectosComponent implements OnInit {

  constructor(
    private proyectoService: ProyectoServices
  ) {}

  ngOnInit(): void {
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
    this.aplicarFiltros();
  }

  // ─────────────
  // MODAL EDICIÓN
  // ─────────────
  proyectoEnEdicion: ProyectoRegistrado | null = null;

  // ─────────────
  // DATOS
  // ─────────────
  proyectos: ProyectoRegistrado[] = [];
  proyectosFiltrados: ProyectoRegistrado[] = [];

  programas = Object.values(ProgramaAcademico);

  // ─────────────
  // BUSQUEDA
  // ─────────────
  busquedaIdentificacion: string = '';
  busquedaActiva: boolean = false;

  // ─────────────
  // FILTROS
  // ─────────────
  filtroEstado: 'Todos' | 'Activo' | 'Inactivo' | 'Graduado' = 'Todos';
  filtroTipo: 'Todos' | 'Externos' = 'Todos';

  // ─────────────
  // FILTROS + BÚSQUEDA
  // ─────────────
  aplicarFiltros() {

    let lista = [...this.proyectos];

    // 🔍 Buscar por identificación
    const id = this.busquedaIdentificacion.trim();

    if (id !== '') {
      lista = lista.filter(p =>
        p.estudiantes.some(e =>
          e.identificacion.includes(id)
        )
      );

      this.busquedaActiva = true;
    } else {
      this.busquedaActiva = false;
    }

    // ✅ Filtrar por estado
    if (this.filtroEstado !== 'Todos') {
      lista = lista.filter(p =>
        p.estadoSeguimiento === this.filtroEstado
      );
    }

    // ✅ Filtrar externos
    if (this.filtroTipo === 'Externos') {
      lista = lista.filter(p =>
        p.estudiantes.some(e =>
          e.tipoParticipante === 'Microempresario externo'
        )
      );
    }

    this.proyectosFiltrados = lista;
  }

  // ─────────────
  // MODAL
  // ─────────────
  abrirEdicion(proyecto: ProyectoRegistrado) {
    this.proyectoEnEdicion = JSON.parse(JSON.stringify(proyecto));
  }

  guardarCambios() {

    if (!this.proyectoEnEdicion) return;

    this.proyectoService.actualizarProyecto(this.proyectoEnEdicion);

    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
    this.aplicarFiltros();

    this.proyectoEnEdicion = null;
  }

  cancelarEdicion() {
    this.proyectoEnEdicion = null;
  }

  // ─────────────
  // ELIMINAR
  // ─────────────
  eliminarProyecto(id: string) {

    if (!confirm('¿Seguro que deseas eliminar este proyecto?')) return;

    this.proyectoService.eliminarProyecto(id);
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
    this.aplicarFiltros();
  }

  // ─────────────
  // LIMPIAR FILTROS
  // ─────────────
  limpiarBusqueda() {

    this.busquedaIdentificacion = '';
    this.filtroEstado = 'Todos';
    this.filtroTipo = 'Todos';
    this.busquedaActiva = false;

    this.aplicarFiltros();
  }
  editarProyecto(proyecto: ProyectoRegistrado) {
  this.proyectoEnEdicion = JSON.parse(JSON.stringify(proyecto));
}

}
