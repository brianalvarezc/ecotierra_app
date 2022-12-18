import { Component, Input, OnInit } from '@angular/core';
import { RegistradorService } from 'src/app/services/registrador.service';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.css']
})
export class PuntosComponent implements OnInit {

  constructor(private registrador:RegistradorService){}

  punto:{latitud:number, longitud:number} = {
    latitud: 11.2409295, 
    longitud: -74.2164088
  };

  enviarPunto(){
    this.registrador.registro_punto.emit({
      data: this.punto
    });
  }

  crearPoligono(){
    this.registrador.registro_poligono.emit({
      data: this.punto
    });
  }

  borrarPuntos(){
    this.punto = {latitud:0, longitud: 0};
    this.registrador.borrar_puntos.emit({
      data: this.punto
    });
  }

  deshacerPunto(){
    this.registrador.deshacer_punto.emit({
      data: this.punto
    });
  }

  ngOnInit():void{
    this.registrador.mostrar_punto.subscribe(data =>{
      this.punto.latitud = data.data.latitud;
      this.punto.longitud = data.data.longitud;
    });
  }
}
