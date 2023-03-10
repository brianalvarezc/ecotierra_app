import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistradorService {
  @Output() registro_punto:EventEmitter<any> = new EventEmitter();
  @Output() registro_poligono:EventEmitter<any> = new EventEmitter();
  @Output() borrar_puntos:EventEmitter<any> = new EventEmitter();
  @Output() deshacer_punto:EventEmitter<any> = new EventEmitter();
  @Output() mostrar_punto:EventEmitter<any> = new EventEmitter();
  @Output() borrar_poligono:EventEmitter<any> = new EventEmitter();
  @Output() recargar_puntos:EventEmitter<any> = new EventEmitter();
  @Output() recargar_poligonos:EventEmitter<any> = new EventEmitter();
  @Output() guardar_poligono:EventEmitter<any> = new EventEmitter();
  
  constructor() { }
}
