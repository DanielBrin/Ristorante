const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnEnsaladas = document.querySelector('.ensaladas');
const btnPasta = document.querySelector('.pasta');
const btnPizza = document.querySelector('.pizza');
const btnPostres = document.querySelector('.postres');
const contenedorPlatillos = document.querySelector('.platillos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    platillos();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);   
    cerrarMenu(btnCerrar,overlay);
    
}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        }); 
});


imagenes.forEach(imagen=>{
   
    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');  
        boton.remove();
    }
}

const platillos = () =>{
    let platillosArreglo = [];
    const platillos = document.querySelectorAll('.platillo');

    platillos.forEach(platillo=> platillosArreglo = [...platillosArreglo,platillo]);

    const ensaladas = platillosArreglo.filter(ensalada=> ensalada.getAttribute('data-platillo') === 'ensalada');
    const pastas = platillosArreglo.filter(pasta => pasta.getAttribute('data-platillo') === 'pasta');
    const pizzas = platillosArreglo.filter(pizza => pizza.getAttribute('data-platillo') === 'pizza');
    const postres = platillosArreglo.filter(postre=> postre.getAttribute('data-platillo') === 'postre');

    mostrarPlatillos(ensaladas, pastas, pizzas, postres, platillosArreglo);

}

const mostrarPlatillos = (ensaladas, pastas, pizzas, postres, todos) =>{
    btnEnsaladas.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        ensaladas.forEach(ensalada=> contenedorPlatillos.appendChild(ensalada));
    });

    btnPasta.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
         pastas.forEach(pasta=> contenedorPlatillos.appendChild(pasta));
    });

    btnPizza.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        pizzas.forEach(pizza=> contenedorPlatillos.appendChild(pizza));
    });
    btnPostres.addEventListener('click', ()=>{
        limpiarHtml(contenedorPlatillos);
        postres.forEach(postre=> contenedorPlatillos.appendChild(postre));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorPlatillos);
        todos.forEach(todo=> contenedorPlatillos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}

/* prueba carrito */
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.carrito-items');
    const totalElement = document.getElementById('total');

    function addToCart(name, price) {
        const item = cart.find(i => i.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    function removeFromCart(name) {
        const itemIndex = cart.findIndex(i => i.name === name);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'carrito-item';
            cartItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                <button class="remove-item" data-name="${item.name}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalElement.textContent = total.toFixed(2);
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const platillo = e.target.closest('.platillo');
            const name = platillo.querySelector('h2').textContent;
            const price = parseFloat(platillo.querySelector('.precio p').textContent.substring(1));
            addToCart(name, price);
        });
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const name = e.target.getAttribute('data-name');
            removeFromCart(name);
        }
    });

    document.getElementById('pagar').addEventListener('click', () => {
        alert(`Total a pagar: $${totalElement.textContent}`);
        // Aquí puedes agregar la lógica de pago
    });
});


/* mood de pago prueba */
document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItemsContainer = document.querySelector('.carrito-items');
    const totalElement = document.getElementById('total');
    const paymentModal = document.getElementById('payment-modal');
    const closeModal = document.querySelector('.close');

    function addToCart(name, price) {
        const item = cart.find(i => i.name === name);
        if (item) {
            item.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        renderCart();
    }

    function removeFromCart(name) {
        const itemIndex = cart.findIndex(i => i.name === name);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
        }
        renderCart();
    }

    function renderCart() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'carrito-item';
            cartItem.innerHTML = `
                <h4>${item.name}</h4>
                <p>${item.quantity} x $${item.price.toFixed(2)}</p>
                <button class="remove-item" data-name="${item.name}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        totalElement.textContent = total.toFixed(2);
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const platillo = e.target.closest('.platillo');
            const name = platillo.querySelector('h2').textContent;
            const price = parseFloat(platillo.querySelector('.precio p').textContent.substring(1));
            addToCart(name, price);
        });
    });

    cartItemsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item')) {
            const name = e.target.getAttribute('data-name');
            removeFromCart(name);
        }
    });

    document.getElementById('pagar').addEventListener('click', () => {
        paymentModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        paymentModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    document.getElementById('payment-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        const cardNumber = document.getElementById('card-number').value;
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvc = document.getElementById('card-cvc').value;
        
        alert(`Pago confirmado con ${paymentMethod}\nNúmero de tarjeta: ${cardNumber}\nFecha de expiración: ${cardExpiry}\nCVC: ${cardCvc}`);
        
        paymentModal.style.display = 'none';
        // Aquí puedes agregar la lógica de pago adicional

         // Limpiar el carrito
         cart.length = 0;
         renderCart();
         paymentModal.style.display = 'none';
    });
});
