import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegistradorService {
  @Output() registro_punto:EventEmitter<any> = new EventEmitter();
  @Output() registro_poligono:EventEmitter<any> = new EventEmitter();
  constructor() { }
}
