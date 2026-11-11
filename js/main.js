/*
Parte 1: Clase Libro

Debes crear una clase Libro que represente un libro dentro de la biblioteca.
Esta clase debe tener:

    Propiedades:
        titulo: nombre del libro
        autor: autor del libro
        isbn: identificador único del libro
        _prestado: estado del libro (encapsulado con _ para indicar que es privado)

    Métodos:
        prestar(): cambia el estado del libro a prestado
        devolver(): cambia el estado del libro a disponible
        getEstado(): retorna si el libro está prestado o disponible

Ejemplo de uso:

const libro = new Libro("Cien años de soledad", "Gabriel García Márquez", "11111");
libro.getEstado(); // "Disponible"
libro.prestar();
libro.getEstado(); // "Prestado"
*/

//const mensajes = document.querySelector('.mensajes')

class Libro {
    constructor(titulo, autor, isbn) {
        this.titulo = titulo;
        this.autor = autor;
        this.isbn = isbn;
        this._prestado = "Disponible";
        // yo podria true pero para este ejercicio voy devolver directamente el string
    }

    prestar() {
        this._prestado = "Prestado";
    }

    devolver() {
        this._prestado = "Disponible";
    }

    getEstado() {
        return this._prestado;
    }
}
const libro = new Libro(
    "Cien años de soledad",
    "Gabriel García Márquez",
    "11111",
);

console.log(libro.getEstado()); // Disponible

libro.prestar();

console.log(libro.getEstado()); // Prestado

libro.devolver();

console.log(libro.getEstado()); // Disponible

/*

Parte 2: Clase Biblioteca

Esta clase debe representar a la colección de libros y permitir gestionarlos.
Esta clase debe tener:

    Propiedades:
        nombre: nombre de la biblioteca
        libros: un array para guardar los libros (instancias de Libro)

    Métodos:
        agregarLibro(libro): añade un libro a la colección
        buscarPorISBN(isbn): busca un libro específico en la colección
        prestarLibro(isbn): presta un libro según su ISBN
        devolverLibro(isbn): devuelve un libro según su ISBN
        mostrarLibros(): muestra todos los libros con su estado

Ejemplo de uso:

const biblio = new Biblioteca("Biblioteca Central");
const libro1 = new Libro("1984", "George Orwell", "12345");

biblio.agregarLibro(libro1);
biblio.prestarLibro("12345");
biblio.mostrarLibros(); // muestra el libro como "Prestado"
*/

class Biblioteca {
    constructor(nombre) {
        this.nombre = nombre;
        this.libros = [];
    }

    agregarLibro(libro) {
        this.libros.push(libro);
    } //añade un libro a la colección

    buscarPorISBN(isbn) {
        return this.libros.find((libro) => libro.isbn === isbn);
    } //busca un libro específico en el array

    prestarLibro(isbn) {
        const libroEncontrado = this.buscarPorISBN(isbn); // buscamos por isbn

        if (!libroEncontrado) {
            return `El libro con isbn: ${isbn} no existe`;
        }

        if (libroEncontrado.getEstado() === "Disponible") {
            // si esta disponible podemos prestarlo
            libroEncontrado.prestar();
            return `Libro ${libroEncontrado.titulo} prestado correctamente`;
        } else {
            // si ya estaba prestado informamos
            return `${libroEncontrado.titulo} todavia esta prestado, deben devolverlo primero`;
        }
    } //presta un libro según su ISBN

    devolverLibro(isbn) {
        const libroEncontrado = this.buscarPorISBN(isbn); // buscamos por isbn

        if (!libroEncontrado) {
            return "El libro no existe";
        }

        if (libroEncontrado.getEstado() === "Prestado") {
            libroEncontrado.devolver();
            return `${libroEncontrado.titulo} devuelto correctamente`;
        } else {
            return `${libroEncontrado.titulo} esta disponible en la biblioteca, no está prestado`;
        }
    } //devuelve un libro según su ISBN

    mostrarLibros() {
        let mensaje = "";
        this.libros.forEach((libro) => {
            mensaje += `titulo: ${libro.titulo}, autor ${libro.autor}, isbn ${libro.isbn}, prestado: ${libro.getEstado()}\n`;
        });
        return mensaje;
    } //muestra todos los libros con su estado
}

const biblio = new Biblioteca("Biblioteca Central");
console.log(biblio.nombre);

const libro1 = new Libro("1984", "George Orwell", "12345");
const libro2 = new Libro("El Quijote", "Cervantes", "67890");

console.log("Estado de " + libro1.titulo + ": " + libro1.getEstado());
console.log("Estado de " + libro2.titulo + ": " + libro1.getEstado());

// añadimos a la bibiblioteca
biblio.agregarLibro(libro1);
biblio.agregarLibro(libro2);
console.log(biblio.mostrarLibros());
//mensajes.textContent = biblio.mostrarLibros();

console.log(biblio.prestarLibro("12345")); // prestado
console.log(biblio.mostrarLibros());

console.log(biblio.prestarLibro("67890")); // prestado
console.log(biblio.prestarLibro("12345")); // Ya está prestado

console.log(biblio.devolverLibro("12345")); // Devuelto correctamente
console.log(biblio.devolverLibro("12345")); // Ya está disponible
console.log(biblio.devolverLibro("67890")); // Devuelto correctamente

console.log(biblio.prestarLibro("99999")); // No existe
console.log(biblio.mostrarLibros());
