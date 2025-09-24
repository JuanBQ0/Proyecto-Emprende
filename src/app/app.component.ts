import { Component, NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./proyectos/components/footer/footer.component";
import { NavbarSuperiroComponent } from "./proyectos/components/navbar-superiro/navbar-superiro.component";
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, FooterComponent, NavbarSuperiroComponent,
    CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Emprende';

  mostrarElementos = true;

  constructor(private router: Router) {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const rutasOcultas = ['/nuevos_proyectos','/log','/reporte', '/gestion', '/nuevo_evento','/historial_eventos'];
      this.mostrarElementos = !rutasOcultas.some(ruta => event.urlAfterRedirects.startsWith(ruta));
    }
  });
}



}
