import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-puntos',
  templateUrl: './puntos.component.html',
  styleUrls: ['./puntos.component.css']
})
export class PuntosComponent implements OnInit {
  @Input() punto:{latitud:number, longitud:number} = {
    latitud: 11.2409295, 
    longitud: -74.2164088
  };

  enviarPunto(){
    console.log(this.punto)
  }

  ngOnInit(){
    console.log(this.punto);
  }
}
