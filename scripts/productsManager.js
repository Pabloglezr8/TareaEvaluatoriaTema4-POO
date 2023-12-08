import { Product } from "./products.js";

export class ProductManager {
    #products;

    constructor() {
        this.#products = [];
        this.loadFromLocalStorage();
    }

    // Método para obtener la lista de productos
    listProducts() {
        return this.#products;
    }

    // Método para agregar el producto
    addProduct(product) {
        this.#products.push(product);
        this.saveToLocalStorage();
    }

    // Método para actualizar un producto por su ID
    updateProductById(id, updateProduct) {
        const index = this.#products.findIndex(product => product.id === id);

        // Si no existe error (es coincidente el index)
        if (index !== -1) {
            this.#products[index] = updateProduct;
            localStorage.removeItem(id);
            this.saveToLocalStorage();
        }

    }

    // Método para eliminar un producto
    deleteProductById(id) {
        const index = this.#products.findIndex(product => product.id === id);

        if (index !== -1) {
            this.#products.splice(index, 1);
            localStorage.removeItem(id);
        }
    }

    // Método para buscar un producto por nombre
    searchProduct(productName) {
        const searchTerm = productName.trim().toLowerCase();

        // Obtener la lista de productos del administrador
        const products = this.#products;

        if (searchTerm === "") {
            // Si el campo de búsqueda está vacío, devolver la lista completa de productos
            return products;
        }

        // Buscar el índice del primer producto que coincide con el término de búsqueda
        const index = products.findIndex(product => product.nombre.toLowerCase().includes(searchTerm));

        if (index === -1) {
            // Mostrar un alert si no se encuentra ningún producto
            alert('Ningún producto encontrado');
            return [];
        }

        // Devolver un array que contiene el producto encontrado
        return [products[index]];
    }


    // Método para mostrar todos los productos dentro del Array
    showProducts() {
        for (const product of this.#products) {
            console.log(`ID: ${product.id}, Nombre: ${product.nombre}, Cantidad: ${product.cantidad}, Precio: ${product.precio}`);
        }
    }

    saveToLocalStorage() {
        this.#products.forEach(product => {
            localStorage.setItem(product.id, JSON.stringify(product.toJSON()));
        });
    }

    loadFromLocalStorage() {
        const products = Object.keys(localStorage).map(key => {
            const data = JSON.parse(localStorage.getItem(key));
            return new Product(data.id, data.nombre, data.cantidad, data.precio);
        });
        this.#products = products;
    }



    get products() {
        return this.#products;
    }

    set products(value) {
        this.#products = value;
    }

}