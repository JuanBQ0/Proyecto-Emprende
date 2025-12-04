import { Injectable } from '@angular/core';
import {Proyecto, ProyectoRegistrado, TipoParticipante } from '../interface/proyecto.interface';
import { ProgramaAcademico } from '../interface/programa-academico.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProyectoServices {
//---------------------------------------------------------------------------------------------------------------------------------
  private proyectosKey = 'proyectosAprobados';
  private programaSeleccionado = new BehaviorSubject<ProgramaAcademico | null>(null);
  programaSeleccionado$ = this.programaSeleccionado.asObservable();
  programas: ProgramaAcademico[] = Object.values(ProgramaAcademico);

//---------------------------------------------------------------------------------------------------------------------------------
  // Cambiar programa seleccionado
  setProgramaSeleccionado(programa: ProgramaAcademico | null) {
    this.programaSeleccionado.next(programa);
  }

  getProgramaSeleccionado(): ProgramaAcademico | null {
    return this.programaSeleccionado.value;
  }

//---------------------------------------------------------------------------------------------------------------------------------
  private proyecto: Proyecto = {
    id: '',
    nombreProyecto: '',
    redesSociales: '',
    logo: null,
    estudiantes: [
      {
        nombres: '',
        apellidos: '',
        identificacion: '',
        programaAcademico: ProgramaAcademico.Microempresarioexterno,
        tel: '',
        correo: '',
        EstudianteUPC: true,
        genero: null,
        tipoParticipante: TipoParticipante.EstudianteEmprendedor
      }
    ]
  };
//---------------------------------------------------------------------------------------------------------------------------------
  getProyecto(): Proyecto {
    return this.proyecto;
  }

//---------------------------------------------------------------------------------------------------------------------------------
  setLogo(file: File): void {
    this.proyecto.logo = file;
    console.log('Logo cargado desde el servicio:', this.proyecto.logo);
  }
//---------------------------------------------------------------------------------------------------------------------------------
  agregarEstudiante(): void {
    this.proyecto.estudiantes.push({
      nombres: '',
      apellidos: '',
      identificacion: '',
      programaAcademico: ProgramaAcademico.Microempresarioexterno,
      tel: '',
      correo: '',
      EstudianteUPC: true,
      genero: null,
      tipoParticipante: TipoParticipante.EstudianteEmprendedor
    });
  }
//---------------------------------------------------------------------------------------------------------------------------------
  eliminarEstudiante(index: number): void {
    this.proyecto.estudiantes.splice(index, 1);
  }
//---------------------------------------------------------------------------------------------------------------------------------
  registrarProyecto(): string {
    console.log('Proyecto registrado desde el servicio:', this.proyecto);
    const mensaje = `El proyecto "${this.proyecto.nombreProyecto}" fue registrado exitosamente.`;
    this.resetFormulario();
    return mensaje;
  }
//---------------------------------------------------------------------------------------------------------------------------------
  eliminarProyecto(id: string) {
    let proyectos = this.obtenerProyectosAprobados();
    proyectos = proyectos.filter(p => p.id !== id);
    localStorage.setItem('proyectosAprobados', JSON.stringify(proyectos));
  }
//---------------------------------------------------------------------------------------------------------------------------------
  private fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }
//---------------------------------------------------------------------------------------------------------------------------------
  async registrarProyectoConEstado(): Promise<void> {
    let logoBase64: string | null = null;
    if (this.proyecto.logo instanceof File) {
      logoBase64 = await this.fileToBase64(this.proyecto.logo);
    } else if (typeof this.proyecto.logo === 'string') {
      logoBase64 = this.proyecto.logo;
    }

    const nuevoProyecto: ProyectoRegistrado = {
      ...this.proyecto,
      id: Date.now().toString(),
      fecha: new Date(),
      logo: logoBase64,
    };

    const proyectosGuardados = this.obtenerProyectosRegistrados();
    proyectosGuardados.push(nuevoProyecto);
    this.actualizarProyectosRegistrados(proyectosGuardados);

    console.log('Guardado en localStorage:', nuevoProyecto);
    this.resetFormulario();
  }
//---------------------------------------------------------------------------------------------------------------------------------
  aprobarProyecto(proyecto: ProyectoRegistrado): void {
    const aprobados = this.obtenerProyectosAprobados();
    aprobados.push(proyecto);
    localStorage.setItem('proyectosAprobados', JSON.stringify(aprobados));

    const pendientes = this.obtenerProyectosRegistrados().filter(p => p.id !== proyecto.id);
    this.actualizarProyectosRegistrados(pendientes);

    console.log('Proyecto aprobado y movido a proyectosAprobados:', proyecto);
  }
//---------------------------------------------------------------------------------------------------------------------------------
  obtenerProyectosAprobados(): ProyectoRegistrado[] {
    const data = localStorage.getItem('proyectosAprobados');
    return data ? JSON.parse(data) : [];
  }
//---------------------------------------------------------------------------------------------------------------------------------
  obtenerProyectosRegistrados(): ProyectoRegistrado[] {
    const data = localStorage.getItem('proyectosRegistrados');
    return data ? JSON.parse(data) : [];
  }
//---------------------------------------------------------------------------------------------------------------------------------
  actualizarProyectosRegistrados(proyectos: ProyectoRegistrado[]) {
    localStorage.setItem('proyectosRegistrados', JSON.stringify(proyectos));
  }
//---------------------------------------------------------------------------------------------------------------------------------
  resetFormulario(): void {
    this.proyecto = {
      id: '',
      nombreProyecto: '',
      redesSociales: '',
      logo: null,
      estudiantes: [
        {
          nombres: '',
          apellidos: '',
          identificacion: '',
          programaAcademico: ProgramaAcademico.Microempresarioexterno,
          tel: '',
          correo: '',
          EstudianteUPC: true,
          genero: null,
          tipoParticipante: TipoParticipante.EstudianteEmprendedor
        }
      ]
    };
  }

//---------------------------------------------------------------------------------------------------------------------------------
// 🚀 SEGUIMIENTO DE PROYECTOS
//---------------------------------------------------------------------------------------------------------------------------------

/**
 * Asigna un docente a un proyecto y cambia su estado a "Activo".
 */
asignarDocente(proyectoId: string, docenteId: string): void {
  const proyectos = this.obtenerProyectosAprobados();
  const proyecto = proyectos.find(p => p.id === proyectoId);

  if (proyecto) {
    proyecto.docenteAsignadoId = docenteId;
    proyecto.estadoSeguimiento = 'Activo';
    proyecto.fechaInicio = new Date().toISOString();
    this.actualizarProyectosAprobados(proyectos);
    console.log(`✅ Docente asignado al proyecto ${proyecto.nombreProyecto}`);
  }
}

/**
 * Agrega una observación al seguimiento del proyecto.
 */
agregarObservacion(proyectoId: string, observacion: string): void {
  const proyectos = this.obtenerProyectosAprobados();
  const proyecto = proyectos.find(p => p.id === proyectoId);

  if (proyecto) {
    if (!proyecto.observacionesSeguimiento) {
      proyecto.observacionesSeguimiento = [];
    }
    proyecto.observacionesSeguimiento.push(observacion);
    this.actualizarProyectosAprobados(proyectos);
    console.log(`🗒️ Nueva observación agregada al proyecto ${proyecto.nombreProyecto}`);
  }
}

/**
 * Cambia el estado de seguimiento (Activo, Inactivo o Graduado).
 */
actualizarEstadoSeguimiento(proyectoId: string, nuevoEstado: 'Activo' | 'Inactivo' | 'Graduado'): void {
  const proyectos = this.obtenerProyectosAprobados();
  const proyecto = proyectos.find(p => p.id === proyectoId);

  if (proyecto) {
    proyecto.estadoSeguimiento = nuevoEstado;

    // Si se gradúa, marcamos fecha de finalización
    if (nuevoEstado === 'Graduado') {
      proyecto.fechaFinalizacion = new Date().toISOString();
    }

    this.actualizarProyectosAprobados(proyectos);
    console.log(`🔄 Estado de seguimiento actualizado: ${nuevoEstado}`);
  }
}

/**
 * Guarda nuevamente la lista de proyectos aprobados.
 */
private actualizarProyectosAprobados(proyectos: ProyectoRegistrado[]): void {
  localStorage.setItem(this.proyectosKey, JSON.stringify(proyectos));
}

/**
 * Obtiene un proyecto aprobado por su ID.
 */
obtenerProyectoPorId(id: string): ProyectoRegistrado | undefined {
  const proyectos = this.obtenerProyectosAprobados();
  return proyectos.find(p => p.id === id);
}
eliminarObservacion(proyectoId: string, texto: string) {

  const proyectos = this.obtenerProyectosAprobados();

  const proyecto = proyectos.find(p => p.id === proyectoId);
  if (!proyecto || !proyecto.observacionesSeguimiento) return;

  proyecto.observacionesSeguimiento =
    proyecto.observacionesSeguimiento.filter(
      obs => obs !== texto
    );

  localStorage.setItem(
    'proyectosAprobados',
    JSON.stringify(proyectos)
  );
}

}
