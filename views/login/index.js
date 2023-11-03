const emailInput = document.querySelector('#input-correo');
const passwordInput = document.querySelector('#input-password');
const form = document.querySelector('#form');
const imgDepofit = document.querySelector('#img-depofit');
const cart = document.querySelector('#cart');
const articulos = document.querySelector('.carrito-articulos');
const listaArticulos = document.querySelector('#listaArticulos');
const tituloCarrito = document.querySelector('#titulo-carrito');

const numArticulosCarrito = () => {
  let numeroArticulos = listaArticulos.children.length;
  tituloCarrito.innerHTML = `Carrito de compra (${numeroArticulos})`;
  const numeroCarrito = document.querySelector('#span-cart');
  numeroCarrito.innerText = `${numeroArticulos}`
}

numArticulosCarrito()
imgDepofit.addEventListener('click', e => {
  window.location.pathname = `/`
})

cart.addEventListener('click', e => {
  articulos.classList.toggle('cart-activado')
})

form.addEventListener('submit', async e =>{
    e.preventDefault();

    try {
       const credentials ={
        email: emailInput.value,
        password: passwordInput.value
       }
      const {data} = await axios.post('/api/login/', credentials )
      window.location.pathname = `/`;
    } catch (error) {
        const errorText = (error.response.data.error);
        const div = document.createElement('div')
        div.innerHTML = `<div id="div-error">
        <p class="text-center text-red-500 font-bold">Email o contraseña invalida;</p>
    </div>`
        form.appendChild(div)
    }

})


