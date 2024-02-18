const emailInput = document.querySelector('#input-correo');
const passwordInput = document.querySelector('#input-password');
const form = document.querySelector('#form');
const imgDepofit = document.querySelector('#img-depofit');
const cart = document.querySelectorAll('#cart');
const articulos = document.querySelector('.carrito-articulos');
const listaArticulos = document.querySelector('#listaArticulos');
const tituloCarrito = document.querySelector('#titulo-carrito');



const inputTelefono = document.querySelector('#input-telefono');
const btnBorrarSugerenciasTLF = document.querySelector('#svgBorrarSugerencias');
const btnBuscarSugerenciasTLF = document.querySelector('#lupa-telefono');
const svgMenutelefono = document.querySelector('#menu-telefono');
const menuTelefono = document.querySelector('#linksTelefono');


svgMenutelefono.addEventListener('click', e => {
  menuTelefono.classList.toggle('menu-visible');
})

btnBuscarSugerenciasTLF.addEventListener('click', e => {
  const busqueda = document.querySelector('#busqueda-telefono');
  busqueda.classList.add('displayflex');
  busqueda.classList.remove('displaynone');
})

btnBorrarSugerenciasTLF.addEventListener('click', e => {
  const busqueda = document.querySelector('#busqueda-telefono')
  busqueda.classList.add('displaynone');
  busqueda.classList.remove('displayflex');
})

const numArticulosCarrito = () => {
  let numeroArticulos = listaArticulos.children.length;
  tituloCarrito.innerHTML = `Carrito de compra (${numeroArticulos})`;
  const numeroCarrito = document.querySelector('#span-cart');
  const numeroCarritoTelefono = document.querySelector('#span-cart-telefono');
  numeroCarrito.innerText = `${numeroArticulos}`
  numeroCarritoTelefono.innerText = `${numeroArticulos}`
};

numArticulosCarrito()
imgDepofit.addEventListener('click', e => {
  window.location.pathname = `/`
})

cart.forEach(element => {
  element.addEventListener('click', e => {
    articulos.classList.toggle('cart-activado')
  })
});


form.addEventListener('submit', async e => {
  e.preventDefault();

  try {
    const credentials = {
      email: emailInput.value,
      password: passwordInput.value
    }
    const { data } = await axios.post('/api/login/', credentials)
    
    if (data.email === 'dibzz456@gmail.com') {
      window.location.pathname = `/admin`;
    }
    else{
      window.location.pathname = `/`;
    }
   
  } catch (error) {
    
    const errorText = (error.response.data.error);
    document.querySelector('#form #errorMensaje').innerText = `${errorText}`
  }

})


