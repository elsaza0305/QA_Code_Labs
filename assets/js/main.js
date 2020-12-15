$(document).ready(() => {

	// Mostrar Alerta

	const alert = $('[data-target="alert"]');
	const showAlert = () => {
		alert.addClass('active');
		if (alert.hasClass('active')) {
			setTimeout(() => {
				alert.removeClass('active');
			}, 1000);
		}
	}

	//Mostrando todos los datos
	///////////////////////////
	///////////////////////////
	
	const containerLinks = $(`[data-toggle='cards']`);
	let html = '';

	// $ -const data- from { data.js }
	
	$.each(data, function (i, datasimple) { 
		html += `
			<div class="card">
				<input type="text" class="input" value="${datasimple.link}" readonly/>
				<button type="button">Copy</button>
				<a href="${datasimple.link}" target="_blank">Go</a>
			</div>
		`;
	});

	containerLinks.html(html);

	//Boton de copiar y cambio de color del input cuando se visita
	//////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////
	const cards = containerLinks.children();

	$.each(cards, function () {
		
		const input = $(this).children('input');
		const buttonCopy = $(this).children('button');
		const buttonGo = $(this).children('a');

		buttonGo.click(function () {
			const mycard = $(this).parent('.card');
			mycard.addClass('checked');
		});

		buttonCopy.click(function () {

			const modal = $(`[data-target='modal']`);
			
			input.focus();
			input.select();
			document.execCommand('copy');
			
			modal.addClass('active');

			if (modal.hasClass('active')) {
				setTimeout(() => {
					modal.removeClass('active');
				}, 1000);
			}
			
		});

	});

	// Insertar Datos en LocalStorage
	const setData = (array, entry, localstr) => {

		const data = localStorage.getItem(localstr);

		if (data) {
			array = JSON.parse(data);
		}

		array.push(entry.value);
		localStorage.setItem(localstr, JSON.stringify(array));
		entry.value = '';

	}

	const setDataMore = (array, entry_1, entry_2, localstr) => {

		const data = localStorage.getItem(localstr);

		if (data) {
			array = JSON.parse(data);
		}

		let objectInputs = {
			url: entry_1.value,
			data: entry_2.value
		}

		array.push(objectInputs);
		localStorage.setItem(localstr, JSON.stringify(array));

		entry_1.value = '';
		entry_2.value = '';

	}

	// Borrar LocalStorage
	const deleteData = (selector) => {

		const button = $(selector)
		button.click(function () {

			const dirstr = $(this).attr('id');
			localStorage.removeItem(dirstr);

			getData('#list-1', 'ssl-no-seguro');
			getData('#list-2', 'ssl-parc-seguro');
			getDataDate('#list-3', 'ssl-vencido');
			getData('#list-4', 'pages-sin-server');
			getDataDescription('#list-5', 'pages-maquetacion');

		});

	}

	//Obtener Datos LocalStorage
	const getData = (selector, localstr) => {
		const container = $(selector);
		const datas = localStorage.getItem(localstr);
		let html = '';

		if (datas) {

			if (JSON.parse(datas).length > 0) {

				$.each(JSON.parse(datas), function(i, data) {
					html += `<p>${data}</p>`;
				});

				if (selector === '#list-1') {
					container.html(`
						<h3>Páginas con certificado SSL pero con conexión no segura:</h3>
						${html}
						<div class="delete-local-str">
							<button id="ssl-no-seguro">Borrar Registro</button>
						</div>
					`);
					deleteData('#ssl-no-seguro');
				}
		
				if (selector === '#list-2') {
					container.html(`
						<h3>Páginas con certificado SSL pero con conexión parcialmente segura:</h3>
						${html}
						<div class="delete-local-str">
							<button id="ssl-parc-seguro">Borrar Registro</button>
						</div>
					`);
					deleteData('#ssl-parc-seguro');
				}
		
				if (selector === '#list-4') {
					container.html(`
						<h3>Páginas no encontradas por el servidor (No se puede acceder a este sitio):</h3>
						${html}
						<div class="delete-local-str">
							<button id="pages-sin-server">Borrar Registro</button>
						</div>
					`);
					deleteData('#pages-sin-server');
				}

			}
	
		} else {
			container.html('');
		}

	}

	const getDataDate = (selector, localstr) => {
		const container = $(selector);
		const datas = localStorage.getItem(localstr);
		let html = '';

		if (datas) {

			if (JSON.parse(datas).length > 0) {

				$.each(JSON.parse(datas), function(i, data) {
					const theDate = data.data.replace(/-/g, '/');
					const date = new Date(theDate);

					const months__ = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
					const days__ = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

					const day = days__[date.getDay()];
					const dayOfMonth = date.getDate();
					const month = months__[date.getMonth()];
					const year = date.getFullYear();

					html += `<p>${data.url} <strong>Fecha:</strong> ${day}, ${dayOfMonth} de ${month} del ${year} </p>`;
				});

				container.html(`
					<h3>Páginas con el certificado SSL a punto de vencer o vencido:</h3>
					${html}
					<div class="delete-local-str">
						<button id="ssl-vencido">Borrar Registro</button>
					</div>
				`);

				deleteData('#ssl-vencido')
				
			}
	
		} else {
			container.html('');
		}
	}

	const getDataDescription = (selector, localstr) => {
		const container = $(selector);
		const datas = localStorage.getItem(localstr);
		let html = '';

		if (datas) {

			if (JSON.parse(datas).length > 0) {

				$.each(JSON.parse(datas), function(i, data) {
					html += `<p>${data.url} <strong>Detalles:</strong> ${data.data}</p>`;
				});

				container.html(`
					<h3>Páginas con problemas de maquetación:</h3>
					${html}
					<div class="delete-local-str">
						<button id="pages-maquetacion">Borrar Registro</button>
					</div>
				`);

				deleteData('#pages-maquetacion')

			}
	
		} else {
			container.html('');
		}

	}

	// QA
	/////////
	/////////
	
	const inputForm = (selector) => {

		const form = $(selector);
		let page = [];
		
		form.submit(function (e) {
			e.preventDefault();

			let list = $(`#${$(this).attr('data-list')}`);
			const input = e.target[0];

			if (input.value.trim() === '') {
				showAlert();
				return false;
			}
			
			if (list.attr('id') === 'list-1') {

				setData(page, input, 'ssl-no-seguro');
				getData('#list-1', 'ssl-no-seguro');

			}

			if (list.attr('id') === 'list-2') {
				setData(page, input, 'ssl-parc-seguro');
				getData('#list-2', 'ssl-parc-seguro');
			}

			if (list.attr('id') === 'list-4') {
				setData(page, input, 'pages-sin-server');
				getData('#list-4', 'pages-sin-server');
			}

		});
	}

	const inputFormDate = (selector) => {

		const form = $(selector);
		let page = [];

		form.submit(function (e) {

			e.preventDefault();

			let list = $(`#${$(this).attr('data-list')}`);
			const input = e.target[0];
			const input_2 = e.target[1];
			
			if (input.value.trim() === '' || input_2.value.trim() === '') {
				showAlert();
				return false;
			}

			if (list.attr('id') === 'list-3') {
				setDataMore(page, input, input_2, 'ssl-vencido');
				getDataDate('#list-3', 'ssl-vencido');
			}

		});
	}

	const inputFormCSS = (selector) => {

		const form = $(selector)
		let page = [];

		form.submit(function (e) {

			e.preventDefault();

			let list = $(`#${$(this).attr('data-list')}`);

			const input = e.target[0];
			const input_2 = e.target[2];

			if (input.value.trim() === '' || input_2.value.trim() === '') {
				showAlert();
				return false;
			}

			if (list.attr('id') === 'list-5') {
				setDataMore(page, input, input_2, 'pages-maquetacion');
				getDataDescription('#list-5', 'pages-maquetacion');
			}

		});
	}

	getData('#list-1', 'ssl-no-seguro');
	getData('#list-2', 'ssl-parc-seguro');
	getDataDate('#list-3', 'ssl-vencido');
	getData('#list-4', 'pages-sin-server');
	getDataDescription('#list-5', 'pages-maquetacion');

	inputForm('#form-1');
	inputForm('#form-2');
	inputForm('#form-4');
	inputFormDate('#form-3');
	inputFormCSS('#form-5');

});

