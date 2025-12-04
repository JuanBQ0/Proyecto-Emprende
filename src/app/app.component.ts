import { Component, NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from "./proyectos/components/footer/footer.component";
import { NavbarSuperiroComponent } from "./proyectos/components/navbar-superiro/navbar-superiro.component";
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';


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
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        const rutasOcultas = [
          '/docente',
          '/admin' // 👈 se agrega el módulo docente completo
        ];

        // Oculta navbar/footer si alguna ruta oculta coincide o empieza con la actual
        this.mostrarElementos = !rutasOcultas.some(ruta =>
          event.urlAfterRedirects.startsWith(ruta)
        );
      });
  }
}
