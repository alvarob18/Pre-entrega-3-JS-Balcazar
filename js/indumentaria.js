class Indumentaria {
    constructor() {
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.filtro = document.getElementById('filter');

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
                const productoInfo = {
                    id: productoId,
                    nombre: button.parentElement.querySelector('.item-description').textContent,
                    tipo: button.parentElement.querySelector('.item-type').textContent,
                    img: button.parentElement.querySelector('img').src
                };
                this.carrito.push(productoInfo);
                localStorage.setItem('carrito', JSON.stringify(this.carrito));
                alert('Producto agregado al carrito');
                this.actualizarCarrito();
            });
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
