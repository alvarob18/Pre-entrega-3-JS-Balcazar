class Indumentaria {
    constructor() {
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.filtro = document.getElementById('filter');        
        this.cartModal = document.getElementById('cart-modal');

        // Inicializar el contador del carrito
        this.actualizarCarrito();

        // Configurar eventos
        this.configurarEventos();

        // Cargar configuración inicial desde localStorage
        this.cargarConfiguracionInicial();
    }

    configurarEventos() {
        this.filtro.addEventListener('change', (event) => {
            const filtroEvento = event.target.value;
            this.mostrarCategoria(filtroEvento);
        });

        this.agregarCarrito();
        this.vaciarCarrito();
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
        //const contador = this.carrito.reduce((acc, item) => acc + item.cantidad, 0);
        document.getElementById('carrito-counter').textContent = contador;
    }

    agregarCarrito() {
        document.querySelectorAll('.add-to-cart').forEach((button) => {
            button.addEventListener('click', () => {
                const productoId = button.parentElement.id;
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
                    // Si existe, incrementar la cantidad
                    productoExistente.cantidad += 1;
                    productoInfo.cantidad = productoExistente.cantidad;
                } else {
                    // Si no existe, agregarlo como un nuevo producto
                    this.carrito.push(productoInfo);
                }

                window.addItemToCart(productoInfo);

                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                //alert('Producto agregado al carrito');

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
                    //html: '<img src="https://img.icons8.com/doodle/48/000000/shopping-cart--v1.png" alt="Carrito">',
                    title: "Producto agregado al carrito"
                  });

                this.actualizarCarrito();
            });
        });
    }

    // Finaliza Compra
    finalizarCompra() {        
        document.getElementById('checkout-btn').addEventListener('click', () => {
            //this.cartModal.classList.remove('open');

            // Vaciar el carrito     
            this.carrito.length = 0;

            // Actualizar el localStorage
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
    
            // Vacia el contenido del modal del carrito
            const cartItemsContainer = document.getElementById('cart-items');
            cartItemsContainer.innerHTML = '';    
        
            this.actualizarCarrito();
    
            setTimeout(() => {
                this.cartModal.style.display = 'none';
                let timerInterval;
                Swal.fire({
                    title: "Ha finalizado su compra con exito!",
                    //html: "Se cerrara en <b></b> milisegundos.",
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading();
                        const timer = Swal.getPopup().querySelector("b");
                        timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                        }, 100);
                    },
                    willClose: () => {
                        clearInterval(timerInterval);
                    }
                    }).then((result) => {
                    /* Read more about handling dismissals below */
                    if (result.dismiss === Swal.DismissReason.timer) {
                        console.log("Se cerro por el temporizador.");
                    }
                });
            }, 500);
        });
    }

    vaciarCarrito() {
        document.getElementById('vaciar-carrito').addEventListener('click', () => {
            
            // Vaciar el carrito
            this.carrito.length = 0;
        
            // Actualizar el localStorage
            localStorage.setItem('carrito', JSON.stringify(this.carrito));
        
            this.actualizarCarrito();
        
            alert('El carrito ha sido vaciado.');
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
