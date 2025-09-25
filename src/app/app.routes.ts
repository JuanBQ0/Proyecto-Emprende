import { Routes } from '@angular/router';
import { HomeComponent } from './proyectos/pages/Home/Home.component';
import { LoginComponent } from './proyectos/pages/Login/Login.component';
import { RegistroProyectoComponent } from './proyectos/pages/administrativo/registro-proyecto/registro-proyecto.component';
import { GestionProyectosComponent } from './proyectos/pages/administrativo/gestion-proyectos/gestion-proyectos.component';
import { ReporteProyectosComponent } from './proyectos/pages/administrativo/reporte-proyectos/reporte-proyectos.component';
import { EventosComponent } from './proyectos/pages/Eventos_Pages/Eventos/Eventos.component';
import { ContactoComponent } from './proyectos/pages/Eventos_Pages/Contacto/Contacto.component';
import { NosotrosComponent } from './proyectos/pages/Eventos_Pages/Nosotros/Nosotros.component';
import { NuevosProyectosComponent } from './proyectos/pages/administrativo/Nuevos_Proyectos/Nuevos_Proyectos.component';
import { NuevoEventoComponent } from './proyectos/pages/administrativo/Nuevo_Evento/Nuevo_Evento.component';
import { GaleriaProyectosComponent } from './proyectos/pages/Eventos_Pages/Galeria_Proyectos/Galeria_Proyectos.component';
import { HistortialEventosComponent } from './proyectos/pages/administrativo/Histortial_Eventos/Histortial_Eventos.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'admin',
    component: RegistroProyectoComponent,
  },
  {
    path: 'log',
    component: LoginComponent
  },
  {
    path: 'reporte',
    component: ReporteProyectosComponent
  },
  {
    path: 'gestion',
    component: GestionProyectosComponent
  },
  {
    path: 'eventos',
    component: EventosComponent
  },
  {
    path: 'contacto',
    component: ContactoComponent
  },
  {
    path: 'nosotros',
    component: NosotrosComponent
  },
  {
    path: 'nuevos_proyectos',
    component: NuevosProyectosComponent
  },
  {
    path: 'nuevo_evento',
    component: NuevoEventoComponent
  },
  {
    path: 'galeria',
    component: GaleriaProyectosComponent
  },
  {
    path: 'historial_eventos',
    component: HistortialEventosComponent
  },
  {
    path: '**',
    redirectTo: ''
  },


];
