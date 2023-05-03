import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';  //(3-F) Importar: Se escribe su ubicacion sin extension
import { HeaderComponent } from './header/header.component';  //(3-H)Lo importamos con el nombre que se le dio de exportacion en su clase
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router'; //(1-Routing)Las rutas permiten, dividir la aplicacion en varias secciones o paginas.
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';//(3-Ho) Se importa

//(2-RRouting)En este arreglo se guardaran las rutas de cada componente, el arreglo es del tipo Routes 
const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'}, //Este creo que es para un path vacio. Para mapear por defecto a /clientes.
  {path: 'directivas', component: DirectivaComponent},  //Cada route posee el path y el componenete al cual es mapeado este path.
  {path: 'clientes', component: ClientesComponent},
  {path: 'home', component: HomeComponent} //(4-Ho)
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,  // (4-H) Se debe registrar en declarations. Y por ultimo, agregarlo al html con su id de selector que se le dio en su clase/
    FooterComponent,  // (3-F) Registrar
    DirectivaComponent,
    ClientesComponent,
    HomeComponent   //(4-Ho)Registrar
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes), //(3-R) Se registra el import del arreglo de rutas. 
  ],
  providers: [ClienteService],    //Asi es como se implementan los servicios en el app.module
  bootstrap: [AppComponent]
})
export class AppModule { }
