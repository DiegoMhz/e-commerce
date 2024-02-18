// async function enviarImagen() {
//     const fileInput = document.getElementById('imagen');
//     const file = fileInput.files[0];

//     const formData = new FormData();
//     formData.append('imagen', file);

//     try {
//         axios.post('/api/imagenes/single', formData)
//         const { data } = await axios.post('/api/zapatos', {
//             titulo: 'Zapatos de Basquetbol para Caballero MC Trainer 2',
//             marca: 'Nike',
//             descripcion: 'Marca: Nike. Modelo: DM1124-004. Características:  Mejora tu juego y tu estilo de básquetbol. Cargado con la amortiguación Max Air en el talón, este zapato liviano y seguro lo ayuda a despegar con confianza y aterrizar cómodamente.  Además, la goma envuelve los costados para mayor durabilidad y estabilidad. Una unidad Max Air en el talón brinda amortiguación donde se necesita.  El acolchado en el talón y la lengüeta se suma a la sensación de suavidad. La tracción en espiga en la suela ayuda a controlar tus movimientos y a mantener el terreno.  Los recortes en forma de diamante exponen la espuma y ayudan a reducir el peso.  La piel de los dedos añade durabilidad. La base del antepié agrega estabilidad. La malla es ligera y semitransparente.',
//             precio: 123.00,
//             miniatura: `${file.name}`,
//             categoria: 'Zapatos Basquetbol',
//             descuento: 0,
//             stock: 50,
//             genero: 'Hombre'
//         })
//         console.log(data);
//     } catch (error) {
//         console.log(error.data.error);
//     }
// }


const form = document.querySelector('#formCrearZapato');

form.addEventListener('submit', async e => {
    e.preventDefault();
    const titulo = e.target.inputTitulo.value;
    const descripcion = e.target.inputDescripcion.value;
    const precio = parseInt(e.target.inputPrecio.value);
    const descuento = e.target.inputDescuento.value;
    const marca = e.target.selectMarca.value;
    const categoria = e.target.selectCategoria.value;
    const genero = e.target.selectGenero.value;


    const fileInput = document.getElementById('imagen');
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append('imagen', file);
    const newZapato = {
        titulo: `${titulo}`,
        marca: `${marca}`,
        descripcion: `${descripcion}`,
        precio: `${precio}`,
        miniatura: `/img/${file.name}`,
        categoria: `${categoria}`,
        descuento: `${descuento}`,
        stock: 50,
        genero: `${genero}`
    }
    try {
        axios.post('/api/imagenes/single', formData)
        const { data } = await axios.post('/api/zapatos', newZapato)
        console.log(data);
    } catch (error) {
        console.log(error.data.error);
    }

})