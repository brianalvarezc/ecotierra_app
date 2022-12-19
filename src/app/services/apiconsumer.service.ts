import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs';


interface Punto {
  id: number,
  latitud: string,
  longitud: string,
  creado: string
}
interface Poligono {
  id: number,
  puntos: string,
  creado: string
}


@Injectable({
  providedIn: 'root'
})
export class ApiconsumerService {


  private urlAPI:string = "http://localhost:8000/api/"

  constructor(private http:HttpClient) { }

  // metodos para los puntos
  getAllPuntos():Observable<Punto[]> {
    return this.http.get<Punto[]>(this.urlAPI+"puntos/");
  }
  getPunto(id:number):Observable<Punto> {
    return this.http.get<Punto>(this.urlAPI+"puntos/"+id);
  }
  createPunto(latitud:number, longitud:number):Observable<null> {
    return this.http.post<null>(this.urlAPI+"puntos/?latitud="+latitud+"&longitud="+longitud, null );
  }
  updatePunto(id:number, latitud:string, longitud:string):Observable<null>{
    return this.http.put<null>(this.urlAPI+"puntos/"+id+"?latitud="+latitud+"&longitud="+longitud, null)
  }
  deletePunto(id:number):Observable<string>{
    return this.http.delete<string>(this.urlAPI+"puntos/"+id)
  }

  // metodos para los poligonos
  getAllPoligonos():Observable<Poligono[]> {
    return this.http.get<Poligono[]>(this.urlAPI+"poligonos/");
  }
  getPoligono(id:number):Observable<Poligono> {
    return this.http.get<Poligono>(this.urlAPI+"poligonos/"+id);
  }
  createPoligono(puntos:number[][]):Observable<null> {
    let params:string = "?puntos=";
    for (let i = 0; i < puntos.length; i++) {
      params += "latitud="+puntos[i][0]+"longitud="+puntos[i][1]+";";
    }
    console.log(puntos);
    return this.http.post<null>(this.urlAPI+"poligonos/", params );
  }
  updatePoligono(id:number, puntos:number[][]):Observable<null> {
    let params:string = "";
    puntos.forEach( latlng => {
      params += "latitud="+latlng[0]+"longitud="+latlng[1]+";";
    });
    return this.http.put<null>(this.urlAPI+"poligonos/?"+params, null);
  }
  deletePoligono(id:number):Observable<null>{
    return this.http.delete<null>(this.urlAPI+"poligonos/"+id)
  }
  
}
