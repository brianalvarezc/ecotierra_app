import { Component, OnInit } from '@angular/core';
import { ApiconsumerService } from 'src/app/services/apiconsumer.service';
import { RegistradorService } from 'src/app/services/registrador.service';

@Component({
  selector: 'app-listapuntos',
  templateUrl: './listapuntos.component.html',
  styleUrls: ['./listapuntos.component.css']
})
export class ListapuntosComponent implements OnInit {

  card:{id:number, latitud:string, longitud:string, creado:string} = {id:0, latitud:"string", longitud:"", creado:""};
  cards:{id:number, latitud:string, longitud:string, creado:string}[] = [];

  constructor(private api:ApiconsumerService, private registrador:RegistradorService){}

  ngOnInit(): void {
    this.getAllPuntos();
    this.registrador.recargar_puntos.subscribe( data => this.getAllPuntos());
  }

  getAllPuntos(){
    this.cards = [];
    this.api.getAllPuntos().subscribe( puntos => {
      Object.values(puntos).forEach( punto => {
        this.card = punto;
        this.cards.push(this.card);
      });
    });
  }

  editarPunto(id:number, latitud:string, longitud:string){
    this.api.updatePunto(id, latitud, longitud).subscribe( data => {
      console.log(data);
    });
  }

  eliminarPunto(id:number){
    this.api.deletePunto(id).subscribe( data => {
      console.log(data);
    });
    this.registrador.recargar_puntos.emit({
      data: id
    });
  }

}
