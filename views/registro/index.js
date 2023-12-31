
const REGEX_NAME = /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[0-9]).{8,24}$/;
const REGEX_EMAIL = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/

const form = document.querySelector('#form');
const inputNombre = document.querySelector('#input-nombre');
const inputEmail = document.querySelector('#input-email');
const inputPassword = document.querySelector('#input-password');
const inputPasswordConfirm = document.querySelector('#input-passwordConfirm');
const formBtn = document.querySelector('#btn');
const imgDepofit = document.querySelector('#img-depofit');
const cart = document.querySelectorAll('#cart');
const articulos = document.querySelector('.carrito-articulos');
// TELEFONO
const inputTelefono = document.querySelector('#input-telefono');
const btnBorrarSugerenciasTLF = document.querySelector('#svgBorrarSugerencias');
const btnBuscarSugerenciasTLF = document.querySelector('#lupa-telefono');
const svgMenutelefono = document.querySelector('#menu-telefono');
const menuTelefono = document.querySelector('#linksTelefono');

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

const numArticulosCarrito = () => {
    let numeroArticulos = listaArticulos.children.length;
    const tituloCarrito = document.querySelector('#titulo-carrito')
    tituloCarrito.innerHTML = `Carrito de compra (${numeroArticulos})`;
    const numeroCarrito = document.querySelector('#span-cart');
    const numeroCarritoTelefono = document.querySelector('#span-cart-telefono');
    numeroCarrito.innerText = `${numeroArticulos}`
    numeroCarritoTelefono.innerText = `${numeroArticulos}`
};

cart.forEach(element => {
    element.addEventListener('click', e => {
        articulos.classList.toggle('cart-activado')
    })
});

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
    window.location.pathname = `/`
})


let nombreValidacion = false
let emailValidacion = false
let passwordValidacion = false
let passworConfirmValidacion = false

const validacion = (input, validacion) => {
    const errorText = input.parentElement.children[2];
    if (!nombreValidacion || !emailValidacion || !passwordValidacion || !passworConfirmValidacion) {
        formBtn.disabled = true
    }
    else {
        formBtn.disabled = false
    }
    if (!validacion && input.value != '') {
        input.classList.add('form-incorrecto');
        errorText.classList.add('formato-visible');
    }
    else {
        input.classList.remove('form-incorrecto');
        errorText.classList.remove('formato-visible');
    }
}

inputNombre.addEventListener('input', e => {
    nombreValidacion = REGEX_NAME.test(e.target.value);
    validacion(inputNombre, nombreValidacion)
})


inputEmail.addEventListener('input', e => {
    emailValidacion = REGEX_EMAIL.test(e.target.value);
    validacion(inputEmail, emailValidacion)
})

inputPassword.addEventListener('input', e => {
    passwordValidacion = REGEX_PASSWORD.test(e.target.value);
    passworConfirmValidacion = inputPasswordConfirm.value === e.target.value;
    validacion(inputPasswordConfirm, passworConfirmValidacion)
    validacion(inputPassword, passwordValidacion)
})


inputPasswordConfirm.addEventListener('input', e => {
    passworConfirmValidacion = e.target.value === inputPassword.value;
    console.log(passworConfirmValidacion);
    validacion(inputPasswordConfirm, passworConfirmValidacion)
})


form.addEventListener('submit', async e => {
    e.preventDefault();
    try {
        const newUser = {
            name: inputNombre.value,
            email: inputEmail.value,
            password: inputPassword.value
        }
        await axios.post('/api/users/', newUser);
        window.location.pathname = '/login';
    } catch (error) {
        console.log(error.response.data.error);
        formError.classList.add('error-visible');
    }
})

numArticulosCarrito()
cokiesGet();