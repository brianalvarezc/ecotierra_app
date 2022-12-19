import { Component, OnInit } from '@angular/core';
import { ApiconsumerService } from 'src/app/services/apiconsumer.service';
import { RegistradorService } from 'src/app/services/registrador.service';

@Component({
  selector: 'app-listapoligonos',
  templateUrl: './listapoligonos.component.html',
  styleUrls: ['./listapoligonos.component.css']
})
export class ListapoligonosComponent implements OnInit {

  card:{id:number, puntos:string, creado:string} = {id:0, puntos:"string", creado:""};
  cards:{id:number, puntos:string, creado:string}[] = [];

  constructor(private api:ApiconsumerService, private registrador:RegistradorService){}

  ngOnInit(): void {
    this.getAllPoligonos();
    this.registrador.recargar_poligonos.subscribe( data => this.getAllPoligonos());
  }

  getAllPoligonos(){
    this.api.getAllPoligonos().subscribe( poligons => {
      Object.values(poligons).forEach( poligon => {
        this.card = poligon;
        this.cards.push(this.card);
      });
    });
  }
}
