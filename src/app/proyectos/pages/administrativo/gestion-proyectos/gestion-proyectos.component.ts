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
  imports: [NavAdministrativoComponent, DatePipe, CommonModule, FormsModule],
  templateUrl: './gestion-proyectos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GestionProyectosComponent implements OnInit {

  proyectos: ProyectoRegistrado[] = [];
  mostrarFiltros: any;
  proyectosFiltrados: ProyectoRegistrado[] = [];
  busquedaIdentificacion: string = '';
  busquedaActiva: boolean = false;

  constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
  this.proyectos = this.proyectoService.obtenerProyectosAprobados();
  this.proyectosFiltrados = [...this.proyectos];
}
  // BUSQUEDAS
  buscarPorIdentificacion() {
    const id = this.busquedaIdentificacion.trim();
    if (!id) return;

    this.busquedaActiva = true;

    const encontrados = this.proyectos.filter(p =>
      p.estudiantes.some(est => est.identificacion === id)
    );

    if (encontrados.length > 0) {
      this.proyectosFiltrados = encontrados;
      } else {
      this.proyectosFiltrados = [];
    }
  }

  limpiarBusqueda() {
    this.busquedaIdentificacion = '';
    this.busquedaActiva = false;
    this.proyectosFiltrados = [...this.proyectos];
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
