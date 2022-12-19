import { Component, Input, OnInit } from '@angular/core';
import { RegistradorService } from 'src/app/services/registrador.service';
import { ApiconsumerService } from 'src/app/services/apiconsumer.service';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.css']
})
export class PuntosComponent implements OnInit {

  constructor(private registrador:RegistradorService, private api:ApiconsumerService){}

  punto:{latitud:number, longitud:number} = {
    latitud: 11.2409295, 
    longitud: -74.2164088
  };

  puntos:number[][] = [];


  enviarPunto(){
    this.registrador.registro_punto.emit({
      data: this.punto
    });
  }
  borrarPuntos(){
    this.punto = {latitud:0, longitud: 0};
    this.registrador.borrar_puntos.emit({
      data: this.punto
    });
  }


  crearPoligono(){
    this.registrador.registro_poligono.emit({
      data: this.punto
    });
  }
  borrarPoligono(){
    this.registrador.borrar_poligono.emit({
      data: this.punto
    });
  }

  deshacerPunto(){
    this.registrador.deshacer_punto.emit({
      data: this.punto
    });
  }

  // CRUD para puntos ------------------
  guardarPunto(){
    this.api.createPunto(this.punto.latitud, this.punto.longitud).subscribe(console.log);
    this.registrador.recargar_puntos.emit({
      data: this.punto
    });
  }
  getPunto(){
    // this.api.getPunto()
  }
  getAllPuntos(){
    this.api.getAllPuntos().subscribe(console.log);
  }

  // CRUD para poligonos ----------------
  guardarPoligono(){

    this.api.createPoligono(this.puntos).subscribe(console.log);

    this.registrador.recargar_poligonos.emit({
      data: this.punto
    });
  }

  ngOnInit():void{
    this.registrador.mostrar_punto.subscribe(data =>{
      this.punto.latitud = data.data.latitud;
      this.punto.longitud = data.data.longitud;
    });
    this.registrador.recargar_puntos.subscribe( data => {
      console.log(data)
      this.getAllPuntos();
    });
    this.registrador.guardar_poligono.subscribe( puntos => {
      this.puntos = puntos;
      console.log(puntos)
    })


    this.getAllPuntos();
  }
}
