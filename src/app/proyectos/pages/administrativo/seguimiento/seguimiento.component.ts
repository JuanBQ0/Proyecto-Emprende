import { Component, OnInit } from '@angular/core';
import { ProyectoRegistrado } from '../../../interface/proyecto.interface';
import { ProyectoServices } from '../../../services/proyectos.services';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavAdministrativoComponent } from "../../../components/componente administrativo/nav-administrativo/nav-administrativo.component";

@Component({
  selector: 'app-seguimiento',
  imports: [CommonModule, FormsModule, NavAdministrativoComponent],
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.css',
})
export class SeguimientoComponent implements OnInit {

  constructor(private proyectoService: ProyectoServices) {}
  proyectos: ProyectoRegistrado[] = [];
  proyectosFiltrados: ProyectoRegistrado[] = [];
  cedulaInvalida = false;
  busquedaCedula: string = '';
  filtroTipo: 'Todos' | 'Externos' = 'Todos';
  filtroEstado: 'Todos' | 'Activo' | 'Inactivo' | 'Graduado' = 'Todos';
  docenteInvalido: Record<string, boolean> = {};


  validarSoloNumeros(
  event: Event,
  destino: 'busqueda' | 'docente',
  proyecto?: ProyectoRegistrado
) {

  const input = event.target as HTMLInputElement;
  const valor = input.value;

  const tieneLetras = /[^0-9]/.test(valor);

  // Limpia todo lo que no sea número
  const limpio = valor.replace(/[^0-9]/g, '');

  input.value = limpio;

  // ✅ BUSCADOR
  if (destino === 'busqueda') {
    this.busquedaCedula = limpio;
    this.cedulaInvalida = tieneLetras;
  }

  // ✅ DOCENTE
  if (destino === 'docente' && proyecto) {
    proyecto.docenteAsignadoId = limpio;

    if (!this.docenteInvalido) {
      this.docenteInvalido = {};
    }

    this.docenteInvalido[proyecto.id] = tieneLetras;
  }
}


  // ✅ Maneja observaciones TEMPORALES por proyecto
  observacionesTemp: Record<string, string> = {};


  mensajeToast = '';
  mostrarToast = false;

  // Guardar snapshot del estado previo
  estadoPrevio = new Map<string, any>();

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos() {
  this.proyectos = this.proyectoService.obtenerProyectosAprobados();

  // Guardamos estado inicial
  this.estadoPrevio.clear();
  this.proyectos.forEach(p => {
    this.estadoPrevio.set(p.id, {
      docente: p.docenteAsignadoId,
      estado: p.estadoSeguimiento
    });
  });

  this.filtrar();
}

  filtrar() {

  if (this.cedulaInvalida) return; // 🚫 No buscar si es inválida

  let lista = [...this.proyectos];

  if (this.filtroEstado !== 'Todos') {
    lista = lista.filter(p => p.estadoSeguimiento === this.filtroEstado);
  }

  if (this.filtroTipo === 'Externos') {
    lista = lista.filter(p =>
      p.estudiantes.some(est =>
        est.tipoParticipante === 'Microempresario externo'
      )
    );
  }

  if (this.busquedaCedula.trim()) {
    lista = lista.filter(p =>
      p.estudiantes.some(e =>
        e.identificacion.includes(this.busquedaCedula))
    );
  }

  this.proyectosFiltrados = lista;
}


  asignarDocente(proyectoId: string) {

  const proyecto = this.proyectosFiltrados.find(p => p.id === proyectoId);
  if (!proyecto?.docenteAsignadoId) return;

  this.proyectoService.asignarDocente(proyectoId, proyecto.docenteAsignadoId);

  // ✅ refrescar pantalla
  this.cargarProyectos();
}


  cambiarEstado(
  proyectoId: string,
  estado: 'Activo' | 'Inactivo' | 'Graduado' | undefined
) {
  if (!estado) return;

  this.proyectoService.actualizarEstadoSeguimiento(proyectoId, estado);

  // ✅ refrescar pantalla
  this.cargarProyectos();
}


  // ✅ Observación usando el mapa temporal
  agregarObservacion(proyectoId: string) {

  const texto = this.observacionesTemp[proyectoId];

  if (!texto?.trim()) return;

  this.proyectoService.agregarObservacion(
    proyectoId,
    texto.trim()
  );

  // Limpia el input
  this.observacionesTemp[proyectoId] = '';

  // ✅ refrescar pantalla
  this.cargarProyectos();
}
eliminarObservacion(proyectoId: string, texto: string) {

  this.proyectoService.eliminarObservacion(proyectoId, texto);

  // ✅ refresca todo
  this.cargarProyectos();
}
actualizarProyecto(proyecto: ProyectoRegistrado) {

  const previo = this.estadoPrevio.get(proyecto.id);

  let cambios: string[] = [];

  // ✅ Cambió docente
  if (previo?.docente !== proyecto.docenteAsignadoId) {
    this.proyectoService.asignarDocente(
      proyecto.id,
      proyecto.docenteAsignadoId || ''
    );
    cambios.push('👨‍🏫 Docente asignado');
  }

  // ✅ Cambió estado
  if (previo?.estado !== proyecto.estadoSeguimiento && proyecto.estadoSeguimiento) {
    this.proyectoService.actualizarEstadoSeguimiento(
      proyecto.id,
      proyecto.estadoSeguimiento
    );
    cambios.push(`📌 Estado cambiado a "${proyecto.estadoSeguimiento}"`);
  }

  // ✅ Nueva observación
  const obs = this.observacionesTemp[proyecto.id];

  if (obs && obs.trim()) {
    this.proyectoService.agregarObservacion(proyecto.id, obs.trim());
    cambios.push('📝 Observación registrada');

    // Limpiar textarea
    this.observacionesTemp[proyecto.id] = '';
  }

  // ✅ Guardar nuevo snapshot
  this.estadoPrevio.set(proyecto.id, {
    docente: proyecto.docenteAsignadoId,
    estado: proyecto.estadoSeguimiento
  });

  // ✅ Mostrar mensaje
  if (cambios.length > 0) {
    this.mostrarMensaje(cambios.join(' | '));
  } else {
    this.mostrarMensaje('ℹ️ No se detectaron cambios');
  }

  // ✅ Recargar la vista
  this.cargarProyectos();
}
mostrarMensaje(mensaje: string) {
  this.mensajeToast = mensaje;
  this.mostrarToast = true;

  setTimeout(() => {
    this.mostrarToast = false;
  }, 3000);
}

eliminarProyecto(proyectoId: string) {

  const confirmar = confirm(
    '⚠️ ¿Estás seguro de eliminar este proyecto?\n\nEsta acción no se puede deshacer.'
  );

  if (!confirmar) return;

  this.proyectoService.eliminarProyecto(proyectoId);

  this.mostrarMensaje('🗑️ Proyecto eliminado');

  this.cargarProyectos();
}
}
