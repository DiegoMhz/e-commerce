const imagenZapato = document.querySelector('#imagenZapato');
const informacionDeEnvio = document.querySelector('#informacion-de-envios');
const btnDescripcion = document.querySelector('#descripcion');
const politicaDeCambios = document.querySelector('#politica-de-cambios');
const cart = document.querySelector('#cart');
const articulos = document.querySelector('.carrito-articulos');
const btnSuma = document.querySelector('#btn-suma');
const btnResta = document.querySelector('#btn-resta');
const inputNumero = document.querySelector('#input-numero');
const btnAgregarArticulo = document.querySelector('#btn-agregar');
const listaArticulos = document.querySelector('#listaArticulos');
const precioTotalCarrito = document.querySelector('#precio-total');
const tituloCarrito = document.querySelector('#titulo-carrito');
const btnTallas = document.querySelectorAll('.btn-talla');
const spanTalla = document.querySelector('#span-talla');
const spanPrecio = document.querySelector('#span-precio');
const spanMarca = document.querySelector('#marca');
const zapatosTitulo = document.querySelector('#h1-descripcion');
const botonSliderDerecha = document.querySelector('#btn-right');
const botonSliderIzquierda = document.querySelector('#btn-left');
const tituloNombreZapato = document.querySelector('#p-nombreZapato');
const imgDepofit = document.querySelector('#img-depofit');
const inputBuscar = document.querySelector('#input')

imgDepofit.addEventListener('click', e => {
    window.location.pathname = `/`
})


const cokiesGet = async () => {
    const { data } = await axios.get('/api/cookies',
        {
            withCredentials: true
        }
    )
    const usuarioValido = data.acessToken
    if (usuarioValido === undefined) {
        console.log('NO ME DA LOS COOKIES');
        user.addEventListener('click', e => {
            window.location.pathname = `/login`
        })
    }
    else {
        console.log('SI ME DA LAS COOKIES');
        user.addEventListener('click', e => {
            window.location.pathname = `/perfil`
        })
    }
}

const next = (boton) => {
    let cardFirst = boton.parentElement.parentElement.children[1].children[1];
    let contenedorCard = boton.parentElement.parentElement.children[1];
    contenedorCard.insertAdjacentElement('beforeend', cardFirst)
}

const prev = (boton) => {
    let cardLast = boton.parentElement.parentElement.children[1].children;
    cardLast = cardLast[cardLast.length - 1];
    let contenedorCard = boton.parentElement.parentElement.children[1];
    contenedorCard.insertAdjacentElement('afterbegin', cardLast);
}

botonSliderDerecha.addEventListener('click', e => {
    next(botonSliderDerecha);
})

botonSliderIzquierda.addEventListener('click', e => {
    prev(botonSliderIzquierda)
})


let totalPrecioArticulos = 0
const getSugerencias = async () => {
    const { data } = await axios.get('/api/zapatos',
        {
            withCredentials: true
        }
    )
    const contenedorCardSlider = document.querySelector('#slider')
    const zapatos = data[0].zapatos
    const id = window.location.pathname.split('/')[3]
    const zapatoFiltrado = zapatos.find(zapato => zapato._id === id)
    const sugerencias = zapatos.filter(sugerencias => sugerencias.categoria === zapatoFiltrado.categoria)
    sugerencias.forEach(element => {
        const imagen = element.miniatura;
        const marca = element.marca;
        const precio = element.precio
        const titulo = element.titulo
        const div = document.createElement('div');
        div.className = 'card-sugerencia'
        div.id = `${element._id}`
        div.innerHTML = `
       <img class="img-card" src="${imagen}">
       <h2>${marca}</h2>
       <p>${titulo}</p>
       <span>$${precio}.00</span>
       `
        contenedorCardSlider.prepend(div)
    });
    const imgCard = document.querySelectorAll('.img-card');
    imgCard.forEach(imagen => {
        imagen.addEventListener('click', e => {
            const idZapato = e.target.parentElement.id
            window.location.pathname = `/productos/all/${idZapato}`
        })
    });
}


const getZapato = async () => {
    const { data } = await axios.get('/api/zapatos',
        {
            withCredentials: true
        }
    )

    const id = window.location.pathname.split('/')[3]
    const zapatos = data[0].zapatos
    const zapatoEncontrado = zapatos.find(zapato => zapato._id === id);
    const imagen = zapatoEncontrado.miniatura
    const titulo = zapatoEncontrado.titulo
    const marca = zapatoEncontrado.marca
    const precio = zapatoEncontrado.precio

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

    zapatosTitulo.innerText = `${titulo}`
    spanMarca.innerText = `${marca}`
    spanPrecio.innerText = `$${precio}.00`
    imagenZapato.src = imagen;
    tituloNombreZapato.innerText = `${titulo}`


    btnAgregarArticulo.addEventListener('click', e => {
        console.log('AQUI TAMBIEN ENTRA');
        let talla = document.querySelector('#span-talla')
        talla = talla.innerText.split(':')[1];
        agregarCarrito(titulo, precio, imagen, talla);
    })
};


const getCarrito = async () => {
    const { data } = await axios.get('/api/carrito',
        {
            withCredentials: true
        }
    )
    data.forEach(element => {
        const imagen = element.img
        const titulo = element.titulo
        const precio = element.precio
        const cantidad = element.cantidad
        const talla = element.talla
        console.log(element);
        const li = document.createElement('li')
        li.className = `li`
        li.id = element.id
        li.innerHTML = `<button class="borrar-articulo">❌</button>
        <div id="imagen-articulo">
          <img class="img" src="${imagen}">
        </div>
        <div id="descripcion-articulo">
        <p id="titulo-articulo">${titulo}</p>
        <p id="precio-articulo">${precio}.00$</p>
        <p id="talla-articulo"><b>Talla:</b> ${talla}</p>
        <p id="cantidad-articulo"><b>Cantidad:</b> ${cantidad}</p>
        </div>
        `
        listaArticulos.prepend(li);

        let precioArticulo = parseInt(li.children[2].children[1].innerText.split('$')[0]);
        precioArticulo = parseInt(cantidad * precioArticulo);
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
    });
}

const agregarCarrito = async (titulo, precio, imagen) => {
    const cookies = await axios.get('/api/cookies',
        {
            withCredentials: true
        }
    )
    if (cookies.data.acessToken === undefined) {
        alert('TIENES QUE INICIAR SESION PARA PODER INGRESAR ARTICULOS AL CARRITO')
    }
    else {
        const talla = parseFloat(spanTalla.innerText.split(':')[1]);
        const inputCantidad = document.querySelector('#input-numero');
        const cantidad = parseInt(inputCantidad.value)
        const { data } = await axios.post('/api/carrito', {
            titulo: titulo,
            precio: precio,
            img: imagen,
            talla: talla,
            cantidad: cantidad
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

const numArticulosCarrito = () => {
    let numeroArticulos = listaArticulos.children.length;
    tituloCarrito.innerHTML = `Carrito de compra (${numeroArticulos})`;
    const numeroCarrito = document.querySelector('#span-cart');
    numeroCarrito.innerText = `${numeroArticulos}`
};


btnTallas.forEach(element => {
    element.addEventListener('click', e => {

        if (e.target.parentElement.classList.value === '') {
            e.target.parentElement.classList.add('activadoo');
            e.target.classList.add('seleccionado');
            const spanTalla = document.querySelector('#span-talla');
            spanTalla.innerText = `Talla: ${e.target.innerText}`
        }
        else {
            const btnSeleccionado = document.querySelector('.seleccionado')
            btnSeleccionado.classList.remove('seleccionado');
            e.target.classList.add('seleccionado');
            const spanTalla = document.querySelector('#span-talla');
            spanTalla.innerText = `Talla: ${e.target.innerText}`
        }
    })
});

btnDescripcion.addEventListener('click', e => {
    btnDescripcion.children[1].classList.toggle('activado');
})

informacionDeEnvio.addEventListener('click', e => {
    informacionDeEnvio.children[1].classList.toggle('activado');
})

politicaDeCambios.addEventListener('click', e => {
    politicaDeCambios.children[1].classList.toggle('activado');
})

cart.addEventListener('click', e => {
    articulos.classList.toggle('cart-activado')
})



let numeroDeArticulos = 1
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

getZapato();
getSugerencias()
numArticulosCarrito();
getCarrito()
cokiesGet()
