import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { RegistradorService } from 'src/app/services/registrador.service';

@Component({
  selector: 'app-leafmap',
  templateUrl: './leafmap.component.html',
  styleUrls: ['./leafmap.component.css']
})
export class LeafmapComponent implements OnInit, AfterViewInit {

  constructor(private registrador:RegistradorService) { }

  ngOnInit():void {
    // crear un marcador desde el comonente puntos
    this.registrador.registro_punto.subscribe( data => {
      this.punto.latitud = data.data.latitud;
      this.punto.longitud = data.data.longitud;
      this.ponerMarcador();
    });

    this.registrador.registro_poligono.subscribe( data => {
      this.punto.latitud = data.data.latitud;
      this.punto.longitud = data.data.longitud;
      this.crearPoligono();
    });
    
    // restablecer mapa desde componente puntos
    this.registrador.borrar_puntos.subscribe( data => this.iniciarMapa());

    // this.registrador.deshacer_punto.subscribe( data => this.deshacerPunto());

    // borra el último poligono hecho
  }

  // necesarios para inicializar el mapa
  div_mapa:HTMLElement = document.createElement('section');

  // atributos de la clase
  punto_inicial:{latitud:number, longitud:number} = {
    latitud: 11.2409295, 
    longitud: -74.2164088
  };
  zoom_inicial:number = 10;

  punto:{latitud:number, longitud:number} = {
    latitud: 11.2409295, 
    longitud: -74.2164088
  };
  zoom:number = 10;
  
  // definicion del mapa
  map:L.Map = new L.Map(this.div_mapa);
  // guardar los marcadores para dibujar el poligono
  markers:L.Marker[] = [];
  // guardar los poligonos para borrarlos o no
  polygons:L.Polygon[] = [];
  

  // funcion que inicia el mapa luego de renderizar la vista de app-leafmap
  ngAfterViewInit() {
    this.iniciarMapa();
    // new L.Marker([this.punto.latitud, this.punto.longitud]).addTo(this.map);
  }

  iniciarMapa(){
    this.createDiv();
    let punto = this.punto_inicial;
    let zoom = this.zoom_inicial;

    // para evita el error de que ya está inicializado el container del map
    this.clearMap();
    // se inicializa el mapa
    this.map = new L.Map(this.div_mapa).setView(
      [punto.latitud, punto.longitud],
      zoom
    );

    this.map.on("click", (event) => this.clickMap(event));

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);
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

  ponerMarcador(){
    let marker = new L.Marker([this.punto.latitud, this.punto.longitud], {draggable: true});
    this.removePolygons();
    marker.on("dragend", evento => this.marker_dragged(evento, marker));
    this.markers.push(marker);
    marker.addTo(this.map);
    this.map.setView([this.punto.latitud, this.punto.longitud], this.zoom)
  }

  clickMap(event:L.LeafletMouseEvent){
    this.punto.latitud = event.latlng.lat;
    this.punto.longitud = event.latlng.lng;
    this.ponerMarcador();
    this.mostrarPunto(); 
  }

  crearPoligono(){
    let polygon = L.polygon(this.markers.map(marker => marker.getLatLng()), { color: "red"})
    polygon.addTo(this.map)
    this.polygons.push(polygon);
    // se limpia los marcadores para poder dibujar nuevos poligonos luego de crear uno
    // this.markers = [];
  }

  deshacerPunto(){
    // this.map.removeLayer(this.markers.pop());
  }

  mostrarPunto(){
    this.registrador.mostrar_punto.emit({
      data: this.punto
    });
  }

  marker_dragged(event:L.LeafletEvent, marker:L.Marker){
    this.markers[this.markers.indexOf( marker )].setLatLng(event.target._latlng);
    this.removePolygons();
    this.crearPoligono();
  }

  removePolygons(){
    this.polygons.forEach( polygon => polygon.remove());
  }

}
