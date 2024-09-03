// Función para abrir el modal
function openCartModal(cartModal) {
    cartModal.style.display = 'block';
    setTimeout(() => {
        cartModal.classList.add('open');
    }, 10);
}

// Función para cerrar el modal
function closeCartModal(cartModal) {
    cartModal.classList.remove('open');
    setTimeout(() => {
        cartModal.style.display = 'none';
    }, 500);
}

// Función para agregar un item al carrito
function addItemToCart(item, cartItemsContainer) {
    
    const divCarritoItems = cartItemsContainer;
    
    let itemProducto = divCarritoItems.querySelector(`#${item.id}`);

    if (itemProducto) {
        let cantidadXItem = itemProducto.querySelector('.cart-item-quantity');
        
        if (!cantidadXItem) {
            cantidadXItem = document.createElement('p');
            cantidadXItem.classList.add('cart-item-quantity');
            itemProducto.appendChild(cantidadXItem);
        }

        cantidadXItem.textContent = `Cantidad: ${item.cantidad}`;
    } else {
        itemProducto = document.createElement('div');
        itemProducto.classList.add('cart-item');
        itemProducto.id = item.id;

        const imgElement = document.createElement('img');
        imgElement.src = item.img;  
        imgElement.alt = item.nombre;   
        imgElement.classList.add('cart-item-image');
        itemProducto.appendChild(imgElement);
    
        const nameElement = document.createElement('p');
        nameElement.textContent = item.nombre;
        nameElement.classList.add('cart-item-name');
        itemProducto.appendChild(nameElement);
    
        const cantidadXItem = document.createElement('p');
        cantidadXItem.textContent = `Cantidad: ${item.cantidad}`;
        cantidadXItem.classList.add('cart-item-quantity');
        itemProducto.appendChild(cantidadXItem);
    
        cartItemsContainer.appendChild(itemProducto);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('cart-icon');
    const closeBtn = document.querySelector('.close-btn');
    const sectionContainer = document.querySelector('.section-container');    

    cartIcon.addEventListener('click', function(event) {
        event.preventDefault();
        openCartModal(cartModal);
    });

    closeBtn.addEventListener('click', function() {
        closeCartModal(cartModal);
    });

    window.addEventListener('click', function(event) {
        if (event.target == cartModal || event.target == sectionContainer) {
            closeCartModal(cartModal);
        }
    });      

});
