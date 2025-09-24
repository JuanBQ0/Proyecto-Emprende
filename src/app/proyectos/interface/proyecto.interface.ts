import { CategoriaProyecto } from "./categoria-proyecto.enum";

export interface Proyecto {
  id: string;
  nombreProyecto: string;
  categoria: CategoriaProyecto;
  estudiantes: Estudiante[];
  logo: File | string | null;
  redesSociales?: string;
}

export enum TipoParticipante {
  EstudianteEmprendedor = 'Estudiante emprendedor',
  EgresadoEmprendedor = 'Egresado emprendedor',
  MicroempresarioExterno = 'Microempresario externo',
  OpcionDeGrado = 'Opción de grado',
}

export interface Estudiante {
  programa: string;
  nombres: string;
  apellidos: string;
  identificacion: string;
  tel: string;
  correo: string;
  EstudianteUPC: boolean;
  genero: string | null;
  tipoParticipante: TipoParticipante;
}

export interface ProyectoRegistrado extends Proyecto {
  fecha: Date;
  estudiante?: string; // para mostrar en tabla
  titulo?: string;     // alias de nombreProyecto
}


