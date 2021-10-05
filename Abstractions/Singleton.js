//El singleton se utiliza para tener una unica instancia y que el new solo te regrese la misma instancia util para las BD
class Singleton {

    static instancia;
    nombre = '';

    constructor(nombre = '') {
        //console.log(Singleton.instancia)

        if(!!Singleton.instancia){ // nos indica que ya existe una instancia con !!
            return Singleton.instancia
        }
        Singleton.instancia = this;
        this.nombre = nombre;

        //return this;
    }
}

/*
Ejemplo
const inst1 = new Singleton('Pablo Emilio Escobar Gaviria')
const inst2 = new Singleton('Spiderman')
const inst3 = new Singleton('Blackpanther')


console.log(`Nombre en la instancia 1 es:  ${inst1.nombre}`)

console.log(`Nombre en la instancia 1 es:  ${inst2.nombre}`)
*/