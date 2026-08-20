import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
//obtiene los datos desde le navegador
  guardar<T>(clave: string, datos: T): void {
    localStorage.setItem(clave, JSON.stringify(datos));
  }

  obtener<T>(clave: string): T | null {

    const datos = localStorage.getItem(clave);

    if (!datos) {
      return null;
    }

    try {
      return JSON.parse(datos) as T;
    } catch {
      return null;
    }
  }

//eliminar de LS
  eliminar(clave: string): void {
    localStorage.removeItem(clave);
  }

//limpiar LS
  limpiar(): void {
    localStorage.clear();
  }

}