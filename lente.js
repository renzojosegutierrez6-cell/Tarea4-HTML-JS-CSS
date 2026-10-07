const productos = [
    { id: 'p1', nombre: 'Aviador (Aviator)', precio: 79.90, imagen: 'Lentes01.jpg' },
    { id: 'p2', nombre: 'Wayfarer', precio: 84.90, imagen: 'Lentes02.jpg' },
    { id: 'p3', nombre: 'Clubmaster', precio: 89.90, imagen: 'Lentes03.jpg' },
    { id: 'p4', nombre: 'Redondos (Round)', precio: 94.90, imagen: 'Lentes04.jpg' },
    { id: 'p5', nombre: 'Cuadrados (Square)', precio: 99.90, imagen: 'Lentes05.jpg' },
    { id: 'p6', nombre: 'Rectangulares', precio: 104.90, imagen: 'Lentes06.jpg' },
    { id: 'p7', nombre: 'Ovalados', precio: 109.90, imagen: 'Lentes07.jpg' },
    { id: 'p8', nombre: 'Cat Eye', precio: 114.90, imagen: 'Lentes08.jpg' },
    { id: 'p9', nombre: 'Mariposa (Butterfly)', precio: 119.90, imagen: 'Lentes09.jpg' },
    { id: 'p10', nombre: 'Escudo (Shield)', precio: 124.90, imagen: 'Lentes10.jpg' },
    { id: 'p11', nombre: 'Sin Marco (Rimless)', precio: 129.90, imagen: 'Lentes11.jpg' },
    { id: 'p12', nombre: 'Geometricos', precio: 134.90, imagen: 'Lentes12.jpg' },
    { id: 'p13', nombre: 'Deportivos', precio: 139.90, imagen: 'Lentes13.jpg' },
    { id: 'p14', nombre: 'Ojo de Gato Retro', precio: 144.90, imagen: 'Lentes14.jpg' },
    { id: 'p15', nombre: 'Lente Doble Puente', precio: 149.90, imagen: 'Lentes15.jpg' },
    { id: 'p16', nombre: 'Polarizado Urbano', precio: 154.90, imagen: 'Lentes16.jpg' },
    { id: 'p17', nombre: 'Espejados Azul', precio: 159.90, imagen: 'Lentes17.jpg' },
    { id: 'p18', nombre: 'Vintage Gold', precio: 164.90, imagen: 'Lentes18.jpg' },
    { id: 'p19', nombre: 'Futuristas', precio: 169.90, imagen: 'Lentes19.jpg' },
    { id: 'p20', nombre: 'Hexagonales', precio: 174.90, imagen: 'Lentes20.jpg' },
    { id: 'p21', nombre: 'Oversize Elegante', precio: 179.90, imagen: 'Lentes21.jpg' },
    { id: 'p22', nombre: 'Bambú Ecológico', precio: 184.90, imagen: 'Lentes22.jpg' },
    { id: 'p23', nombre: 'Titanio Ultraligero', precio: 189.90, imagen: 'Lentes23.jpg' },
    { id: 'p24', nombre: 'Gradient Classic', precio: 194.90, imagen: 'Lentes24.jpg' },
    { id: 'p25', nombre: 'Edición Especial', precio: 199.90, imagen: 'Lentes25.jpg' }
];

let carrito = [];

document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos();
    actualizarCarritoUI();
});

function renderizarProductos() {
    const contenedor = document.getElementById('contenedor-productos');
    contenedor.innerHTML = productos.map(prod => `
        <div class="tarjeta">
            <div class="contenedor-imagen-tarjeta">
                <img src="${prod.imagen}" alt="${prod.nombre}">
            </div>
            <div class="informacion-tarjeta">
                <div class="titulo-tarjeta">${prod.nombre}</div>
                <div class="precio-tarjeta">S/. ${prod.precio.toFixed(2)}</div>
                <div class="control-cantidad">
                    <input type="number" id="cant-${prod.id}" value="1" min="1" class="input-cantidad">
                    <button type="button" class="boton-agregar" id="btn-${prod.id}" onclick="agregarAlCarrito('${prod.id}')">
                        <span class="texto-btn">Agregar</span>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function agregarAlCarrito(idProducto) {
    const inputCant = document.getElementById(`cant-${idProducto}`);
    const cantidad = parseInt(inputCant.value) || 1;
    const prodInfo = productos.find(p => p.id === idProducto);

    const itemEnCarrito = carrito.find(item => item.id === idProducto);

    if (itemEnCarrito) {
        itemEnCarrito.cantidad += cantidad;
    } else {
        carrito.push({ ...prodInfo, cantidad });
    }

    const boton = document.getElementById(`btn-${idProducto}`);
    boton.classList.add('agregado');
    boton.querySelector('.texto-btn').innerHTML = '✓ Agregado';

    setTimeout(() => {
        boton.classList.remove('agregado');
        boton.querySelector('.texto-btn').innerHTML = 'Agregar';
    }, 1200);

    inputCant.value = 1;
    actualizarCarritoUI();
}

function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(item => item.id !== idProducto);
    actualizarCarritoUI();
}

function cambiarCantidad(idProducto, cambio) {
    const item = carrito.find(i => i.id === idProducto);
    if (!item) return;

    item.cantidad += cambio;
    if (item.cantidad <= 0) {
        eliminarDelCarrito(idProducto);
    } else {
        actualizarCarritoUI();
    }
}

function actualizarCarritoUI() {
    const contenedor = document.getElementById('elementos-carrito');
    const totalSpan = document.getElementById('monto-total');
    const totalModalSpan = document.getElementById('monto-total-modal');
    const contadorSpan = document.getElementById('contador-carrito');
    const btnProceder = document.getElementById('btn-proceder');

    if (carrito.length === 0) {
        contenedor.innerHTML = '<p class="carrito-vacio">Tu carrito está vacío.</p>';
        totalSpan.textContent = '0.00';
        if (totalModalSpan) totalModalSpan.textContent = '0.00';
        contadorSpan.textContent = '0';
        
        if (btnProceder) {
            btnProceder.classList.add('deshabilitado');
        }
        return;
    }

    if (btnProceder) {
        btnProceder.classList.remove('deshabilitado');
    }

    let total = 0;
    let totalItems = 0;

    contenedor.innerHTML = carrito.map(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        totalItems += item.cantidad;

        return `
            <div class="item-carrito">
                <div class="detalles-item">
                    <strong>${item.nombre}</strong><br>
                    <small>S/. ${item.precio.toFixed(2)}</small>
                </div>
                <div class="acciones-item">
                    <button type="button" class="btn-cant" onclick="cambiarCantidad('${item.id}', -1)">-</button>
                    <span>${item.cantidad}</span>
                    <button type="button" class="btn-cant" onclick="cambiarCantidad('${item.id}', 1)">+</button>
                    <span class="btn-eliminar" onclick="eliminarDelCarrito('${item.id}')">&times;</span>
                </div>
            </div>
        `;
    }).join('');

    const totalFormateado = total.toFixed(2);
    totalSpan.textContent = totalFormateado;
    if (totalModalSpan) totalModalSpan.textContent = totalFormateado;
    contadorSpan.textContent = totalItems;
}

function abrirPreRegistro() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío. Agrega al menos un producto para proceder.');
        return;
    }
    
    document.getElementById('modal-check').checked = true;
}

function finalizarCompra(event) {
    event.preventDefault();
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }

    carrito = [];
    actualizarCarritoUI();

    document.getElementById('form-compra').style.display = 'none';
    document.getElementById('titulo-modal').style.display = 'none';
    document.getElementById('tarjeta-exito').style.display = 'block';

    document.getElementById('cart-check').checked = false;
}

function cerrarTodo() {
    document.getElementById('modal-check').checked = false;
    
    setTimeout(() => {
        document.getElementById('form-compra').style.display = 'block';
        document.getElementById('titulo-modal').style.display = 'block';
        document.getElementById('tarjeta-exito').style.display = 'none';
        document.getElementById('form-compra').reset();
    }, 300);
}