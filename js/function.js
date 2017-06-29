// JavaScript Document
var validateCaptcha = false;
var captcha = null;
var formMessage;
var onloadCallback = function () {

	captcha = grecaptcha.render('captcha_container', {
		'sitekey': '6LcdQBUUAAAAAPip-WahTG8TzkDm76yEX6VfFPz6',
		'callback': function (response) {
			//$('#btn_submit').removeAttr('disabled');
			validateCaptcha = true;
		},
		'theme': 'dark'
	});
};


function validateForm(e) {
	validateCaptcha;
	//alert(validateCaptcha);
	formMessage = document.getElementById("main-contact-form");
	var sendMail = new Array();
	var params = "";
	for (var i = 0; i < formMessage.length; i++) {
		var elementsForm = formMessage.elements[i];
		var textValue = elementsForm.value.trim();

		if (elementsForm.type == "text" || elementsForm.type == "email" || elementsForm.name == "message") {

			if (textValue == "" || textValue.length == 0 || /^\s+|\s+$/.test(textValue)) {
				elementsForm.classList.add("invalidate");
				elementsForm.focus();
				selectModal(0);
				return false;
			} else {
				elementsForm.classList.remove("invalidate");
				elementsForm.value = elementsForm.value.trim();
				sendMail[i] = elementsForm.name + "=" + elementsForm.value;

			}
		}


	}
	if (!validateCaptcha) {
		selectModal(1);
		return false;
	} else {
		console.log(sendMail);
	}

	//debugger;
	params = sendMail.toString().replace(/\,/g, "&");
	sendEmail(params);
	e.preventDefault();
	return true;
}

function selectModal(data) {
	var textAlert = new Array("Por favor verifique los datos digitados", "Por favor verifique que no es un robot","Gracias por contactarnos, en las próximas horas uno de nuestros asesores se comunicará contigo para brindarte la asesoría que requieras.","Se presento un inconveniente intenta de nuevo");
	//alert(textAlert[data]);
	$(".modal-body").html("<p> "+textAlert[data]+"</p>");
	$("#myModal").modal();
}

function sendEmail(params) {


	console.log(params);
	//debugger;
	var xhttp = new XMLHttpRequest();
	xhttp.open("POST", "php/sw_email.php", true);
	//xhttp.setRequestHeader("Content-Type","application/json");
	xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				//alert("OK:" + this.responseText);
				if(this.responseText=="success"){
					selectModal(2);
				}else{
					selectModal(3);
				}
				resetForm();
			}
		}
		//var str_json = JSON.stringify(params);
	xhttp.send(params);
	//debugger;
}

function resetForm() {
	grecaptcha.reset(captcha);
	for (var i = 0; i < formMessage.length; i++) {
		var elementsForm = formMessage.elements[i];
		var textValue = elementsForm.value.trim();

		if (elementsForm.type == "text" || elementsForm.type == "email" || elementsForm.name == "message") {

			elementsForm.value = "";
			validateCaptcha = false;

		}


	}
}