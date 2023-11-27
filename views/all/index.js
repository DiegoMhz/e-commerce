
// logoutBtn.addEventListener('click', async e => {
// window.location.pathname = '/';
// });





// const getTodos = async () => {
// 	const { data } = await axios.get('/api/todos', {
// 		withCredentials: true
// 	})
//     }
//     getTodos();


//         const addTodo = async () => {
//             const { data } = await axios.post('/api/todos', {text: nombre,
//                 telefono: telefono}, {
//                 withCredentials: true
//             })
//             const listItem = document.createElement('div');
//             listItem.classList.add('div')
//             listItem.innerHTML = `
//             <li id=${data.id}>
//             ${data.text} ${data.telefono} <button class="delete">❌</button>
//             <button class="edit">EDIT</button>
//             </li>
//      `;


//             }
//     addTodo();



const inputPrecio = document.querySelector('#input-precio');
const cart = document.querySelectorAll('#cart');
const articulos = document.querySelector('.carrito-articulos');
const listaArticulos = document.querySelector('#listaArticulos');
const tituloCarrito = document.querySelector('#titulo-carrito');
const precioTotalCarrito = document.querySelector('#precio-total');
const btnBorrar = document.querySelectorAll('.borrar-articulo');
const contenedorProductos = document.querySelector('#contenedor-productos');
const user = document.querySelector('#user');
const selectTipoDeProducto = document.querySelectorAll('#select-tipoDeProducto');
const selectMarca = document.querySelectorAll('#select-marcas');
console.log(selectMarca, selectTipoDeProducto);
const btnMenuRemove = document.querySelector('#menu-remove');
const btnAgregarCarrito = document.querySelector('#btn-agregar');
const inputTipoDeProducto = document.querySelectorAll('.input-tipoDeProdcuto');
const imgDepofit = document.querySelector('#img-depofit');
const inputBuscar = document.querySelector('#input');


let totalPrecioArticulos = 0

// TELEFONO

const inputTelefono = document.querySelector('#input-telefono');
const btnBorrarSugerenciasTLF = document.querySelector('#svgBorrarSugerencias');
const btnBuscarSugerenciasTLF = document.querySelector('#lupa-telefono');
const svgMenutelefono = document.querySelector('#menu-telefono');
const menuTelefono = document.querySelector('#linksTelefono');
const btnMostrarFiltroTlf = document.querySelector('#svgfiltroTelefono');
const btnCerrarFiltroTLF = document.querySelector('#btnCerrarFiltro');


btnCerrarFiltroTLF.addEventListener('click', e => {
  const menuFiltro = document.querySelector('#div-filtro-telefono');
  menuFiltro.classList.remove('displayflex');
  menuFiltro.classList.add('displaynone');
})

btnMostrarFiltroTlf.addEventListener('click', e => {
  const menuFiltro = document.querySelector('#div-filtro-telefono');
  menuFiltro.classList.add('displayflex');
  menuFiltro.classList.remove('displaynone');
})

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



imgDepofit.addEventListener('click', e => {
  window.location.pathname = '/'
})




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



const filtros = {
  marca: 'todos',
  minPrecio: 0,
  categoria: 'todos'
}



const filtrarProdcutos = (productos) => {
  const productosFiltrados = productos.filter(producto => {
    if (producto.precio >= filtros.minPrecio && (filtros.marca === 'todos' || producto.marca === filtros.marca) &&
      (filtros.categoria === 'todos' || producto.categoria === filtros.categoria)) {
      return producto
    }
  })

  contenedorProductos.innerHTML = ''
  productosFiltrados.forEach(element => {
    const tituloCard = element.titulo;
    const imgCard = element.miniatura;
    const marcaCard = element.marca;
    const precioCard = element.precio;

    const div = document.createElement('div')
    div.className = `card ${marcaCard}`
    div.id = element._id
    div.innerHTML = `
    <div class="div-img">
      <img class="img-card"
        src="${imgCard}"
        alt="Nike">
    </div>
    <div class="descripcion-card">
      <h2>${marcaCard}</h2>
      <p>${tituloCard}</p>
      <span>$${precioCard}.00</span>
    </div>
    <div class="div-svg-card">
      <svg class="svg-card" id="svg-previsualizar" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
        fill-rule="nonzero" />
      </svg>
    </div>
  `
    contenedorProductos.appendChild(div)
  });
  cartaSeleccionada(productosFiltrados);
}



const getZapatos = async () => {
  const { data } = await axios.get('/api/zapatos',
    {
      withCredentials: true
    }
  )

  const zapatos = data[0].zapatos


  zapatos.forEach(element => {
    const tituloCard = element.titulo;
    const imgCard = element.miniatura;
    const marcaCard = element.marca;
    const precioCard = element.precio;

    const div = document.createElement('div')
    div.className = `card ${marcaCard}`
    div.id = element._id
    div.innerHTML = `
      <div class="div-img">
        <img class="img-card"
          src="${imgCard}"
          alt="Nike">
      </div>
      <div class="descripcion-card">
        <h2>${marcaCard}</h2>
        <p>${tituloCard}</p>
        <span>$${precioCard}.00</span>
      </div>
      <div class="div-svg-card">
        <svg class="svg-card" id="svg-previsualizar" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2"
          viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            d="m11.998 5c-4.078 0-7.742 3.093-9.853 6.483-.096.159-.145.338-.145.517s.048.358.144.517c2.112 3.39 5.776 6.483 9.854 6.483 4.143 0 7.796-3.09 9.864-6.493.092-.156.138-.332.138-.507s-.046-.351-.138-.507c-2.068-3.403-5.721-6.493-9.864-6.493zm8.413 7c-1.837 2.878-4.897 5.5-8.413 5.5-3.465 0-6.532-2.632-8.404-5.5 1.871-2.868 4.939-5.5 8.404-5.5 3.518 0 6.579 2.624 8.413 5.5zm-8.411-4c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm0 1.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"
          fill-rule="nonzero" />
        </svg>
      </div>
    `
    contenedorProductos.appendChild(div)
  });

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


  selectTipoDeProducto.forEach(element => {
    element.addEventListener('input', e => {
      const value = e.target.value
      filtros.categoria = `${value}`
      filtrarProdcutos(zapatos)
    })
  });

  selectMarca.forEach(element => {
    element.addEventListener('input', e => {
      const value = e.target.value
      filtros.marca = `${value}`
      filtrarProdcutos(zapatos)
    })
  });

  cartaSeleccionada(zapatos)

  // buscar.addEventListener('click', async e => {
  //   await axios.delete(`/api/zapatos/65030ef41e52b935d702e7dd`)
  // })
}



const agregarArray = async () => {
  const { data } = await axios.post('/api/zapatos', {
    zapatos: array
  },
    {
      withCredentials: true
    }
  )
  console.log(data);
}



const cartaSeleccionada = async (arrayZapatos) => {
  const svgCard = document.querySelectorAll('.div-svg-card');
  const imgCard = document.querySelectorAll('.img-card');
  imgCard.forEach(imagen => {
    imagen.addEventListener('click', e => {
      const idZapato = e.target.parentElement.parentElement.id
      window.location.pathname = `/productos/all/${idZapato}`
    })
  });

  svgCard.forEach(element => {
    element.addEventListener('click', e => {
      const value = element.parentElement.id
      const zapatoFilter = arrayZapatos.filter(zapatos => zapatos._id.toLocaleLowerCase().startsWith(value.toLocaleLowerCase()));
      const menuCard = document.querySelector('.menu-card')
      const titulo = zapatoFilter[0].titulo
      const imagen = zapatoFilter[0].miniatura
      const marca = zapatoFilter[0].marca
      const precio = zapatoFilter[0].precio
      const descripcion = zapatoFilter[0].descripcion
      menuCard.classList.add('menu-activo');
      menuCard.innerHTML = `<div id="menu-contenedor">
    <div id="div-remove">
      <button id="menu-remove">X</button>
    </div>
    <div id="menu-img">
      <div id="div-img">
        <img class="img" src="${imagen}">
      </div>
    </div>
    <div id="menu-descripcion">
      <h1 id="menu-titulo">${titulo}</h1>
      <span id="menu-marca">${marca}</span>
      <p id="menu-parrafo">${descripcion.split('.')[0]}${descripcion.split('.')[1]}${descripcion.split('.')[2]}${descripcion.split('.')[3]}...</p>
      <span id="menu-precio">$${precio}.00</span>
      <div id="menu-talla">
      <p>Talla</p>
        <div id="div-tallas">
          <button class="btn-tallas">8</button>
          <button class="btn-tallas">8.5</button>
          <button class="btn-tallas">9</button>
          <button class="btn-tallas">9.5</button>
          <button class="btn-tallas">10</button>
          <button class="btn-tallas">10.5</button>
          <button class="btn-tallas">11</button>
        </div>
        <div id="div-boton-numero">
        <div id="div-btn-suma">
            <button id="btn-resta">
                <svg class="svg-resta" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round"
                    stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                        fill-rule="nonzero" />
                </svg>
            </button>
        </div>
        <input type="text" disabled value="1" id="input-numero">
        <div id="div-btn-suma">
            <button id="btn-suma">
                <svg class="svg-suma" clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round"
                    stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
                        fill-rule="nonzero" />
                </svg>
            </button>
        </div>
    </div>
    </div>
    <div id="div-btn-agregar">
      <button id="btn-agregar">Agregar a carrito</button>
    </div>
    </div>
    </div>`

      const btnTallas = document.querySelectorAll('.btn-tallas');
      const btnMenuRemove = document.querySelector('#menu-remove');
      const btnAgregarCarrito = document.querySelector('#btn-agregar');
      const btnSuma = document.querySelector('#btn-suma');
      const btnResta = document.querySelector('#btn-resta');
      const inputNumero = document.querySelector('#input-numero');
      let numeroDeArticulos = 1

      btnTallas.forEach(element => {
        element.addEventListener('click', e => {
          talla = element.innerHTML
          console.log(element.parentElement.classList.length === 0);
          if (element.parentElement.classList.length === 0) {
            element.parentElement.classList.add('seleccionandoTallas');
            e.target.classList.add('tallaSeleccionada');
            console.log('Entra AQUI');
          }
          else {
            const tallaSeleccionada = document.querySelector('.tallaSeleccionada');
            tallaSeleccionada.classList.remove('tallaSeleccionada');
            e.target.classList.add('tallaSeleccionada');
          }
        })
      })

      btnMenuRemove.addEventListener('click', e => {
        menuCard.classList.remove('menu-activo');
      })

      btnAgregarCarrito.addEventListener('click', e => {
        let talla = document.querySelector('.tallaSeleccionada')
        talla = talla.innerText
        agregarCarrito(titulo, precio, imagen, talla);
      });

      btnSuma.addEventListener('click', e => {
        numeroDeArticulos = numeroDeArticulos + 1
        inputNumero.value = numeroDeArticulos
        if (inputNumero.value === '1') {
          btnResta.disabled = true;
        }
        else {
          btnResta.disabled = false;
        }
      })

      btnResta.addEventListener('click', e => {
        numeroDeArticulos = numeroDeArticulos - 1
        inputNumero.value = numeroDeArticulos
        if (inputNumero.value === '1') {
          btnResta.disabled = true;
        }
        else {
          btnResta.disabled = false;
        }
      })

      if (inputNumero.value === '1') {
        btnResta.disabled = true;
      }
      else {
        btnResta.disabled = false;
      }

    })
  });
}



const numArticulosCarrito = () => {
  let numeroArticulos = listaArticulos.children.length;
  tituloCarrito.innerHTML = `Carrito de compra (${numeroArticulos})`;
  const numeroCarrito = document.querySelector('#span-cart');
  const numeroCarritoTelefono = document.querySelector('#span-cart-telefono');
  numeroCarrito.innerText = `${numeroArticulos}`
  numeroCarritoTelefono.innerText = `${numeroArticulos}`
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



const agregarCarrito = async (titulo, precio, imagen, talla) => {
  const cookies = await axios.get('/api/cookies',
    {
      withCredentials: true
    }
  )
  if (cookies.data.acessToken === undefined) {
    alert('TIENES QUE INICIAR SESION PARA PODER INGRESAR ARTICULOS AL CARRITO')
  }
  else {
    const inputCantidad = document.querySelector('#input-numero');
    const cantidad = parseInt(inputCantidad.value)
    const { data } = await axios.post('/api/carrito', {
      titulo: titulo,
      precio: precio,
      img: imagen,
      talla: talla,
      cantidad: cantidad,
    },
      {
        withCredentials: true
      }
    )
    console.log(data);
    const li = document.createElement('li')
    li.className = `li`
    li.id = `${data.id}`
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

    listaArticulos.prepend(li)

    let precioArticulo = parseInt(li.children[2].children[1].innerText.split('$')[0]);
    precioArticulo = parseInt(inputCantidad.value * precioArticulo);
    totalPrecioArticulos = totalPrecioArticulos + precioArticulo
    precioTotalCarrito.innerText = `${totalPrecioArticulos}.00$`
    numArticulosCarrito();

    const btnDelete = li.children[0];
    btnDelete.addEventListener('click', async e => {
      e.target.parentElement.remove();
      const id = e.target.parentElement.id
      console.log(id);
      totalPrecioArticulos = totalPrecioArticulos - precioArticulo
      precioTotalCarrito.innerText = `${totalPrecioArticulos}.00$`
      numArticulosCarrito();
      console.log(totalPrecioArticulos);
      await axios.delete(`/api/carrito/${id}`)
    });
  }
}



const array = [
  {
    titulo: 'Zapatos de Basquetbol para Caballero MC Trainer 2',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DM1124-004. Características:  Mejora tu juego y tu estilo de básquetbol. Cargado con la amortiguación Max Air en el talón, este zapato liviano y seguro lo ayuda a despegar con confianza y aterrizar cómodamente.  Además, la goma envuelve los costados para mayor durabilidad y estabilidad. Una unidad Max Air en el talón brinda amortiguación donde se necesita.  El acolchado en el talón y la lengüeta se suma a la sensación de suavidad. La tracción en espiga en la suela ayuda a controlar tus movimientos y a mantener el terreno.  Los recortes en forma de diamante exponen la espuma y ayudan a reducir el peso.  La piel de los dedos añade durabilidad. La base del antepié agrega estabilidad. La malla es ligera y semitransparente.',
    precio: 123.00,
    miniatura: 'http://depofit.com/cdn/shop/products/Myproject-1_5_7c5ffef6-9fa8-4ceb-b74a-abd75e7cb686_1024x1024.png?v=1673896873',
    categoria: 'Zapatos Basquetbol',
    descuento: 0,
    stock: 50,
    genero: 'Hombre'
  },
  {
    titulo: 'Zapatos de Básquetbol para Caballero KD Trey 5 X',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DD9538-011. Características:  Prepárate para cada partido con los zapatos de básquetbol Nike KD Trey 5 X, creados para ti, con una correa segura en el mediopié para asegurarte en cada movimiento y bloqueo en el duelo. Cuenta con una elaboración de material ultra resistente. Tiene un sistema de amarre de pasadores y lengüeta para tu comodidad y confort. Suela hecha de goma aporta una excelente tracción y amortiguación. Cuentan con la tecnología Zoom Air que aporta mucha flexibilidad y amortiguación, devolviendo la energía para apoyarte en tus saltos y pisadas. Media suela Nike Zoom de espuma ligera y suave que absorbe el impacto convirtiéndolo en un impulso para tu próxima pisada. Unidad Zoom Air para una amortiguación eficaz. Logotipo al frente. Sistema de ajuste con cordones. Malla estratégicamente colocada para dar ventilación donde más se necesita.',
    precio: 130.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Myproject-1_e8c1e8ba-aa19-4d2f-9c73-04ad2aef7486_540x.png?v=1682919649',
    categoria: 'Zapatos Basquetbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Básquetbol para Caballero Kyrie Flytrap 6',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DM1125-800. Características:  Deslumbra a todos con tus movimientos en la cancha con estos zapatos para básquetbol Nike Kyrie Flytrap 6, inspirados en el Point Guard de los Brooklyn Nets, Kyrie Irving. Está construido para apoyar en movimientos rápidos e intrépidos. Materiales sintéticos superresistentes. La espuma en la suela ayuda a tener un mejor manejo del balance en las jugadas intensas y decisivas. La tela del calzado es ligera, pero muy resistente y en conjunto con la suela de goma y la tecnología Zoom Air, hacen equipo para ofrecer una excelente tracción para todas las asistencias y cortes. Lengüeta para mayor comodidad. Suela de goma para mayor durabilidad y tracción sobre la superficie. Unidad Zoom Air para una amortiguación eficaz. Logotipo al frente. Malla estratégicamente colocada para dar ventilación donde más se necesita.',
    precio: 130.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Myproject-1_7e66788a-f0a2-4ea2-8d1d-d86f50411b13_540x.png?v=1682919648',
    categoria: 'Zapatos Basquetbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Básquetbol para Caballero Lebron Witness 7',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DM1123-003. Características:  Los Nike LeBron Witness 7 te brindarán el máximo balance y rendimiento en cualquier cancha y la mayor comodidad para tus partidos y entrenamientos intensos. Cuentan con una construcción de materiales sintéticos muy resistentes a las caídas, roces y saltos, además de una malla duradera y transpirable. Suela hecha de goma y la Unidad Zoom Air, esto ayudará a elevarte con seguridad y destreza. Suela de goma para mayor durabilidad y tracción sobre la superficie. Suela de goma de alta resistencia a la abrasión. Malla estratégicamente colocada para dar ventilación donde más se necesita.  Sistema de ajuste con trenzas. Lengüeta para mayor comodidad. Unidad Zoom Air para una amortiguación eficaz.',
    precio: 123.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/NIKE-1_aaab0695-5c45-4377-9711-1d97ac99ebdc_540x.png?v=1683512398',
    categoria: 'Zapatos Basquetbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Básquetbol para Caballero Lebron Witness 7',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DM1123-004. Características:  Los Nike LeBron Witness 7 te brindarán el máximo balance y rendimiento en cualquier cancha y la mayor comodidad para tus partidos y entrenamientos intensos. Cuentan con una construcción de materiales sintéticos muy resistentes a las caídas, roces y saltos, además de una malla duradera y transpirable. Suela hecha de goma y la Unidad Zoom Air, esto ayudará a elevarte con seguridad y destreza. Suela de goma para mayor durabilidad y tracción sobre la superficie. Suela de goma de alta resistencia a la abrasión. Malla estratégicamente colocada para dar ventilación donde más se necesita.  Sistema de ajuste con trenzas. Lengüeta para mayor comodidad. Unidad Zoom Air para una amortiguación eficaz.',
    precio: 134.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Myproject-1_0a811382-960f-4b88-82ea-729bb1e59bb4_540x.png?v=1682919650',
    categoria: 'Zapatos Basquetbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Básquetbol para Caballero Precision 6',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DD9535-002. Características:  Muestra la intensidad que llevas dentro con los zapatos para básquetbol Nike Precision 6, creados y probados para tu rendimiento. Agarre eficaz en pistas limpias. Extremadamente cómodo. Base ancha y estable. Bloqueo de pie confiable. Agradable sensación de corte. Fiel al tamaño. Transición suave del talón a la punta. Totalmente ligero.',
    precio: 134.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Myproject-1_1_d6a12f81-6ecf-478a-8053-a281f2aac06a_540x.png?v=1685370337',
    categoria: 'Zapatos Basquetbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Atalanta',
    marca: 'Lotto',
    descripcion: 'Zapatos de fútbol para grama artifical.  Tiene media suela de eva que permite tener mayor comodidad durante el juego y mayor amortiguación, lo que genera al usarlos mayor ligereza, flexibilidad y elasticidad, permitiéndole un mejor desempeño dentro de la cancha. Para deportistas junior y pro de cualquier disciplina. Dirigidos a un usuario con capacidades físicas y con evolución a buscar mejoras en cada una de las áreas.',
    precio: 70.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/Myproject-1_d441f508-b551-4b61-be43-4047c072a929_540x.png?v=1688743663',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Atalanta',
    marca: 'Lotto',
    descripcion: 'Marca: Lotto. Modelo: LO-ATALANTA/TPU-H8.  Características:  Zapatos de fútbol para grama artifical.  Tiene media suela de eva que permite tener mayor comodidad durante el juego y mayor amortiguación, lo que genera al usarlos mayor ligereza, flexibilidad y elasticidad, permitiéndole un mejor desempeño dentro de la cancha. Para deportistas junior y pro de cualquier disciplina. Dirigidos a un usuario con capacidades físicas y con evolución a buscar mejoras en cada una de las áreas.',
    precio: 63.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_1_3773d6a2-3374-4058-b794-056e2941f083_540x.png?v=1688740715',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Atalanta',
    marca: 'Lotto',
    descripcion: 'Marca: Lotto. Modelo: LO-ATALANTA/HGE-H7.  Características:  Zapatos de fútbol para grama artificial.  El modelo Atalanta se distinga por tener una superficie texturizada, y unos tacos que le dan un mejor agarre y comodidad para que la des toda en la cancha. Su diseño presenta un clásico ajuste de trenzas ergonómica que permiten un ajuste ideal sin temor a incomodidades o situaciones adversas.    Para deportistas junior y pro de cualquier disciplina. Dirigidos a un usuario con capacidades físicas y con evolución a buscar mejoras en cada una de las áreas.',
    precio: 70.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_a182942e-9955-40df-9f9e-3541aa1e1625_540x.png?v=1688673446',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Beluna',
    marca: 'Lotto',
    descripcion: 'Marca: Lotto.  Modelo: LO-BELUNA/INE-H9. Características:  Zapatos ideales para fútbol sala. Tiene media suela de eva que permite tener mayor comodidad durante el juego y mayor amortiguación, lo que genera al usarlos mayor ligereza, flexibilidad y elasticidad, permitiéndole un mejor desempeño dentro de la cancha. Para deportistas junior y pro de cualquier disciplina. Dirigidos a un usuario con capacidades físicas y con evolución a buscar mejoras en cada una de las áreas.',
    precio: 63.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_eb2ef929-903e-4a7b-a597-99b69a34e61a_540x.png?v=1688741786',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Beluna',
    marca: 'Lotto',
    descripcion: 'Marca: Lotto.  Modelo: LO-BELUNA/INE-H9. Características:  Zapatos ideales para fútbol sala. Tiene media suela de eva que permite tener mayor comodidad durante el juego y mayor amortiguación, lo que genera al usarlos mayor ligereza, flexibilidad y elasticidad, permitiéndole un mejor desempeño dentro de la cancha. Para deportistas junior y pro de cualquier disciplina. Dirigidos a un usuario con capacidades físicas y con evolución a buscar mejoras en cada una de las áreas.',
    precio: 70.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/Myproject-1_1_1543c35f-0533-4042-9865-4698b55866e0_540x.png?v=1688748952',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Estadio',
    marca: 'Lotto',
    descripcion: 'Marca: Lotto. Modelo: LO-ESTADIO/HGE-H4. Características: Zapatos de fútbol para grama artifical. Tiene media suela de eva que permite tener mayor comodidad durante el juego y mayor amortiguación, lo que genera al usarlos mayor ligereza, flexibilidad y elasticidad, permitiéndole un mejor desempeño dentro de la cancha. Tiene tapones de goma proporciona tracción en superficies sintéticas. Para deportistas junior y pro de cualquier disciplina. Dirigidos a un usuario con capacidades físicas y con evolución a buscar mejoras en cada una de las áreas.',
    precio: 70.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_1_b8f139fc-a34e-441f-8e6a-182c95859b53_540x.png?v=1688742469',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Kraken',
    marca: 'Lotto',
    descripcion: 'Marca: Lotto. Modelo: LO-KRAKEN/INE-H3. Características: Zapatos ideales para fútbol sala. Tiene media suela de eva que permite tener mayor comodidad durante el juego y mayor amortiguación, lo que genera al usarlos mayor ligereza, flexibilidad y elasticidad, permitiéndole un mejor desempeño dentro de la cancha. Para deportistas junior y pro de cualquier disciplina. Dirigidos a un usuario con capacidades físicas y con evolución a buscar mejoras en cada una de las áreas.',
    precio: 63.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_25094f33-126e-45c5-9538-a5f555732423_540x.png?v=1688671950',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Liggero',
    marca: 'Lotto',
    descripcion: 'Marca: Lotto. Modelo: LO-LIGGERO/HGE-H2.  Características:  Zapatos de fútbol para grama artificial. El modelo Atalanta se distinga por tener una superficie texturizada, y unos tacos que le dan un mejor agarre y comodidad para que la des toda en la cancha. Su diseño presenta un clásico ajuste de trenzas ergonómica que permiten un ajuste ideal sin temor a incomodidades o situaciones adversas.    Para deportistas junior y pro de cualquier disciplina. Dirigidos a un usuario con capacidades físicas y con evolución a buscar mejoras en cada una de las áreas.',
    precio: 70.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_6b3feec6-44df-46ed-bb98-8ff0308d256d_540x.png?v=1688748639',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Mercurial Vapor 15 Club IC',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DJ5969-600. Características: Zapatos de fútbol para canchas interiores. El terreno de juego es tuyo cuando te atas en el Mercurial Vapor 15 Club. La jaula de velocidad dentro de la estructura está hecha de un material delgado pero fuerte que asegura el pie a la suela exterior sin agregar peso adicional para un bloqueo óptimo. Según el análisis de Nike Sports Research Lab de los movimientos de los jugadores, la suela exterior de goma está diseñada para brindar tracción multidireccional en la calle, la cancha y las superficies cubiertas. Un diseño rehecho mejora el ajuste, de modo que simula mejor el pie. Realizado con múltiples pruebas de desgaste en cientos de atletas, el resultado es una puntera más contorneada y una mejor sujeción en el talón. Una parte superior sintética moldeada tiene un patrón texturizado en la parte superior para un mejor control del balón cuando se dribla a altas velocidades. Para uso en canchas y superficies interiores. Plantilla acolchada.',
    precio: 91.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFITCOM_2_6b96c83a-0bee-42a1-9c52-457005baceea_540x.png?v=1697733512',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Mercurial Vapor 15 Club IC',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DJ5969-001. Características: Zapatos de fútbol para canchas interiores. El terreno de juego es tuyo cuando te atas en el Mercurial Vapor 15 Club. La jaula de velocidad dentro de la estructura está hecha de un material delgado pero fuerte que asegura el pie a la suela exterior sin agregar peso adicional para un bloqueo óptimo. Según el análisis de Nike Sports Research Lab de los movimientos de los jugadores, la suela exterior de goma está diseñada para brindar tracción multidireccional en la calle, la cancha y las superficies cubiertas. Un diseño rehecho mejora el ajuste, de modo que simula mejor el pie. Realizado con múltiples pruebas de desgaste en cientos de atletas, el resultado es una puntera más contorneada y una mejor sujeción en el talón. Una parte superior sintética moldeada tiene un patrón texturizado en la parte superior para un mejor control del balón cuando se dribla a altas velocidades. Para uso en canchas y superficies interiores. Plantilla acolchada.',
    precio: 91.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Myproject-1_2_c2a0c47b-7e4e-4016-a7b8-979afe07eb85_540x.png?v=1697733490',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Zoom Mercurial Vapor 15 Academy XXV MG',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: FB8399-060. Características: Zapatos de fútbol para terrenos múltiples. Rinde homenaje al 25 aniversario de uno de los calzados más rápidos jamás creados con el Vapor 15 Academy XXV. Sensación elástica en la planta del pie. El exclusivo patrón de tracción ofrece la máxima tracción con una liberación rápida para crear distancia. Un diseño renovado que mejora el ajuste para adaptarse mejor al pie. La parte superior cuenta con NikeSkin, un material de malla suave y flexible unido por un revestimiento delgado. La estructura speed cage interior está confeccionada con un material fino y resistente que sujeta el pie a la suela sin agregar peso adicional. Los logotipos Swoosh están inspirados en las posiciones originales de los primeros modelos. Plantilla acolchada.',
    precio: 126.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_2_a48c645a-4eac-4548-89fb-4eaf81473c9c_540x.png?v=1697733675',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Fútbol para Caballero Tiempo Legend 9 Academy TF',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo:DA1191-001. Características: Zapatos de fútbol para grama artificial. Nike Tiempo Legend 9 Academy TF, una de las Tiempo más ligeras hasta la fecha, permiten atacar con un diseño de perfil bajo renovado. La parte superior cuenta con texturas en relieve en la zona de impacto para regatear, pasar y lanzar a puerta con precisión, y la suela de goma refuerza la tracción al jugar sobre moqueta o grama artificial - Turf. Cómodo forro que envuelve el pie para ofrecer un ajuste natural y ceñido. La parte superior de piel reforzada con almohadillas de espuma suave aporta precisión para tus tiros. Para superficies sintéticas de tamaño reducido. Suela exterior que no deja marcas.',
    precio: 111.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Myproject-1_1_8f9329c0-6d59-4cea-9947-0a5fb62245c0_540x.png?v=1697733636',
    categoria: 'Zapatos Futbol',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Tenis para Caballero Challenger 13 Novak Pack',
    marca: 'Asics',
    descripcion: 'Marca: Asics. Modelo:1041A397.960. Características: El zapato de tenis GEL-CHALLENGER™ 13 de la serie NOVAK Pack nos recuerda la importancia del espíritu de equipo y de superación. La parte superior de la zapatilla aporta sujeción y mantiene tus pies firmes en la plataforma de los zapatos. Aportan una sensación de refuerzo durante las voleas o cuando golpeas desde el fondo. La tecnología WINGWALL™ en el lateral mejora la estabilidad durante los movimientos laterales. Esta característica ofrece una sujeción óptima para que puedas entrar en el tiro y golpear la pelota con más velocidad.',
    precio: 127.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_0fbe46e1-5a6b-4178-b08f-4fdaaca715d7_540x.png?v=1689596848',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Tenis para Caballero Court Air Zoom Vapor Pro 2',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo:DV3278-103. Características: Este diseño está más cerca de la cancha, lo que le brinda una increíble sensación de ligereza en la cancha para ráfagas de movimientos rápidos. La malla duradera y reforzada ayuda a mantener los pies frescos y agrega soporte adicional. La funda interna elástica envuelve el pie para brindar un ajuste similar al de una media. La suela exterior en espiga utiliza un diseño basado en datos para crear un agarre óptimo sin afectar su capacidad de deslizamiento. Sin la goma en las áreas de bajo desgaste para ayudar a mantener el peso al mínimo. El marco de pie de largo completo en el exterior del zapato ayuda a estabilizar el pie durante los cortes rápidos. Diseñado para superficies de canchas duras. Cuello de malla.',
    precio: 168.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFITCOM_23fd0427-9121-4136-9ef3-f50deafa4fb4_540x.png?v=1694543634',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Tenis para Caballero Court Air Zoom Vapor Pro 2',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo:DR6191-004. Características: Este diseño está más cerca de la cancha, lo que le brinda una increíble sensación de ligereza en la cancha para ráfagas de movimientos rápidos. La malla duradera y reforzada ayuda a mantener los pies frescos y agrega soporte adicional. La funda interna elástica envuelve el pie para brindar un ajuste similar al de una media. La suela exterior en espiga utiliza un diseño basado en datos para crear un agarre óptimo sin afectar su capacidad de deslizamiento. Sin la goma en las áreas de bajo desgaste para ayudar a mantener el peso al mínimo. El marco de pie de largo completo en el exterior del zapato ayuda a estabilizar el pie durante los cortes rápidos. Diseñado para superficies de canchas duras. Cuello de malla.',
    precio: 168.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/NIKE-1_d263da9d-d89e-4d26-b692-7cd9bb9eb3f5_540x.png?v=1683512399',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Tenis para Caballero Court Air Zoom Vapor Pro 2',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo:DR6191-001. Características: Este diseño está más cerca de la cancha, lo que le brinda una increíble sensación de ligereza en la cancha para ráfagas de movimientos rápidos. La malla duradera y reforzada ayuda a mantener los pies frescos y agrega soporte adicional. La funda interna elástica envuelve el pie para brindar un ajuste similar al de una media. La suela exterior en espiga utiliza un diseño basado en datos para crear un agarre óptimo sin afectar su capacidad de deslizamiento. Sin la goma en las áreas de bajo desgaste para ayudar a mantener el peso al mínimo. El marco de pie de largo completo en el exterior del zapato ayuda a estabilizar el pie durante los cortes rápidos. Diseñado para superficies de canchas duras. Cuello de malla.',
    precio: 168.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Nike-1_18629e83-762d-494f-98ea-73a69cff63ba_540x.png?v=1682920106',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Tenis para Caballero Court Vapor Lite',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DC3432-125, DC3432-005, DC3432-111 y DC3432-400. Características: Como un auto de carreras, el NikeCourt Vapor Lite mantiene la mayoría de sus características debajo del capó. Su exclusivo sistema de amortiguación está diseñado para ayudarlo a llegar a la pelota lo más rápido posible. Una correa innovadora de 4 puntos se inspira en los autos de carreras. Arneses para ayudar a mantener su pie bloqueado durante sus partidos más feroces. Todo en un diseño ligero y transpirable que es increíblemente cómodo. La malla extra duradera respira para ayudar a mantener los pies frescos. Una capa de goma moldeada en el lado medial ayuda a evitar el desgaste por arrastre de los dedos. La espuma suave se coloca cerca del arco para que sea más fácil alinear el tobillo con el pie mientras se inclina. La espuma más dura a lo largo de la parte exterior del pie lo ayuda a empujar durante los movimientos rápidos para que pueda llegar a la pelota lo más rápido posible. Diseñado para usar en superficies de canchas duras. Plantilla removible.',
    precio: 119.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Disenosintitulo_2__ccexpress_af661743-b033-4e82-a88a-b779718c3f4c_540x.png?v=1682918733',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Tenis para Caballero Gel Resolution 9',
    marca: 'Asics',
    descripcion: 'Marca: Asics. Modelo:1041A330.400. Características: El zapato de tenis GEL-RESOLUTION® 9 crea una estabilidad y amortiguación avanzadas para los jugadores a los que les gusta controlar el juego desde la línea de fondo. La tecnología DYNAWALL™ en la entresuela ahora se extiende hacia el talón para mayor estabilidad durante los movimientos laterales. La tecnología DYNAWRAP™ en el ojal se ha rediseñado estratégicamente para aplicar presión cuando se necesita soporte adicional. La suela exterior de largo completo y el talón separado ayudan a producir un aterrizaje más estable para recuperaciones más rápidas entre tiros.',
    precio: 177.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/ASICS-1_1_b57f1821-8a0e-46d2-9f3e-091c8b5d1528_540x.png?v=1683512337',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Tenis para Caballero Vapor Lite 2',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: FD6691-001. Características: Zapatos de tenis para cancha dura. Sencillo, pero elegante. Sutil pero lleno de jugabilidad, velocidad y soporte. Sistema de espuma suave de dos niveles. La malla extraduradera mantiene los pies frescos. El revestimiento de goma moldeada en el frente del calzado agrega durabilidad. La espuma suave cerca del arco permite alinear el tobillo con el pie más fácilmente cuando se inclina. La espuma más dura de la parte exterior te impulsa en los movimientos más rápidos, tanto si juegas al tenis como si lo tuyo es el pickleball. La suela de espiguilla usa un diseño basado en datos para crear un agarre sin afectar tu capacidad de moverte. Rinde homenaje a algunos de los mejores diseños de la línea Vapor. La goma se eliminó en las áreas de menor desgaste para reducir el peso. La estructura de largo completo en el exterior ayuda a estabilizar el pie durante los cortes rápidos.',
    precio: 116.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT_fc2921e9-6bf6-4beb-8361-c520a2dd0fd3_540x.png?v=1697468622',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Caballero'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Challenger 13',
    marca: 'Asics',
    descripcion: 'Marca: Asics. Modelo:1042A164.404. Características: Los zapatos de tenis GEL-CHALLENGER 13 ofrecen la estabilidad necesaria para cubrir la línea de fondo sin que dejes de centrarte en controlar el punto. El empeine de la zapatilla mantiene los pies fijos en la superficie del calzado. Aportan una sensación de refuerzo durante las voleas o cuando golpeas desde el fondo. La tecnología WINGWALL en el lateral mejora la estabilidad durante los movimientos laterales. Esta característica ofrece una buena sujeción para que puedas intensificar el golpeo y darle a la pelota con más ritmo.',
    precio: 127.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_5bbe04f4-fbdd-4b6f-ba97-c78834cff5c4_540x.png?v=1689599743',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Challenger 13',
    marca: 'Asics',
    descripcion: 'Marca: Asics. Modelo:1042A164.104. Características: Los zapatos de tenis GEL-CHALLENGER 13 ofrecen la estabilidad necesaria para cubrir la línea de fondo sin que dejes de centrarte en controlar el punto. El empeine de la zapatilla mantiene los pies fijos en la superficie del calzado. Aportan una sensación de refuerzo durante las voleas o cuando golpeas desde el fondo. La tecnología WINGWALL en el lateral mejora la estabilidad durante los movimientos laterales. Esta característica ofrece una buena sujeción para que puedas intensificar el golpeo y darle a la pelota con más ritmo.',
    precio: 127.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_159ee663-8e2b-4de1-9a6b-1645ee394012_180x.png?v=1689599462',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Court Air Zoom Vapor Pro 2',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DR6192-100. Características: Este diseño está más cerca de la cancha, lo que le brinda una increíble sensación de ligereza en la cancha para ráfagas de movimientos rápidos. La malla duradera y reforzada ayuda a mantener los pies frescos y agrega soporte adicional. La funda interna elástica envuelve el pie para brindar un ajuste similar al de una media. La suela exterior en espiga utiliza un diseño basado en datos para crear un agarre óptimo sin afectar su capacidad de deslizamiento. Sin la goma en las áreas de bajo desgaste para ayudar a mantener el peso al mínimo. El marco de pie de largo completo en el exterior del zapato ayuda a estabilizar el pie durante los cortes rápidos. Diseñado para superficies de canchas duras. Cuello de malla.',
    precio: 168.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_2_e68469d3-e31d-44a9-af80-cc8b00de62df_540x.png?v=1689255705',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Court Air Zoom Vapor Pro 2',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DR6192-001. Características: Este diseño está más cerca de la cancha, lo que le brinda una increíble sensación de ligereza en la cancha para ráfagas de movimientos rápidos. La malla duradera y reforzada ayuda a mantener los pies frescos y agrega soporte adicional. La funda interna elástica envuelve el pie para brindar un ajuste similar al de una media. La suela exterior en espiga utiliza un diseño basado en datos para crear un agarre óptimo sin afectar su capacidad de deslizamiento. Sin la goma en las áreas de bajo desgaste para ayudar a mantener el peso al mínimo. El marco de pie de largo completo en el exterior del zapato ayuda a estabilizar el pie durante los cortes rápidos. Diseñado para superficies de canchas duras. Cuello de malla.',
    precio: 168.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_20b908a4-b093-4bab-83d6-5b0d1c53c910_540x.png?v=1687276396',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Court Air Zoom Vapor Pro 3',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DR6192-001. Características: Este diseño está más cerca de la cancha, lo que le brinda una increíble sensación de ligereza en la cancha para ráfagas de movimientos rápidos. La malla duradera y reforzada ayuda a mantener los pies frescos y agrega soporte adicional. La funda interna elástica envuelve el pie para brindar un ajuste similar al de una media. La suela exterior en espiga utiliza un diseño basado en datos para crear un agarre óptimo sin afectar su capacidad de deslizamiento. Sin la goma en las áreas de bajo desgaste para ayudar a mantener el peso al mínimo. El marco de pie de largo completo en el exterior del zapato ayuda a estabilizar el pie durante los cortes rápidos. Diseñado para superficies de canchas duras. Cuello de malla.',
    precio: 107.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_f9e41b82-1426-4f66-ba6a-44d6aa88703d_540x.png?v=1687276571',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Court Zoom Lite 3',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DH1042-117 y DH1042-104. Características: Los zapatos para tenis NikeCourt Zoom Lite 3 con una unidad Zoom Air elástica, una suela con agarre y un cuello acolchado increíblemente cómodo, ofrece el rendimiento que necesita para jugar al máximo. El cuero es suave y duradero. La tela transpirable en el empeine aumenta el flujo de aire. La unidad Zoom Air en el antepié se siente elástica y receptiva. La suela de espiga es duradera y tiene la cantidad perfecta de agarre. Diseñado para usar en superficies de canchas duras.',
    precio: 107.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Myproject-1_2_843311c4-43d6-40fd-993b-7aaf4e266f3d_540x.png?v=1682919090',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Gel Dedicate 7',
    marca: 'Asics',
    descripcion: 'Marca: Asics. Modelo:1042A167.104. Características: El zapato de tenis GEL DEDICATE 7 ofrece buena estabilidad y una sensación flexible para mantener la mente centrada durante el partido. La parte superior de este calzado está construida con materiales de cuero sintético para mejorar el soporte. Mantienen tus pies bloqueados cuando cambias de dirección y persigues tiros desafiantes. Una unidad de soporte TRUSSTIC® y una suela exterior envolvente mejoran la estabilidad mientras permiten que tus pies se muevan libremente. Esto te permite cambiar de dirección con más confianza, especialmente si te mueves de lado a lado. Capas superpuestas de cuero sintético duradero en la puntera. Caída del talón: 10mm.',
    precio: 96.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/ASICS-1_64dd4458-a102-44fd-adf0-e7f6ae6df99e_540x.png?v=1683512335',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Gel Dedicate 7',
    marca: 'Asics',
    descripcion: 'Marca: Asics. Modelo:1042A167.405. Características: El zapato de tenis GEL DEDICATE 7 ofrece buena estabilidad y una sensación flexible para mantener la mente centrada durante el partido. La parte superior de este calzado está construida con materiales de cuero sintético para mejorar el soporte. Mantienen tus pies bloqueados cuando cambias de dirección y persigues tiros desafiantes. Una unidad de soporte TRUSSTIC® y una suela exterior envolvente mejoran la estabilidad mientras permiten que tus pies se muevan libremente. Esto te permite cambiar de dirección con más confianza, especialmente si te mueves de lado a lado. Capas superpuestas de cuero sintético duradero en la puntera. Caída del talón: 10mm.',
    precio: 96.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/ASICS-1_5e817ec4-f48a-48c5-8dcf-c8c47324beb6_540x.png?v=1683512333',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Gel Resolution 9',
    marca: 'Asics',
    descripcion: 'Marca: Asics. Modelo:1042A208.101. Características: El zapato de tenis GEL-RESOLUTION® 9 crea una estabilidad y amortiguación avanzadas para los jugadores a los que les gusta controlar el juego desde la línea de fondo. La tecnología DYNAWALL™ en la entresuela ahora se extiende hacia el talón para mayor estabilidad durante los movimientos laterales. La tecnología DYNAWRAP™ en el ojal se ha rediseñado estratégicamente para aplicar presión cuando se necesita soporte adicional. La suela exterior de largo completo y el talón separado ayudan a producir un aterrizaje más estable para recuperaciones más rápidas entre tiros.',
    precio: 177.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_27e794fc-7590-4711-ac1d-d1fc581d7d17_540x.png?v=1689605536',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Vapor Lite',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DC3431-161, DC3431-116, DC3431-500 y DC3431-102. Características: El Nike Vapor Lite presenta excelentes cualidades, ya que el diseño de 4 puntos proporciona una correa de apoyo que abraza los pies de abajo hacia arriba, mientras que la malla transpirable lo mantiene cómodo y fresco. La espuma suave cerca del arco ayuda a alinear el tobillo con el pie cuando se arrastran las pelotas, mientras que una espuma más rígida en el lado lateral ayuda a una mayor estabilidad para el movimiento lateral y la velocidad. Parte superior: Malla transpirable para mayor comodidad y soporte. El diseño de la correa de 4 puntos sostiene y abraza los pies con bucles Ghllie en los 2 cordones inferiores para abrazar los pies y brindar mayor soporte. Entresuela: La amortiguación de la entresuela suave y receptiva se combina con espuma estratégica para mantener los pies alineados y permitirle recuperarse rápidamente en cortes agresivos. Suela exterior: Patrón de espiga innovador para un agarre perfecto sin afectar su capacidad de deslizamiento en todas las superficies de la cancha. Goma añadida en el lado medial para proteger el arrastre de los dedos.',
    precio: 120.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/products/Myproject_2_ecfbe04f-cfb5-40fc-83ea-b4cb941d1fa8_540x.png?v=1682918904',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
  {
    titulo: 'Zapatos de Tenis para Dama Vapor Lite 2',
    marca: 'Nike',
    descripcion: 'Marca: Nike. Modelo: DC3431-161, DC3431-116, DC3431-500 y DC3431-102. Características: El Nike Vapor Lite presenta excelentes cualidades, ya que el diseño de 4 puntos proporciona una correa de apoyo que abraza los pies de abajo hacia arriba, mientras que la malla transpirable lo mantiene cómodo y fresco. La espuma suave cerca del arco ayuda a alinear el tobillo con el pie cuando se arrastran las pelotas, mientras que una espuma más rígida en el lado lateral ayuda a una mayor estabilidad para el movimiento lateral y la velocidad. Parte superior: Malla transpirable para mayor comodidad y soporte. El diseño de la correa de 4 puntos sostiene y abraza los pies con bucles Ghllie en los 2 cordones inferiores para abrazar los pies y brindar mayor soporte. Entresuela: La amortiguación de la entresuela suave y receptiva se combina con espuma estratégica para mantener los pies alineados y permitirle recuperarse rápidamente en cortes agresivos. Suela exterior: Patrón de espiga innovador para un agarre perfecto sin afectar su capacidad de deslizamiento en todas las superficies de la cancha. Goma añadida en el lado medial para proteger el arrastre de los dedos.',
    precio: 111.00,
    miniatura: 'https://cdn.shopify.com/s/files/1/0287/9799/3039/files/DEPOFIT-1_5754a406-47d4-4377-a3f7-1dd0abfd6a1b_540x.png?v=1687276566',
    categoria: 'Zapatos Tenis',
    descuento: 0,
    stock: 50,
    genero: 'Dama'
  },
]


cart.forEach(element => {
  element.addEventListener('click', e => {
    articulos.classList.toggle('cart-activado')
  })
});





cokiesGet()
getZapatos();
getCarrito();
numArticulosCarrito();







