import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponenteDecorativoHomeComponent } from "../../components/Componente_Decorativo_Home/Componente_Decorativo_Home.component";
import { CarruselComponent } from "../../components/Carrusel/Carrusel.component";

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ComponenteDecorativoHomeComponent, CarruselComponent],
  templateUrl: './Home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy{
  imagenes: string[] = [
      'image/Decorador/carrusel.jpg',
      'image/Decorador/carrusel1.jpg',
      'image/Decorador/carrusel2.jpg',
      'image/Decorador/carrusel3.jpg',
    ];
    imagenActual = 0;
    intervaloId: any;

    ngOnInit(): void {
      this.intervaloId = setInterval(() => {
        this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
      }, 6000);
    }

    ngOnDestroy(): void {
      if (this.intervaloId) {
        clearInterval(this.intervaloId);
      }
    }
}
