import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EventosServicios {
//---------------------------------------------------------------------------------------------------------------------------------
  private readonly STORAGE_KEY = 'eventos';
  private readonly STORAGE_HISTORIAL_KEY = 'historial_eventos';

  private imagenesEventosSubject = new BehaviorSubject<string[]>([]);
  imagenesEventos$ = this.imagenesEventosSubject.asObservable();

  private historialImagenesSubject = new BehaviorSubject<string[]>([]);
  historialImagenes$ = this.historialImagenesSubject.asObservable();
//---------------------------------------------------------------------------------------------------------------------------------
  constructor() {
    // Cargar eventos
    const datos = localStorage.getItem(this.STORAGE_KEY);
    const imagenes = datos ? JSON.parse(datos) : [];
    this.imagenesEventosSubject.next(imagenes);

    // Cargar historial
    const historialDatos = localStorage.getItem(this.STORAGE_HISTORIAL_KEY);
    const historial = historialDatos ? JSON.parse(historialDatos) : [];
    this.historialImagenesSubject.next(historial);
  }
//---------------------------------------------------------------------------------------------------------------------------------

  obtenerImagenes(): string[] {
    const datos = localStorage.getItem(this.STORAGE_KEY);
    return datos ? JSON.parse(datos) : [];
  }
//---------------------------------------------------------------------------------------------------------------------------------
  obtenerHistorial(): string[] {
    const datos = localStorage.getItem(this.STORAGE_HISTORIAL_KEY);
    return datos ? JSON.parse(datos) : [];
  }
//---------------------------------------------------------------------------------------------------------------------------------
  private guardarEnLocalStorage(imagenes: string[]) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(imagenes));
    this.imagenesEventosSubject.next(imagenes);
  }
//---------------------------------------------------------------------------------------------------------------------------------
  private guardarHistorialEnLocalStorage(historial: string[]) {
    localStorage.setItem(this.STORAGE_HISTORIAL_KEY, JSON.stringify(historial));
    this.historialImagenesSubject.next(historial);
  }
//---------------------------------------------------------------------------------------------------------------------------------
  agregarImagen(file: File): Promise<void> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const nuevaImagen = reader.result as string;
        const actuales = this.imagenesEventosSubject.value;
        const actualizadas = [nuevaImagen, ...actuales];
        this.guardarEnLocalStorage(actualizadas);
        resolve();
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);

    });

  }
//---------------------------------------------------------------------------------------------------------------------------------
  moverAHistorial(url: string) {
    // Quitar de eventos
    const actuales = this.imagenesEventosSubject.value;
    const filtradas = actuales.filter(img => img !== url);
    this.guardarEnLocalStorage(filtradas);

    // Agregar al historial
    const historial = this.historialImagenesSubject.value;
    const actualizado = [url, ...historial];
    this.guardarHistorialEnLocalStorage(actualizado);
  }
  //---------------------------------------------------------------------------------------------------------------------------------
  eliminarDelHistorial(url: string) {
  const historial = this.historialImagenesSubject.value.filter(img => img !== url);
  this.guardarHistorialEnLocalStorage(historial);
}
//---------------------------------------------------------------------------------------------------------------------------------
}
