const socket = (window as any).io();

interface Turno {
    data: any
}
var arreglo: { numero: number; letra: string; time: string }[] = [];

class Turnero {
    static io: any;

    constructor(private cb: Function) {
        Turnero.io.on('dataFromServer', this.cb);
    }
    addTurno(numero: number, letra: string, time: string) {
        let turno = { numero, letra, time };
        arreglo.push(turno);
        console.log(turno)
    }
    deleteTurno(numero: number, letra: string) {
        arreglo = arreglo.filter(function (elemento) {
            return elemento.numero !== numero && elemento.letra !== letra
        })
    }
    ocultarTurno(numero: number, letra: string) {

    }
    emmitTurno(numero: number, letra: string, time: string) {
        let data = { numero, letra, time }
        Turnero.io.emit('data', data)
    }
}

Turnero.io = socket;

function turnoRecibido(response: Turno) {
    /* Creacion de listado de mensajes a traves del DOM */
    let abuelo = document.querySelector("#turnos");
    let padre = document.createElement("li");
    let child1 = document.createElement("span");
    child1.innerHTML = response.data.numero;
    child1.style.fontStyle = 'italic';
    child1.style.fontWeight = '700';
    let child2 = document.createElement("p");
    child2.innerHTML = response.data.letra;
    let child3 = document.createElement("p");
    child3.innerHTML = response.data.time;
    padre.appendChild(child1);
    padre.appendChild(child2);
    padre.appendChild(child3);
    padre.style.listStyle = 'none';
    padre.style.backgroundColor = 'cornflowerblue';
    padre.style.borderRadius = '0 10px 0 10px';
    padre.style.padding = '5px';
    padre.style.margin = '5px';
    abuelo?.appendChild(padre);
}

let turnero: Turnero = new Turnero(turnoRecibido);

document.querySelector("#form")?.addEventListener('submit', (ev) => {
    ev.preventDefault();
    const numero: number = (document.querySelector("#numero_turno") as HTMLInputElement).valueAsNumber;
    const letra: string = (document.querySelector("#letra_turno") as HTMLInputElement).value;
    const currentDate = new Date()
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    console.log(time);
    let turno = { numero, letra, time}
    turnero.addTurno(numero, letra, time);
    turnero.emmitTurno(numero, letra, time);
    mostrarTurno(turno);
    console.log(arreglo)

    return false;
})

function mostrarTurno(elemento: any) {
    let turno = document.querySelector("#turno_ppal");
    let titulo = document.createElement("h2");
    titulo.innerHTML = 'Turno';
    let letra = document.createElement("p");
    letra.innerHTML = elemento.letra;
    let numero = document.createElement("span");
    numero.innerHTML = elemento.numero;
    turno?.appendChild(titulo);
    turno?.appendChild(letra);
    turno?.appendChild(numero);
    /* aca tengo que mandar todos los datos del turno para mostrarlos en la pantalla ppal */
}
