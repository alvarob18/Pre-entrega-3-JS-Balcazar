document.addEventListener('DOMContentLoaded', function() {
    const cartModal = document.getElementById('cart-modal');
    const cartIcon = document.getElementById('cart-icon');
    const closeBtn = document.querySelector('.close-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const btnFinalizarCompra = document.getElementById('checkout-btn');

    // Abre el modal
    cartIcon.addEventListener('click', function(event) {
        event.preventDefault();
        cartModal.style.display = 'block';
        setTimeout(() => {
            cartModal.classList.add('open');
        }, 10);
    });

    // Cierra el modal
    closeBtn.addEventListener('click', function() {
        cartModal.classList.remove('open');
        setTimeout(() => {
            cartModal.style.display = 'none';
        }, 500);
    });

    // Cierra el modal si se hace clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target == cartModal) {
            cartModal.classList.remove('open');
            setTimeout(() => {
                cartModal.style.display = 'none';
            }, 500);
        }
    });      

    window.addItemToCart = function(item) {


        // Verificar si el producto ya está en el modal
        const divCarritoItems = document.getElementById('cart-items');
        
        // Buscar el div dentro de divCarritoItems por id
        let itemElement = divCarritoItems.querySelector(`#${item.id}`);

        console.log('entro a addItemToCart');
        console.log(`#${item.id}`);
        if (itemElement) {
            // Intentar encontrar el elemento de cantidad
            let quantityElement = itemElement.querySelector('.cart-item-quantity');
            
            if (!quantityElement) {
                // Si el elemento de cantidad no existe, crearlo
                quantityElement = document.createElement('p');
                quantityElement.classList.add('cart-item-quantity');
                itemElement.appendChild(quantityElement);
            }

            console.log('existe el item');

            console.log(quantityElement.textContent);
            console.log(`Cantidad: ${item.cantidad}`);
            quantityElement.textContent = `Cantidad: ${item.cantidad}`;
        } else {
            console.log('No existe el item');
            // Crear el contenedor del item
            itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.id = item.id;

            // Crear y agregar la imagen del producto
            const imgElement = document.createElement('img');
            imgElement.src = item.img;  // URL de la imagen del producto
            imgElement.alt = item.nombre;   // Nombre del producto para el atributo alt
            imgElement.classList.add('cart-item-image');
            itemElement.appendChild(imgElement);
        
            // Crear y agregar el nombre del producto
            const nameElement = document.createElement('p');
            nameElement.textContent = item.nombre;  // Nombre del producto
            nameElement.classList.add('cart-item-name');
            itemElement.appendChild(nameElement);
        
            // Crear y agregar la cantidad del producto
            const quantityElement = document.createElement('p');
            quantityElement.textContent = `Cantidad: ${item.cantidad}`;  // Cantidad del producto
            quantityElement.classList.add('cart-item-quantity');
            itemElement.appendChild(quantityElement);
        
            // Agregar el item al contenedor del carrito
            cartItemsContainer.appendChild(itemElement);
        }
    };    

    // Ejemplo de uso de la función addItemToCart:
    // addItemToCart('Producto 1');
    // addItemToCart('Producto 2');
});
