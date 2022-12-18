import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LogosComponent } from './components/logos/logos.component';
import { SesionComponent } from './components/sesion/sesion.component';
import { IdiomaComponent } from './components/idioma/idioma.component';
import { PuntosComponent } from './components/puntos/puntos.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ListaComponent } from './components/lista/lista.component';
import { LeafmapComponent } from './components/leafmap/leafmap.component';

@NgModule({
  declarations: [
    AppComponent,
    LogosComponent,
    SesionComponent,
    IdiomaComponent,
    PuntosComponent,
    MapaComponent,
    ListaComponent,
    LeafmapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
