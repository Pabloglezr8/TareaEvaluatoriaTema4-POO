
export const showFormButton = document.getElementById('display-form')

export function showAddForm (){
    const divForm = document.getElementById('add-form');

    if (divForm.style.display === "none") {
        divForm.style.display = "inline";

        showFormButton.innerHTML = "cancelar";
    } else {
        divForm.style.display = "none";

        showFormButton.innerHTML = "Agregar Producto";
    }
}

