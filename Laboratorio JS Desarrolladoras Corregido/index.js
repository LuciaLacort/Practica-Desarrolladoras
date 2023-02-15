const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll('.formulario__input');


const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,  // Letras y espacios, pueden llevar acentos.
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    clave: /^(?=.{8,})/, // 8 digitos
    confirmesuclave: /^(?=.{8,})/, // 8 digitos
}

const errores = {
    nombre: 'Nombre inválido',
    email: 'Email inválido',
    clave: 'Debe contener al menos 8 caracteres',
    confirmesuclave: 'Las contraseñas no coinciden',
}

const campos = {
    nombre: false,
    email: false,
    clave: false
}

const validarFormulario = (e) => {
    switch (e.target.name) {
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;

        case "email":
            validarCampo(expresiones.email, e.target, 'email');

            break;

        case "clave":
            validarCampo(expresiones.clave, e.target, 'clave');
            validarConfirmesuclave();

            break;

        case "confirmesuclave":
            validarCampo(expresiones.confirmesuclave, e.target, 'confirmesuclave');
            validarConfirmesuclave();
            break;
    }

}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-sharp fa-solid fa-circle-check'.split(' '));
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-sharp fa-solid fa-circle-exclamation'.split(' '));
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos[campo] = true;

    } else {
        document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__${campo} i`).classList.add('fa-sharp fa-solid fa-circle-exclamation'.split(' '));
        document.querySelector(`#grupo__${campo} i`).classList.remove('fa-sharp fa-solid fa-circle-check'.split(' '));
        document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
        if (input.value != "") {
            document.querySelector(`#grupo__${campo} .formulario__input-error`).innerText = errores[campo];
        } else {
            document.querySelector(`#grupo__${campo} .formulario__input-error`).innerText = 'Rellene este campo';
        }
        campos[campo] = false;
    }

}

const validarConfirmesuclave = () => {
    const inputClave = document.getElementById('clave');
    const inputConfirmesuclave = document.getElementById('confirmesuclave');

    if ((inputClave.value !== inputConfirmesuclave.value) || (!expresiones.confirmesuclave.test(inputConfirmesuclave.value))) {
        document.getElementById(`grupo__confirmesuclave`).classList.add('formulario__grupo-incorrecto');
        document.getElementById(`grupo__confirmesuclave`).classList.remove('formulario__grupo-correcto');
        document.querySelector(`#grupo__confirmesuclave i`).classList.add('fa-sharp fa-solid fa-circle-exclamation'.split(' '));
        document.querySelector(`#grupo__confirmesuclave i`).classList.remove('fa-sharp fa-solid fa-circle-check'.split(' '));
        document.querySelector(`#grupo__confirmesuclave .formulario__input-error`).classList.add('formulario__input-error-activo');
        if (inputConfirmesuclave.value != "") {
            document.querySelector(`#grupo__confirmesuclave .formulario__input-error`).innerText = errores.confirmesuclave;
        } else {
            document.querySelector(`#grupo__confirmesuclave .formulario__input-error`).innerText = 'Rellene este campo';
        }
        campos['clave'] = false;

    } else {
        document.getElementById(`grupo__confirmesuclave`).classList.remove('formulario__grupo-incorrecto');
        document.getElementById(`grupo__confirmesuclave`).classList.add('formulario__grupo-correcto');
        document.querySelector(`#grupo__confirmesuclave i`).classList.remove('fa-sharp fa-solid fa-circle-exclamation'.split(' '));
        document.querySelector(`#grupo__confirmesuclave i`).classList.add('fa-sharp fa-solid fa-circle-check'.split(' '));
        document.querySelector(`#grupo__confirmesuclave .formulario__input-error`).classList.remove('formulario__input-error-activo');
        campos['clave'] = true;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);

});

// Comprobación formulario

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    if (campos.nombre && campos.email && campos.clave) {
        formulario.reset();
        document.getElementById(`registerPage`).style.display = 'none';
        document.getElementById(`successPage`).style.display = 'block';
    }

});