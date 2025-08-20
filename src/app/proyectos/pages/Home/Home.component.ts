import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ComponenteHomePageComponent } from "../../components/Componente_Home_Page/Componente_Home_Page.component";
import { LoginComponent } from "../Login/Login.component";


@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule],
  templateUrl: './Home.component.html',
  styleUrl: './Home.component.css',
})
export class HomeComponent implements OnInit {
imagenActual = 0;
imagenes: string[] = [
    'image/primero.jpg',
    'image/segundo.jpeg',
    'image/tercero.jpg',
    'image/cuarto.png',
    'image/arreglo/upecistas.jpg'
  ];


  ngOnInit(): void {
  setInterval(() => {
    this.imagenActual = (this.imagenActual + 1) % this.imagenes.length;
  }, 7000);
  }
}
