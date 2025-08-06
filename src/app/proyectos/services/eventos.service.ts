import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EventosServicios {


  private readonly STORAGE_KEY = 'eventos';

  obtenerImagenes(): string[] {
    const datos = localStorage.getItem(this.STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
  }

  private imagenesEventosSubject = new BehaviorSubject<string[]>([]);
  imagenesEventos$ = this.imagenesEventosSubject.asObservable();

  constructor() {
    const datos = localStorage.getItem(this.STORAGE_KEY);
    const imagenes = datos ? JSON.parse(datos) : [];
    this.imagenesEventosSubject.next(imagenes);
  }

  private guardarEnLocalStorage(imagenes: string[]) {
  localStorage.setItem(this.STORAGE_KEY, JSON.stringify(imagenes));
  this.imagenesEventosSubject.next(imagenes); // 🔁 Esto notifica a los componentes
}

agregarImagen(file: File): Promise<void> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const nuevaImagen = reader.result as string;
      const actuales = this.imagenesEventosSubject.value;
      const actualizadas = [nuevaImagen, ...actuales];
      this.guardarEnLocalStorage(actualizadas); // 🔁 Esto llama a next()
      resolve();
    };
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
}

  eliminarImagen(url: string) {
    const actuales = this.imagenesEventosSubject.value;
    const filtradas = actuales.filter(img => img !== url);
    this.guardarEnLocalStorage(filtradas);
  }
}
