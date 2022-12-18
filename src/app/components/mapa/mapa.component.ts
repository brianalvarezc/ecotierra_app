import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  punto:{latitud:number, longitud:number} = {latitud: 1, longitud: 0};

  constructor(){}

  ngOnInit(){
    console.log(this.punto)
  }

  // se declaran todos los atributos que se van a compartir


}
