class Indumentaria {
    constructor() {
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.filtro = document.getElementById('filter');        
        this.cartModal = document.getElementById('cart-modal');
        const cartItemsContainer = document.getElementById('cart-items');
        
        // Inicializar el contador del carrito
        this.actualizarCarrito();

        // Configurar eventos
        this.configurarEventos();

        // Cargar configuración inicial desde localStorage
        this.cargarConfiguracionInicial();

        // Cargar el carrito desde localStorage
        this.CargarCarritoLocalStorage(cartItemsContainer);
    }

    configurarEventos() {
        this.filtro.addEventListener('change', (event) => {
            const filtroEvento = event.target.value;
            this.mostrarCategoria(filtroEvento);
        });

        this.agregarCarrito();
        this.vaciarCarrito();
        this.finalizaCompraCarrito();
        this.finalizarCompra();
    }

    mostrarCategoria(filtro) {
        const categorias = document.querySelectorAll('.photo-grid-indumentaria');
        categorias.forEach(categoria => {
            categoria.style.display = 'none';
        });

        switch(filtro) {
            case 'remeraClasica':
                document.getElementById('RemerasClasicas').style.display = 'flex';
                break;
            case 'remeraUrbana':
                document.getElementById('RemerasUrbanas').style.display = 'flex';
                break;
            case 'remeraCasual':
                document.getElementById('RemerasCasuales').style.display = 'flex';
                break;
            default:
                categorias.forEach(categoria => {
                    categoria.style.display = 'flex';
                });
                break;
        }
    }
    
    actualizarCarrito() {
        const contador = this.carrito.length;
        document.getElementById('carrito-counter').textContent = contador;
    }

    agregarCarrito() {
        document.querySelectorAll('.add-to-cart').forEach((button) => {
            button.addEventListener('click', () => {
                const productoId = button.parentElement.id;                
                const cartItemsContainer = document.getElementById('cart-items');
                const productoInfo = {
                    id: productoId,
                    nombre: button.parentElement.querySelector('.item-description').textContent,
                    tipo: button.parentElement.querySelector('.item-type').textContent,
                    img: button.parentElement.querySelector('img').src,
                    cantidad: 1
                };

                // Verificar si el producto ya existe en el carrito
                const productoExistente = this.carrito.find(item => item.id === productoInfo.id);

                if (productoExistente) {
                    // Si existe, se incrementa la cantidad
                    productoExistente.cantidad += 1;
                    productoInfo.cantidad = productoExistente.cantidad;
                } else {
                    // Si no existe, se agrega como un nuevo producto
                    this.carrito.push(productoInfo);
                }

                window.addItemToCart(productoInfo, cartItemsContainer);

                localStorage.setItem('carrito', JSON.stringify(this.carrito));

                const Toast = Swal.mixin({
                    toast: true,
                    position: "bottom-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                    }
                  });
                  Toast.fire({
                    icon: "success",                    
                    title: "Producto agregado al carrito"
                  });

                this.actualizarCarrito();
            });
        });
    }

    CargarCarritoLocalStorage(cartItemsContainer) {

        // Obtener los items del carrito desde localStorage
        const cartItems = JSON.parse(localStorage.getItem('carrito')) || [];
    
        // Iterar sobre los items y agregarlos al carrito
        cartItems.forEach(item => {
            window.addItemToCart(item, cartItemsContainer);
        });
    }

    //Se llama al finalizar la compra y al vaciar el carrito
    finalizarCompra(mensaje) {        
        const handleFinalizarCompra = () => {
            // Vaciar el carrito     
            this.carrito.length = 0;

            // Actualiza el localStorage
            localStorage.setItem('carrito', JSON.stringify(this.carrito));

            // Vacia el contenido del modal del carrito
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';    
        
            this.actualizarCarrito();

            setTimeout(() => {
                this.cartModal.style.display = 'none';
                let timerInterval;
                Swal.fire({
                    title: mensaje ? mensaje : "Ha finalizado su compra con éxito!",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("Se cerró por el temporizador.");
                    }
                });
            }, 500);
        };

        handleFinalizarCompra();
    }

    finalizaCompraCarrito() {
        document.getElementById('checkout-btn').addEventListener('click', () => {
            const mensaje = "Ha finalizado su compra con éxito!";
            this.finalizarCompra(mensaje);
        });
    }

    vaciarCarrito() {
        document.getElementById('vaciar-carrito').addEventListener('click', () => {            
            const mensaje = "El carrito ha sido vaciado.";
            this.finalizarCompra(mensaje);
        });
    }

    eliminarProducto(index) {
        this.carrito.splice(index, 1);
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        this.mostrarCarrito();
        this.actualizarCarrito();
    }

    cargarConfiguracionInicial() {
        const filtroSeleccionado = localStorage.getItem('filtroSeleccionado') || 'all';
        this.filtro.value = filtroSeleccionado;

        this.mostrarCategoria(filtroSeleccionado);
    }
}

// Evento que se ejecuta cuando el contenido HTML de la página se ha cargado por completo
document.addEventListener('DOMContentLoaded', () => {
    const tienda = new Indumentaria();
});
