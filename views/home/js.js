// const menuMobile = document.querySelector('#menu-mobile');
// const menuBar = document.querySelector('#menu-bar');
// const menuIcon = document.querySelector('#menu-icon');

// menuIcon.addEventListener('click', e => {
//     console.log('yes');
//     menuBar.classList.toggle('hidden')
//     menuMobile.classList.toggle('show');
// });


let totalPrecioArticulos = 0
let sliderSection = document.querySelectorAll('.card');
const cart = document.querySelectorAll('#cart');
const precioTotalCarrito = document.querySelector('#precio-total');
const articulos = document.querySelector('.carrito-articulos');
const listaArticulos = document.querySelector('#listaArticulos');
const tituloCarrito = document.querySelector('#titulo-carrito');
const btnRight = document.querySelectorAll('#btn-right');
const btnLeft = document.querySelectorAll('#btn-left');
const btnRegistro = document.querySelector('#btn-registro');
const user = document.querySelector('#user');
const imagenHome = document.querySelector('#img-depofit');
const btnHombre = document.querySelector('#hombres');
const contenedoCardMujeres = document.querySelector('#contenedor-card-mujeres');
const contenedoCardHombres = document.querySelector('#contenedor-card-hombres');
const inputBuscar = document.querySelector('#input');
const inputTelefono = document.querySelector('#input-telefono');
const btnBorrarSugerencias = document.querySelector('#svgBorrarSugerencias');
const btnBuscarSugerencias = document.querySelector('#lupa-telefono');
const svgMenutelefono = document.querySelector('#menu-telefono');
const menuTelefono = document.querySelector('#linksTelefono')

svgMenutelefono.addEventListener('click', e => {
  menuTelefono.classList.toggle('menu-visible');
})

btnBuscarSugerencias.addEventListener('click', e =>{
  const busqueda = document.querySelector('#busqueda-telefono');
  busqueda.classList.add('displayflex');
  busqueda.classList.remove('displaynone');
})

btnBorrarSugerencias.addEventListener('click', e => {
  const busqueda = document.querySelector('#busqueda-telefono')
  busqueda.classList.add('displaynone');
  busqueda.classList.remove('displayflex');
})

cart.forEach(element => {
  element.addEventListener('click', e => {
    articulos.classList.toggle('cart-activado')
  })
});


const numArticulosCarrito = () => {
  let numeroArticulos = listaArticulos.children.length;
  tituloCarrito.innerHTML = `Carrito de compra (${numeroArticulos})`;
  const numeroCarrito = document.querySelector('#span-cart');
  const numeroCarritoTelefono = document.querySelector('#span-cart-telefono');
  numeroCarrito.innerText = `${numeroArticulos}`
  numeroCarritoTelefono.innerText = `${numeroArticulos}`
}

numArticulosCarrito()

const getZapatos = async () => {
  const { data } = await axios.get('/api/zapatos',
    {
      withCredentials: true
    }
  )

  const zapatos = data[0].zapatos


  inputBuscar.addEventListener('input', e => {
    const listaBusqueda = document.querySelector('#ul-busqueda-productos');

    const busqueda = document.querySelector('#busqueda')

    if (e.target.value === '') {
      busqueda.classList.add('displaynone');
      busqueda.classList.remove('displayflex');
    }


    else {
      busqueda.classList.remove('displaynone');


      busqueda.classList.add('displayflex');


      const quitarAcentos = (texto) => {
        return texto
          .normalize("NFD") // Normalizar caracteres a su forma descompuesta
          .replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos y diacríticos
      }


      const filtrarZapatosInput = zapatos.filter(element => {
        const textoFiltrar = quitarAcentos(e.target.value).toLowerCase();

        const palabras = textoFiltrar.split(' ');
      
        const tituloSinAcentos = quitarAcentos(element.titulo).toLowerCase();

        const descripcionSinAcentos = quitarAcentos(element.descripcion).toLowerCase();
        
        return palabras.every(palabra => 
          tituloSinAcentos.includes(palabra) || descripcionSinAcentos.includes(palabra)
        )
        
      })

      console.log(filtrarZapatosInput);

      listaBusqueda.innerHTML = ''

      if (filtrarZapatosInput.length === 0) {
        listaBusqueda.innerHTML = '<li class="sin-resultados">Disculpa, no encontramos ningun resultado.</li>'
      }


      else {
        filtrarZapatosInput.forEach(element => {
          const id = element._id;
          const titulo = element.titulo;
          const img = element.miniatura;
          const marca = element.marca;
          const precio = element.precio;
          const li = document.createElement('li');
          li.id = id
          li.className = 'li-busqueda'
          li.innerHTML = `<div class="img-busqueda">

          <img class="img" src="${img}">

          </div>

         <div class="descripcion-busqueda">

        <p class="busqueda-titulo-gris">${titulo}</p>

         <p class="marca-busqueda">${marca}</p>

        <span class="precio-busqueda">$${precio}.00</span>

        </div>`

          listaBusqueda.appendChild(li)
          li.addEventListener('click', e => {
            const id = li.id
            window.location.pathname = `/productos/all/${id}`
          })
        });
      }
    }


  })

  inputTelefono.addEventListener('input', e => {
    const listaBusqueda = document.querySelector('#ul-busqueda-productos-telefono');
    const busqueda = document.querySelector('#busqueda-telefono')

      busqueda.classList.remove('displaynone');


      busqueda.classList.add('displayflex');


      const quitarAcentos = (texto) => {
        return texto
          .normalize("NFD") // Normalizar caracteres a su forma descompuesta
          .replace(/[\u0300-\u036f]/g, ""); // Eliminar acentos y diacríticos
      }


      const filtrarZapatosInput = zapatos.filter(element => {
        const textoFiltrar = quitarAcentos(e.target.value).toLowerCase();

        const palabras = textoFiltrar.split(' ');
      
        const tituloSinAcentos = quitarAcentos(element.titulo).toLowerCase();

        const descripcionSinAcentos = quitarAcentos(element.descripcion).toLowerCase();
        
        return palabras.every(palabra => 
          tituloSinAcentos.includes(palabra) || descripcionSinAcentos.includes(palabra)
        )
        
      })


      listaBusqueda.innerHTML = ''

      if (filtrarZapatosInput.length === 0) {
        listaBusqueda.innerHTML = '<li class="sin-resultados">Disculpa, no encontramos ningun resultado.</li>'
      }


      else {
        filtrarZapatosInput.forEach(element => {
          const id = element._id;
          const titulo = element.titulo;
          const img = element.miniatura;
          const marca = element.marca;
          const precio = element.precio;
          const li = document.createElement('li');
          li.id = id
          li.className = 'li-busqueda'
          li.innerHTML = `<div class="img-busqueda">

          <img class="img" src="${img}">

          </div>

         <div class="descripcion-busqueda">

        <p class="busqueda-titulo-gris">${titulo}</p>

         <p class="marca-busqueda">${marca}</p>

        <span class="precio-busqueda">$${precio}.00</span>

        </div>`

          listaBusqueda.appendChild(li)
          li.addEventListener('click', e => {
            const id = li.id
            window.location.pathname = `/productos/all/${id}`
          })
        });
      }
    


  })


  document.addEventListener('click', e => {
    if (inputBuscar && inputBuscar.contains(e.target) || busqueda && busqueda.contains(e.target)) {
      console.log('click adentro');
    }
    else {
      busqueda.classList.add('displaynone');
      busqueda.classList.remove('displayflex');
      console.log('click afuera');
    }
  });


  const zapatosMujeres = zapatos.filter(element => element.genero === 'Dama').splice(0, 11)


  const zapatosHombres = zapatos.filter(element => element.genero === 'Caballero').splice(0, 11)



  zapatosMujeres.forEach(element => {
    const div = document.createElement('div')
    div.className = `card`
    div.id = `${element._id}`
    const titulo = element.titulo
    const marca = element.marca
    const precio = element.precio
    const img = element.miniatura
    div.innerHTML = `<img class="img-card" src="${img}" alt="${marca}">
    <h2>${marca}</h2>
    <p>${titulo}</p>
    <span>$${precio}.00</span>`
    contenedoCardMujeres.appendChild(div)
  })



  zapatosHombres.forEach(element => {
    const div = document.createElement('div')
    div.className = `card`
    div.id = `${element._id}`
    const titulo = element.titulo
    const marca = element.marca
    const precio = element.precio
    const img = element.miniatura
    div.innerHTML = `<img class="img-card" src="${img}" alt="${marca}">
    <h2>${marca}</h2>
    <p>${titulo}</p>
    <span>$${precio}.00</span>`
    contenedoCardHombres.appendChild(div)
  })



  const card = document.querySelectorAll('.card')


  card.forEach(element => {
    element.addEventListener('click', e => {
      const id = element.id
      window.location.pathname = `/productos/all/${id}`
    })
  })


}

getZapatos()


const cokiesGet = async () => {
  const { data } = await axios.get('/api/cookies',
      {
          withCredentials: true
      }
  )
  const perfilTelefono = document.querySelector('#perfil-telefono');
  const usuarioValido = data.acessToken
  if (usuarioValido === undefined) {
      console.log('NO ME DA LOS COOKIES');
      user.addEventListener('click', e => {
          window.location.pathname = `/login`
      })
      perfilTelefono.addEventListener('click', e => {
          window.location.pathname = `/login`
      })
  }
  else {
      console.log('SI ME DA LAS COOKIES');
      user.addEventListener('click', e => {
          window.location.pathname = `/perfil`
      })
      perfilTelefono.addEventListener('click', e => {
          window.location.pathname = `/perfil`
      })
  }
}

cokiesGet()


const getCarrito = async () => {
  const { data } = await axios.get('/api/carrito/', {
    withCredentials: true
  })
  console.log(data);
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
getCarrito();


const next = (boton) => {
  let cardFirst = boton.parentElement.parentElement.children[1].children[0];
  let contenedorCard = boton.parentElement.parentElement.children[1];
  contenedorCard.insertAdjacentElement('beforeend', cardFirst)
}

const prev = (boton) => {
  let cardLast = boton.parentElement.parentElement.children[1].children;
  cardLast = cardLast[cardLast.length - 1];
  let contenedorCard = boton.parentElement.parentElement.children[1];
  contenedorCard.insertAdjacentElement('afterbegin', cardLast)
}

btnRight.forEach(boton => {
  boton.addEventListener('click', e => {
    next(boton);
  })
});


btnLeft.forEach(boton => {
  boton.addEventListener('click', e => {
    prev(boton);
  })
});

btnRegistro.addEventListener('click', e => {
  console.log('se');
  console.log(window.location.pathname = '/signup');
})

imagenHome.addEventListener('click', e => {
  window.location.pathname = `/`
})


