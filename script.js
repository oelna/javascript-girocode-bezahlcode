'use strict';

const output = {
	'girocode': document.querySelector('#girocode'),
	'bezahlcode': document.querySelector('#bezahlcode')
};

const fields = {
	'bic': document.querySelector('#bic'),
	'recipient': document.querySelector('#recipient'),
	'iban': document.querySelector('#iban'),
	'currency': document.querySelector('#currency'),
	'amount': document.querySelector('#amount'),
	'reason': document.querySelector('#reason')
};

const settings = {
	'barcodeSize': 384,
	'darkColor': '#000000',
	'lightColor': '#ffffff'
};

const giroCodeString = function (params) {
	const sep = "\n";

	const data = {
		'service': 'BCD',
		'version': '001',
		'encoding': '2', // 1 = UTF-8, 2 = ISO 8859-1
		'transfer': 'SCT',
		'bic': params.bic.trim(),
		'name': params.name.trim(),
		'iban': params.iban.replace(' ', '').trim(),
		'currency': params.currency.trim().toUpperCase(),
		'amount': parseFloat(params.amount.trim()),
		'char': '',
		'ref': '',
		'reason': params.reason.trim().replace(sep, ' ').substring(0, 140), // max of 140 characters
		'hint': ''
	};

	let epcString = data.service;
	epcString += sep + data.version;
	epcString += sep + data.encoding;
	epcString += sep + data.transfer;
	epcString += sep + data.bic;
	epcString += sep + data.name;
	epcString += sep + data.iban;
	epcString += sep + data.currency + data.amount;
	epcString += sep + data.char;
	epcString += sep + data.ref;
	epcString += sep + data.reason;

	return epcString;
}

const makeGiroCode = function () {

	const str = giroCodeString({
		'bic': fields.bic.value,
		'name': fields.recipient.value,
		'iban': fields.iban.value,
		'currency': fields.currency.value,
		'amount': fields.amount.value,
		'reason': fields.reason.value
	});

	makeQR(output.girocode, str);
}

const bezahlCodeString = function (params) {

	const data = {};

	data.bic = params.bic.toUpperCase().trim();
	data.name = params.name.toUpperCase().trim();
	data.iban = params.iban.replace(' ', '').toUpperCase().trim();
	data.amount = parseFloat(params.amount.trim().replace(',', '.')).toString().replace('.', ',');
	data.reason = params.reason.trim().replace("\n", ' ').substring(0, 140);

	if (params.currency.trim().toUpperCase() != 'EUR') {
		alert('Bezahlcode unterstützt nur Beträge in Euro!');
		return '';
	}

	const parameters = new URLSearchParams(data).toString();
	const bezahlCodeString = 'bank://singlepaymentsepa?' + parameters.replace('+', '%20');

	return bezahlCodeString;
}

const makeBezahlCode = function () {

	const str = bezahlCodeString({
		'bic': fields.bic.value,
		'name': fields.recipient.value,
		'iban': fields.iban.value,
		'currency': fields.currency.value,
		'amount': fields.amount.value,
		'reason': fields.reason.value
	});

	makeQR(output.bezahlcode, str);
}

const makeQR = function (ele, str) {
	if (str.length > 0) {
		const bezahlCode = new QRCode(ele, {
			width : settings.barcodeSize,
			height : settings.barcodeSize,
			colorDark : settings.darkColor,
			colorLight : settings.lightColor,
			correctLevel : QRCode.CorrectLevel.M,
			useSVG: true
		});

		bezahlCode.makeCode(str);
	}
}

const updateCode = function (e) {
	e.preventDefault();

	// todo: do some sanity value checking here

	makeGiroCode();
	makeBezahlCode();
}

document.querySelector('#generate').addEventListener('click', updateCode);

document.querySelectorAll('a[download]').forEach(function (ele, i) {
	ele.addEventListener('click', function (e) {
		const svg = e.target.parentNode.querySelector('.code svg');
		if (!svg) { return false; }

		svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		ele.setAttribute('href', 'data:image/svg+xml;utf8,' + svg.outerHTML);
	});
});

/*
// fill in test data
document.querySelector('#bic').value = 'SOLADES1PFD';
document.querySelector('#recipient').value = 'Girosolution GmbH';
document.querySelector('#iban').value = 'DE19690516200000581900';
document.querySelector('#amount').value = '22.30';
document.querySelector('#reason').value = 'testzweck';
*/
