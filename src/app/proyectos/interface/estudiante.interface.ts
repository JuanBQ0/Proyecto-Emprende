import { ProgramaAcademico } from "./programa-academico.enum";
import { TipoParticipante } from "./proyecto.interface";

export interface Estudiante {
  programaAcademico: ProgramaAcademico;
  nombres: string;
  apellidos: string;
  identificacion: string;
  tel: string;
  correo: string;
  EstudianteUPC: boolean;
  genero: string | null;
  tipoParticipante: TipoParticipante;
}
