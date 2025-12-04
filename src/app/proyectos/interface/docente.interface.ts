export interface Docente {
  id: string;                    // ID único, por ejemplo uuid
  nombre: string;
  correo: string;
  identificacion: string;
  password: string;

  // Campos adicionales opcionales
  telefono?: string;
  activo?: boolean;              // por defecto true
  programasAsignados?: string[]; // nombres o IDs de programas académicos
  descripcion?: string;          // perfil del docente
  especialidad?: string;         // área de expertise
  fechaCreacion: Date;           // fecha de creación de la cuenta
}
