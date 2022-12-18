import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leafmap',
  templateUrl: './leafmap.component.html',
  styleUrls: ['./leafmap.component.css']
})
export class LeafmapComponent implements OnInit, AfterViewInit {

  div_mapa:HTMLElement = document.createElement('section');

  createDiv():void{
    let divmapa = document.getElementById("mapa");
    this.div_mapa.setAttribute("style", "height: 100%; width: 100%;");
    divmapa!.appendChild(this.div_mapa);
  }

  map:L.Map = new L.Map(this.div_mapa);
  
  ngAfterViewInit() {
    this.createDiv();
    let initialState = {
      lng: -70,
      lat: 11,
      zoom: 4
    };

    // para evita el error de que ya está inicializado el container del map
    this.map.off();
    this.map.remove();

    // se inicializa el mapa
    this.map = new L.Map(this.div_mapa).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
    console.log("funcion")
  }

  constructor() { }

  ngOnInit() {
  }

}
