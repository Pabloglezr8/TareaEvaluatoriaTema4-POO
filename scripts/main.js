import { showFormButton, showAddForm } from "./otherFunctions.js";
import { Product } from "./products.js";
import { ProductManager } from "./productsManager.js";


const productManager = new ProductManager();
// Cargar productos desde localStorage cuando la página carga
productManager.loadFromLocalStorage();
// Llamar a la función para mostrar la tabla del inventario con los productos cargados

updateInventoryTable();

showFormButton.addEventListener('click', showAddForm);



document.getElementById('search-button').addEventListener('click', () => {
    const searchInput = document.getElementById('search-product');
    const searchTerm = searchInput.value;

    // Llamada al método de búsqueda de la clase ProductManager
    const filteredProducts = productManager.searchProduct(searchTerm);

    // Actualizar la tabla con los productos filtrados
    updateInventoryTable(filteredProducts);
});


//Evento del formulario para agregar un nuevo producto
const submitButton = document.getElementById('submit-button')
submitButton.addEventListener('click', () => {
    const productName = document.getElementById('product-name').value;
    const productQuantity = parseInt(document.getElementById('product-quantity').value);
    const productPrice = parseFloat(document.getElementById('product-price').value)


    //Crear una instancia de Product con los valores del formulario
    const newProduct = new Product(Date.now(), productName, productQuantity, productPrice)

    console.log(newProduct);

    //Agregar el nuevo producto al administrador de productos
    productManager.addProduct(newProduct)

    // Guardar productos en localStorage después de agregar uno nuevo
    productManager.saveToLocalStorage();

    //limpiar el formulario
    this.reset();

    updateInventoryTable();
    productManager.loadFromLocalStorage();
})


// Función para actualizar la tabla de inventario
function updateInventoryTable(products = productManager.listProducts()) {
    const tableBody = document.getElementById('body-table');
    tableBody.innerHTML = '';

    // Iterar sobre la lista de productos y agregar filas a la tabla
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.nombre}</td>
            <td>${product.cantidad}</td>
            <td>${product.precio}</td>
            <td>
                <button class="edit-button">Editar</button>
                <button class="delete-button">Eliminar</button>
            </td>
        `;
        tableBody.appendChild(row);

        const editButton = row.querySelector(".edit-button");
        const deleteButton = row.querySelector('.delete-button');

        deleteButton.addEventListener('click', () => {
            productManager.deleteProductById(product.id);

            updateInventoryTable();
        });

        editButton.addEventListener('click', () => {
            showAddForm();

            

            const editCancel = document.createElement('button')
            editCancel.innerHTML = "Cancelar";
            deleteButton.replaceWith(editCancel);
            editCancel.addEventListener('click', () => {
                showAddForm()
                editCancel.replaceWith(deleteButton)
                editConfirm.replaceWith(editButton)
            })

            const editConfirm = document.createElement('button')
            editConfirm.innerHTML = "Aceptar";
            editConfirm.style.display = "inline";
            editButton.replaceWith(editConfirm);

            editConfirm.addEventListener('click', () => {

                const productName = document.getElementById('product-name').value;
                const productQuantity = parseInt(document.getElementById('product-quantity').value);
                const productPrice = parseFloat(document.getElementById('product-price').value)

                if (productName !== null && productQuantity !== null && productPrice !== null) {
                    // Crea un nuevo objeto Product con los datos editados
                    const editedProduct = new Product(product.id, productName, parseInt(productQuantity), parseFloat(productPrice));

                    // Actualiza el producto en el administrador
                    productManager.updateProductById(product.id, editedProduct);

                    console.log(editedProduct);

                    // Actualiza la tabla
                    updateInventoryTable();
                    
                    showAddForm()

                    document.body.removeChild(editConfirm);
                }

            })

        });

    });

}
// Llamar a la función inicial para mostrar la tabla del inventario
updateInventoryTable();

/* localStorage.clear(); */