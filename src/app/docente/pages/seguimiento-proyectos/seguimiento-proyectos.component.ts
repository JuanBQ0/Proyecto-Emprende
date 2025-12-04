import { Component, OnInit } from '@angular/core';
import { ProyectoRegistrado, TipoParticipante } from '../../../proyectos/interface/proyecto.interface';
import { ProyectoServices } from '../../../proyectos/services/proyectos.services';
import { RouterLink } from '@angular/router';
import { NavbarDocenteComponent } from "../../components/navbar-docente/navbar-docente.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramaAcademico } from '../../../proyectos/interface/programa-academico.enum';

@Component({
  selector: 'app-seguimiento-proyectos',
  imports: [NavbarDocenteComponent, CommonModule, FormsModule],
  templateUrl: './seguimiento-proyectos.component.html',
  styleUrl: './seguimiento-proyectos.component.css'
})
export class SeguimientoProyectosComponent implements OnInit {
  docenteId = '1098765432'; // 🔴 luego se puede tomar desde login
  proyectos: ProyectoRegistrado[] = [];

  // Mapa temp para escribir observaciones
  observacionesTemp: Record<string, string> = {};

  // Toast
  mensajeToast = '';
  mostrarToast = false;

  constructor(private proyectoService: ProyectoServices) {}

  ngOnInit(): void {
    this.cargarProyectos();
  }

  cargarProyectos() {
    // Simulación: si no hay proyectos en el servicio, agregamos uno de prueba
    const proyectosServicio = this.proyectoService.obtenerProyectosAprobados().filter(
      (p) => p.docenteAsignadoId === this.docenteId
    );

    if (proyectosServicio.length === 0) {
      this.proyectos = [
        {
          id: 'p1',
          nombreProyecto: 'Sistema de Gestión Académica',
          fecha: new Date(),
          estadoSeguimiento: 'Activo',
          docenteAsignadoId: this.docenteId,
          logo: null,
          estudiantes: [
            {
              identificacion: '10001',
              nombres: 'Juan',
              apellidos: 'Pérez',
              genero: 'Masculino',
              programaAcademico: ProgramaAcademico.Microempresarioexterno,
              correo: 'juan.perez@email.com',
              tel: '3001234567',
              EstudianteUPC: true,
              tipoParticipante: TipoParticipante.EstudianteEmprendedor,
            },
            {
              identificacion: '10002',
              nombres: 'María',
              apellidos: 'Gómez',
              genero: 'Femenino',
              programaAcademico: ProgramaAcademico.Microempresarioexterno,
              correo: 'maria.gomez@email.com',
              tel: '3007654321',
              EstudianteUPC: true,
              tipoParticipante: TipoParticipante.EgresadoEmprendedor,
            }
          ],
          observacionesSeguimiento: ['Reunión inicial realizada', 'Pendiente entrega informe parcial']
        }
      ];
    } else {
      this.proyectos = proyectosServicio;
    }
  }

  actualizarEstado(
    proyectoId: string,
    estado: 'Activo' | 'Inactivo' | 'Graduado'
  ) {
    this.proyectoService.actualizarEstadoSeguimiento(proyectoId, estado);
    this.mostrarMensaje(`📌 Estado cambiado a "${estado}"`);
    this.cargarProyectos();
  }

  agregarObservacion(proyectoId: string) {
    const obs = this.observacionesTemp[proyectoId];
    if (!obs?.trim()) return;

    this.proyectoService.agregarObservacion(proyectoId, obs.trim());
    this.observacionesTemp[proyectoId] = '';
    this.mostrarMensaje('📝 Observación guardada');
    this.cargarProyectos();
  }

  mostrarMensaje(mensaje: string) {
    this.mensajeToast = mensaje;
    this.mostrarToast = true;

    setTimeout(() => {
      this.mostrarToast = false;
    }, 3000);
  }
}
