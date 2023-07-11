import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';  //(3-F) Importar: Se escribe su ubicacion sin extension
import { HeaderComponent } from './header/header.component';  //(3-H)Lo importamos con el nombre que se le dio de exportacion en su clase
import { DirectivaComponent } from './directiva/directiva.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteService } from './clientes/cliente.service';
import { RouterModule, Routes } from '@angular/router'; //(1-Routing)Las rutas permiten, dividir la aplicacion en varias secciones o paginas.
import {HttpClientModule} from '@angular/common/http';  //(1-ConnBackGET)Componete de Angular que permite conectarse con el servidor remoto, a travez de peticiones HTTP(Get,Post,Put,Delete)
import { HomeComponent } from './home/home.component';//(3-Hom) Se importa.
import { FormComponent } from './clientes/form.component';
import {FormsModule} from '@angular/forms'; //Se importa para trabaja con formularios
import {registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';  //Para ajustar la fecha a español

registerLocaleData(localeES, 'es')
//(2-RRouting)En este arreglo se guardaran las rutas de cada componente, el arreglo es del tipo Routes 
const routes: Routes = [
  //No a todos los componentes hace falta crearle un path. Algunos como el footer y el header siempre estaran y no se utilizaran como una pagina como si se hace con los que registran aca:
  
  {path: '', redirectTo: '/clientes', pathMatch: 'full'}, //Este creo que es para un path vacio. Para mapear por defecto a /clientes.
  {path: 'directivas', component: DirectivaComponent},  //Cada route posee el path y el componenete al cual es mapeado este path.
  {path: 'clientes', component: ClientesComponent},
  {path: 'home', component: HomeComponent},   //(5-Hom) Se crea u path para el componente
  {path: 'clientes/form', component: FormComponent},  //Enlace al formulario
  {path: 'clientes/form/:id', component: FormComponent}
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,  // (4-H) Se debe registrar en declarations. Y por ultimo, agregarlo al html con su id de selector que se le dio en su clase/
    FooterComponent,  // (4-F) Registrar
    DirectivaComponent, 
    ClientesComponent,
    HomeComponent,    //(4-Hom)Registrar
    FormComponent   
  ],
  imports: [    //Se sospecha que en este arreglo se registran modulos que se utilizan en diferentes clases.
    BrowserModule,
    HttpClientModule, //(2-ConnBackGET)Se registra para poder ser usado por la clase service.
    RouterModule.forRoot(routes), //(3-R) Se registra el import del arreglo de rutas. 
    FormsModule //Se registra para trabaja con formularios
  ],
  providers: [ClienteService,   //Asi es como se implementan los servicios en el app.module
    {provide: LOCALE_ID, useValue: 'es'}],    //Locale_Id una constante que define el lenguaje de los datos en el html.
  bootstrap: [AppComponent]       
})
export class AppModule { }
