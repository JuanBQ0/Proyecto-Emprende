export interface Proyecto {
  id: string;
  nombreProyecto: string;
  categoria: string;
  estudiantes: Estudiante[];
  logo: File | string | null;
  redesSociales?: string;
}

export interface Estudiante {
  programa: string;
  nombres: string;
  apellidos: string;
  identificacion: string;
  tel: string;
  correo: string;
}

export interface ProyectoRegistrado extends Proyecto {
  fecha: Date;
  estudiante?: string; // para mostrar en tabla
  titulo?: string;     // alias de nombreProyecto
}

