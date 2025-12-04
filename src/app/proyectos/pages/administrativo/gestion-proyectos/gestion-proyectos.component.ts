import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { ProyectoServices } from '../../../services/proyectos.services';
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { DrawGaleriaComponent } from "../../../components/Draw_Galeria/Draw_Galeria.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-gestion-proyectos',
  standalone: true,
  imports: [NavAdministrativoComponent, CommonModule, FormsModule],
  templateUrl: './gestion-proyectos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionProyectosComponent implements OnInit {

constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
  this.proyectos = this.proyectoService.obtenerProyectosAprobados();
  this.aplicarFiltros();
}

  proyectos: ProyectoRegistrado[] = [];
  mostrarFiltros: any;
  proyectosFiltrados: ProyectoRegistrado[] = [];
  busquedaIdentificacion: string = '';
  busquedaActiva: boolean = false;


// Filtros
filtroEstado: 'Todos' | 'Activo' | 'Inactivo' | 'Graduado' = 'Todos';
filtroTipo: 'Todos' | 'Externos' = 'Todos';

  // BUSQUEDAS
  aplicarFiltros() {

  let lista = [...this.proyectos];

  // 🔍 Búsqueda por cédula
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

  // ✅ Filtro por estado
  if (this.filtroEstado !== 'Todos') {
    lista = lista.filter(p =>
      p.estadoSeguimiento === this.filtroEstado
    );
  }

  // ✅ Filtro tipo externo
  if (this.filtroTipo === 'Externos') {
    lista = lista.filter(p =>
      p.estudiantes.some(e =>
        e.tipoParticipante === 'Microempresario externo'
      )
    );
  }

  this.proyectosFiltrados = lista;
}

buscarPorIdentificacion() {
  this.aplicarFiltros();
}

  limpiarBusqueda() {
  this.busquedaIdentificacion = '';
  this.filtroEstado = 'Todos';
  this.filtroTipo = 'Todos';
  this.busquedaActiva = false;
  this.aplicarFiltros();
}


  eliminarProyecto(id: string) {
    if (confirm('¿Seguro que deseas eliminar este proyecto?')) {
    this.proyectoService.eliminarProyecto(id);
    this.proyectos = this.proyectoService.obtenerProyectosAprobados();
    this.proyectosFiltrados = [...this.proyectos];
  }
}

  trackById(index: number, item: ProyectoRegistrado) {
    return item.id;
  }


}
