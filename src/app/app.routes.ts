import { Routes } from '@angular/router';
import { HomeComponent } from './proyectos/pages/Home/Home.component';
import { LoginComponent } from './proyectos/pages/Login/Login.component';
import { RegistroProyectoComponent } from './proyectos/pages/Eventos_Pages/registro-proyecto/registro-proyecto.component';
import { GestionProyectosComponent } from './proyectos/pages/administrativo/gestion-proyectos/gestion-proyectos.component';
import { ReporteProyectosComponent } from './proyectos/pages/administrativo/reporte-proyectos/reporte-proyectos.component';
import { EventosComponent } from './proyectos/pages/Eventos_Pages/Eventos/Eventos.component';
import { ContactoComponent } from './proyectos/pages/Eventos_Pages/Contacto/Contacto.component';
import { NosotrosComponent } from './proyectos/pages/Eventos_Pages/Nosotros/Nosotros.component';
import { NuevosProyectosComponent } from './proyectos/pages/administrativo/Nuevos_Proyectos/Nuevos_Proyectos.component';
import { NuevoEventoComponent } from './proyectos/pages/administrativo/Nuevo_Evento/Nuevo_Evento.component';
import { GaleriaProyectosComponent } from './proyectos/pages/Eventos_Pages/Galeria_Proyectos/Galeria_Proyectos.component';
import { HistortialEventosComponent } from './proyectos/pages/administrativo/Histortial_Eventos/Histortial_Eventos.component';
import { GestionDocenteComponent } from './proyectos/pages/administrativo/gestion-docente/gestion-docente.component';
import { DocenteDashboardComponent } from './docente/pages/docente-dashboard/docente-dashboard.component';
import { SeguimientoProyectosComponent } from './docente/pages/seguimiento-proyectos/seguimiento-proyectos.component';
import { PerfilDocenteComponent } from './docente/pages/perfil-docente/perfil-docente.component';
import { InformeDocenteComponent } from './docente/pages/informe-docente/informe-docente.component';
import { SeguimientoComponent } from './proyectos/pages/administrativo/seguimiento/seguimiento.component';

export const routes: Routes = [
  // 🌍 RUTAS PÚBLICAS
  
  { path: '', component: HomeComponent },
  { path: 'log', component: LoginComponent },
  { path: 'nosotros', component: NosotrosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'eventos', component: EventosComponent },
  { path: 'galeria', component: GaleriaProyectosComponent },
  { path: 'registro', component: RegistroProyectoComponent },


  // 🧩 RUTAS DE ADMINISTRADOR
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'registro', pathMatch: 'full' },
      { path: 'reporte', component: ReporteProyectosComponent },
      { path: 'gestion', component: GestionProyectosComponent },
      { path: 'gestion_docentes', component: GestionDocenteComponent },
      { path: 'historial_eventos', component: HistortialEventosComponent },
      { path: 'nuevo_evento', component: NuevoEventoComponent },
      { path: 'nuevos_proyectos', component: NuevosProyectosComponent },
      { path: 'seguimiento', component: SeguimientoComponent },
    ]
  },
  // 🎓 RUTAS DE DOCENTE
  {
    path: 'docente',
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DocenteDashboardComponent },
      { path: 'seguimientos', component: SeguimientoProyectosComponent },
      { path: 'informe', component: InformeDocenteComponent },
      { path: 'perfil', component: PerfilDocenteComponent },

    ]
  },
  // 🧑‍🎓 RUTAS DE ESTUDIANTES / PROYECTOS

  { path: 'nuevo_evento', component: NuevoEventoComponent },

  // 🚨 RUTA POR DEFECTO
  { path: '**', redirectTo: '' }

];
