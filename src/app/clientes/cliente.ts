export class Cliente {
    id: number;
    nombre: string;
    apellido: string;        
    email: string;
    createAt: string;    
}
 
/* Creamos esta clase para poder simular un consumo de datos que apareceran en una tabla mostrando como se puede recolectar datos 
para ser llevados al Frontend. Entonces: 
1. Primero se creo la clase del objeto cliente 
2. En el html se crea una tabla y por medio de *ngFor se traen los datos (ID, nombre, apellido, ...) de un arreglo que crearemos 
    luego en la clase component llamada "clientes".
3. En el clientes.component.ts se crea el arreglo antes mencionado de tipo Cliente en donde se guardaran los datos para mostrarlos
    desde el html con *ngFor. Usamos dos maneras sincronas de traer los datos sin que sean del backend:
3.1: Agregandose directamente al arreglo clientes de la clase component 
   = [
    {id: 1, nombre: 'Juan', apellido: 'Ramirez', createAt: '2023-02-17', email:'dan2020reyes@gmail.com'},
    ...
  ];
  Y siendo llamados desde el component.html con el *ngFor. Es bastante simple y directo pues solo se crea el objeto y se llama.

3.2: Creando una clase service en la cual se crea un metodo getClientes() que devovera un arreglo de Clientes[]. Importando los 
    datos del archivo JSON podemos retornarlos por medio del metodo creado, ya que en el JSON ya estan en forma de arreglo. 

    Sin embargo para traer ese metodo a la clase component.ts desde la clase service.ts, inicializamos un objeto de dicha clase 
    en el contructor de component para poder implementar dicho metodo siendo igualado a la variable que se llama desde el html 
    es decir (clientes).
4.
*/

/* Observables RxJs
  Es una libreria en JS que permite implementar programacion reactiva en Angular.
  Se usa para trabajar con datos, flujos que pueden no llegar de forma inmediata (Tienen delay/tiempo de espera) por lo que se hace 
  es suscribirse y estar pendientes de cuando se emiten estos datos, de su flujo. 
  Cuando se emiten se implementa por codigo llamado Observador o Centinela, el cual esta pendiente escuchando y realizando procesos
  cuando los datos son recibidos.
  Observable -->Evento : Emite datos.Asincronos
  Observador -->Centinela : Recibe datos.

*/