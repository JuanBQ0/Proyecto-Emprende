import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { NavbarSuperiroComponent } from "../../../components/navbar-superiro/navbar-superiro.component";
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";
import { ProyectoServices } from '../../../services/proyectos.services';
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';


@Component({
  selector: 'app-nuevos-proyectos',
  imports: [CommonModule, NavAdministrativoComponent],
  templateUrl: './Nuevos_Proyectos.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NuevosProyectosComponent implements OnInit {

  proyectos = signal<ProyectoRegistrado[]>([]);

  constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
  const proyectos = this.proyectoService.obtenerProyectosRegistrados();
  console.log('Proyectos cargados:', proyectos); // 🔍 Verificar si llegan

  const conCampos = proyectos.map(p => ({
    ...p,
    titulo: p.nombreProyecto,
    estudiante: `${p.estudiantes[0]?.nombres ?? ''} ${p.estudiantes[0]?.apellidos ?? ''}`,
  }));

  console.log('Con campos adicionales:', conCampos); // 🔍 Asegurarte que están bien

  this.proyectos.set(conCampos);
  }

  //----------------------------------------------------------------------------------------------------
  proyectoSeleccionado: ProyectoRegistrado | null = null;

  verDetalles(proyecto: ProyectoRegistrado) {
  if (proyecto.logo instanceof File) {
    const reader = new FileReader();
    reader.onload = () => {
      // Clonamos el proyecto y reemplazamos el logo por el resultado base64
      this.proyectoSeleccionado = {
        ...proyecto,
        logo: reader.result as string
      };
    };
    reader.readAsDataURL(proyecto.logo);
  } else {
    // Ya es string o null
    this.proyectoSeleccionado = proyecto;
  }
}


  cerrarModal() {
    this.proyectoSeleccionado = null;
  }
  //----------------------------------------------------------------------------------------------------
  EliminarProyecto(id: string): void {
  // Obtener los proyectos actuales del signal
  const proyectosActuales = this.proyectos();

  // Filtrar el proyecto que NO tenga el id indicado
  const proyectosActualizados = proyectosActuales.filter(p => p.id !== id);

  // Actualizar el signal
  this.proyectos.set(proyectosActualizados);

  // Actualizar el localStorage a través del servicio
  localStorage.setItem('proyectosRegistrados', JSON.stringify(proyectosActualizados));
}

aprobar(proyecto: ProyectoRegistrado) {
  this.proyectoService.aprobarProyecto(proyecto);

  const nuevosProyectos = this.proyectos().filter(p => p.id !== proyecto.id);
  this.proyectos.set(nuevosProyectos); // Actualiza el valor del Signal
}
}
