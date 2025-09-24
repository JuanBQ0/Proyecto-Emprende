import { Injectable } from '@angular/core';
import { Estudiante, Proyecto, ProyectoRegistrado, TipoParticipante } from '../interface/proyecto.interface';
import { CategoriaProyecto } from '../interface/categoria-proyecto.enum';
import { BehaviorSubject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class ProyectoServices {
//---------------------------------------------------------------------------------------------------------------------------------
private proyectosKey = 'proyectosAprobados';
private categoriaSeleccionada = new BehaviorSubject<CategoriaProyecto | null>(null);
categoriaSeleccionada$ = this.categoriaSeleccionada.asObservable();
categorias: CategoriaProyecto[] = Object.values(CategoriaProyecto);

//---------------------------------------------------------------------------------------------------------------------------------
  // Cambiar categoría seleccionada
  setCategoriaSeleccionada(categoria: CategoriaProyecto | null) {
    this.categoriaSeleccionada.next(categoria);
  }

  getCategoriaSeleccionada(): CategoriaProyecto | null {
    return this.categoriaSeleccionada.value;
  }

//---------------------------------------------------------------------------------------------------------------------------------
private proyecto: Proyecto = {
    id:'',
    nombreProyecto: '',
    categoria: CategoriaProyecto.Innovacion,
    redesSociales: '',
    logo: null,
    estudiantes: [
      { nombres: '', apellidos: '', identificacion: '', programa: '', tel: '', correo: '', EstudianteUPC: true , genero: null, tipoParticipante: TipoParticipante.EstudianteEmprendedor }]
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
    this.proyecto.estudiantes.push({ nombres: '', apellidos: '', identificacion: '', programa: '', tel: '', correo: '', EstudianteUPC: true, genero: null, tipoParticipante: TipoParticipante.EstudianteEmprendedor  });
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
  // Convertir logo File a base64 (si existe)
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

  // Eliminar de los proyectos pendientes
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
      id:'',
      nombreProyecto: '',
      categoria: CategoriaProyecto.Innovacion,
      redesSociales: '',
      logo: null,
      estudiantes: [
        { nombres: '', apellidos: '', identificacion: '', programa: '', tel: '', correo: '', EstudianteUPC: true, genero: null, tipoParticipante: TipoParticipante.EstudianteEmprendedor  }
      ]
    };
  }
//---------------------------------------------------------------------------------------------------------------------------------
}
