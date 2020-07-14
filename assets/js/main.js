//Mostrando todos los datos
///////////////////////////
///////////////////////////
let setContainer = document.querySelector('[data-toggle="cards"]');

const content = pages;
let html = ``;

content.forEach(element => {
	html += `
		<div class="card">
			<input type="text" class="input" value="${element}" readonly/>
			<button type="button">Copiar</button>
			<a href="${element}" target="_blank">Ir</a>
		</div>
	`;
});

setContainer.innerHTML = html;

//Boton de copiar y cambio de color del input cuando se visita
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
let cards = document.querySelectorAll('.card');

cards.forEach(element => {
	let input = element.children[0];
	let buttonCopy = element.children[1];
	let buttonGo = element.children[2];

	buttonGo.addEventListener('click', () => {
		element.classList.add('checked');
	});

	buttonCopy.addEventListener('click', () => {
		let modal = document.querySelector('[data-target="modal"]');
		
		input.focus();
		input.select();
		document.execCommand('copy');
		
		modal.classList.add('active');
		if (modal.classList.contains('active')) {
			setTimeout(() => {
				modal.classList.remove('active');
			}, 1000);
		}
		
	});
});

//Resumen
/////////
/////////
let form_1 = document.querySelector('#form-1');
let form_2 = document.querySelector('#form-2');
let form_3 = document.querySelector('#form-3');
let form_4 = document.querySelector('#form-4');
let form_5 = document.querySelector('#form-5');

let list = document.querySelectorAll('[data-target="list"]')

let alerta = document.querySelector('[data-target="alert"]');

const showAlert = () => {
	alerta.classList.add('active');
	if (alerta.classList.contains('active')) {
		setTimeout(() => {
			alerta.classList.remove('active');
		}, 1000);
	}
}

const inputForm = (form, list) => {
	let page = [];
	form.addEventListener('submit', e => {
		e.preventDefault();

		let input = e.target[0];
		if (input.value.trim() === '') {
			showAlert();
			return false;
		}
		page.push(input.value);
		input.value = '';
		let html = ``;
		page.forEach(element => {
			html += `<p>${element}</p>`;
		});
		list.innerHTML = html;
	});
}

const inputFormDate = (form, list) => {
	let page = [];
	form.addEventListener('submit', e => {
		e.preventDefault();

		let input = e.target[0];
		let input_2 = e.target[1];
		if (input.value.trim() === '' || input_2.value.trim() === '') {
			showAlert();
			return false;
		}
		let objectInputs = {
			url: input.value,
			data: input_2.value
		}
		page.push(objectInputs);
		input.value = '';
		input_2.value = '';
		let html = ``;
		page.forEach(element => {
			const theDate = element.data.replace(/-/g, '/');
			const date = new Date(theDate);

			const months__ = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
			const days__ = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

			const day = days__[date.getDay()];
			const dayOfMonth = date.getDate();
			const month = months__[date.getMonth()];
			const year = date.getFullYear();

			html += `<p>${element.url} <strong>Fecha:</strong> ${day}, ${dayOfMonth} de ${month} del ${year} </p>`;
		});
		list.innerHTML = html;
	});
}

const inputFormCSS = (form, list) => {
	let page = [];
	form.addEventListener('submit', e => {
		e.preventDefault();

		let input = e.target[0];
		let input_2 = e.target[1];
		if (input.value.trim() === '' || input_2.value.trim() === '') {
			showAlert();
			return false;
		}
		let objectInputs = {
			url: input.value,
			data: input_2.value
		}
		page.push(objectInputs);
		input.value = '';
		input_2.value = '';
		let html = ``;
		page.forEach(element => {
			html += `<p>${element.url} <strong>Detalles:</strong> ${element.data}</p>`;
		});
		list.innerHTML = html;
	});
}

inputForm(form_1, list[0]);
inputForm(form_2, list[1]);
inputForm(form_4, list[3]);

inputFormDate(form_3, list[2]);

inputFormCSS(form_5, list[4]);

