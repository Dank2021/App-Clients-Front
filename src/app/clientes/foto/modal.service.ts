import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/*El modal en Angular es un servicio para mostrar un (Dialog Box) o una cuadros de dialogo que deben ser interactuados antes de realizar acciones adicionales en un a app web */
export class ModalService {

   modal: boolean = false;
   public _notificarUpload = new EventEmitter<any>(); 

  constructor() { }

  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }

  abrirModal(){ //Con este metodo controlamos la variable que indica que el cuadro de dialogo esta abierto.
    this.modal = true;
  }
  cerrarModal(){ //Con este metodo controlamos la variable que indica que el cuadro de dialogo esta cerrado.
    this.modal = false;
  }
}
