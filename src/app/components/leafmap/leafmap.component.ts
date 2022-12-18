import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leafmap',
  templateUrl: './leafmap.component.html',
  styleUrls: ['./leafmap.component.css']
})
export class LeafmapComponent implements OnInit, AfterViewInit {
  
  constructor() { }

  ngOnInit() {
  }

  // necesarios para inicializar el mapa
  div_mapa:HTMLElement = document.createElement('section');

  // atributos de la clase
  punto:{latitud:number, longitud:number} = {
    latitud: 11.2409295, 
    longitud: -74.2164088
  };
  zoom:number = 10;
  
  // definicion del mapa
  map:L.Map = new L.Map(this.div_mapa);
  // definicion del marcador
  marker:L.Marker = new L.Marker([this.punto.latitud, this.punto.longitud]);
  
  
  // funcion que inicia el mapa luego de renderizar la vista de app-leafmap
  ngAfterViewInit() {
    this.createDiv();
    let punto = this.punto;
    let zoom = this.zoom;

    // para evita el error de que ya está inicializado el container del map
    this.clearMap();
    // se inicializa el mapa
    this.map = new L.Map(this.div_mapa).setView(
      [punto.latitud, punto.longitud],
      zoom
    );

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    this.marker.addTo(this.map);
  }

  // metodos de la clase
  createDiv():void{
    let divmapa = document.getElementById("mapa");
    this.div_mapa.setAttribute("style", "height: 100%; width: 100%;");
    divmapa!.appendChild(this.div_mapa);
  }

  clearMap() {
    this.map.off();
    this.map.remove();
  }


}
