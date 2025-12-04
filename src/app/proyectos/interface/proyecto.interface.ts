import { Estudiante } from "./estudiante.interface";
//---------------------------------------------------------------------------------------------------------------------------------
export interface Proyecto {
  id: string;
  nombreProyecto: string;
  estudiantes: Estudiante[];
  logo: File | string | null;
  redesSociales?: string;
   // --- Seguimiento ---
  estado?: 'Pendiente' | 'Aprobado' | 'Rechazado';
  estadoSeguimiento?: 'Activo' | 'Inactivo' | 'Graduado';
  fechaInicio?: string | null;       // ISO string -> cuando inicia el seguimiento (por el admin/docente)
  fechaFinalizacion?: string | null; // ISO string -> cuando finaliza/gradúa
  docenteAsignadoId?: string | null; // id del docente que hace seguimiento
  observacionesSeguimiento?: string[]; // lista de observaciones (histórico)
}
//---------------------------------------------------------------------------------------------------------------------------------
export enum TipoParticipante {
  EstudianteEmprendedor = 'Estudiante emprendedor',
  EgresadoEmprendedor = 'Egresado emprendedor',
  MicroempresarioExterno = 'Microempresario externo',
  OpcionDeGrado = 'Opción de grado',
}
//---------------------------------------------------------------------------------------------------------------------------------

export interface ProyectoRegistrado extends Proyecto {
  fecha: Date;
  estudiante?: string; // para mostrar en tabla
  titulo?: string;     // alias de nombreProyecto
}
//---------------------------------------------------------------------------------------------------------------------------------


