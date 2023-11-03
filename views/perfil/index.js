
const articulos = document.querySelector('.carrito-articulos');
const cart = document.querySelector('#cart');
const imgDepofit = document.querySelector('#img-depofit');
const btnSalir = document.querySelector('#btn-salir');
const precioTotalCarrito = document.querySelector('#precio-total');
const tituloCarrito = document.querySelector('#titulo-carrito');
const email = document.querySelector('#email')
const nombre = document.querySelector('#nombre')
let totalPrecioArticulos = 0


btnSalir.addEventListener('click', async e => {
  const { data } = axios.get('/api/logout', {
    withCredentials: true
  })
  window.location.pathname = '/'
})

imgDepofit.addEventListener('click', e => {
  window.location.pathname = `/`
})

cart.addEventListener('click', e => {
    articulos.classList.toggle('cart-activado')
  })


  const numArticulosCarrito = () => {
    let numeroArticulos = listaArticulos.children.length;
    tituloCarrito.innerHTML = `Carrito de compra (${numeroArticulos})`;
    const numeroCarrito = document.querySelector('#span-cart');
    numeroCarrito.innerText = `${numeroArticulos}`
  };
  

  const getCarrito = async () => {
    const { data } = await axios.get('/api/carrito/', {
      withCredentials: true
    })
    data.forEach(element => {
      const cantidad = element.cantidad;
      const talla = element.talla;
      const imagen = element.img;
      const precio = element.precio;
      const titulo = element.titulo;
      const id = element.id
      const li = document.createElement('li')
      li.className = `li`
      li.id = `${id}`
      li.innerHTML = `
          <button class="borrar-articulo">❌</button>
          <div id="imagen-articulo">
            <img class="img" src="${imagen}">
          </div>
          <div id="descripcion-articulo">
            <p id="titulo-articulo">${titulo}</p>
            <p id="precio-articulo">${precio}.00$</p>
            <p id="talla-articulo"><b>Talla:</b> ${talla}</p>
            <p id="cantidad-articulo"><b>Cantidad:</b>${cantidad}</p>
          </div>`
  
      listaArticulos.appendChild(li)
  
      let precioArticulo = parseInt(li.children[2].children[1].innerText.split('$')[0]);
      precioArticulo = cantidad * precioArticulo;
      totalPrecioArticulos = totalPrecioArticulos + precioArticulo
      precioTotalCarrito.innerText = `${totalPrecioArticulos}.00$`
      numArticulosCarrito();
  
      const btnDelete = li.children[0];
      btnDelete.addEventListener('click', async e => {
        const id = e.target.parentElement.id;
        e.target.parentElement.remove();
        totalPrecioArticulos = totalPrecioArticulos - precioArticulo
        precioTotalCarrito.innerText = `${totalPrecioArticulos}.00$`
        numArticulosCarrito();
        console.log(totalPrecioArticulos);
        console.log(id);
        await axios.delete(`/api/carrito/${id}`);
      });
  
    });
  }

  const getUsuario = async () => {
    const { data } = await axios.get('/api/users', {
      withCredentials: true
    })

    nombre.innerText = `${data[0].name.toUpperCase()}`
    email.innerHTML = `${data[0].email}`
  }
  numArticulosCarrito();
  getUsuario();
  getCarrito();