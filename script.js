/* ----------------------------

	CustomValidation prototype

	- Keeps track of the list of invalidity messages for this input
	- Keeps track of what validity checks need to be performed for this input
	- Performs the validity checks and sends feedback to the front end

---------------------------- */

function CustomValidation(input) {
	this.invalidities = [];
	this.validityChecks = [];

	//add reference to the input node
	this.inputNode = input;

	//trigger method to attach the listener
	this.registerListener();
}

CustomValidation.prototype = {
	addInvalidity: function(message) {
		this.invalidities.push(message);
	},
	getInvalidities: function() {
		return this.invalidities.join('. \n');
	},
	checkValidity: function(input) {
		for ( var i = 0; i < this.validityChecks.length; i++ ) {

			var isInvalid = this.validityChecks[i].isInvalid(input);
			if (isInvalid) {
				this.addInvalidity(this.validityChecks[i].invalidityMessage);
			}

			var requirementElement = this.validityChecks[i].element;

			if (requirementElement) {
				if (isInvalid) {
					requirementElement.classList.add('invalid');
					requirementElement.classList.remove('valid');
				} else {
					requirementElement.classList.remove('invalid');
					requirementElement.classList.add('valid');
				}

			} // end if requirementElement
		} // end for
	},
	checkInput: function() { // checkInput now encapsulated

		this.inputNode.CustomValidation.invalidities = [];
		this.checkValidity(this.inputNode);

		if ( this.inputNode.CustomValidation.invalidities.length === 0 && this.inputNode.value !== '' ) {
			this.inputNode.setCustomValidity('');
		} else {
			var message = this.inputNode.CustomValidation.getInvalidities();
			this.inputNode.setCustomValidity(message);
		}
	},
	registerListener: function() { //register the listener here

		var CustomValidation = this;

		this.inputNode.addEventListener('keyup', function() {
			CustomValidation.checkInput();
		});


	}

};



/* ----------------------------

	Validity Checks

	The arrays of validity checks for each input
	Comprised of three things
		1. isInvalid() - the function to determine if the input fulfills a particular requirement
		2. invalidityMessage - the error message to display if the field is invalid
		3. element - The element that states the requirement

---------------------------- */
/*****************************FirstName and LastName Validity Checks***********************/
var firstnameValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'This input needs to be at least 3 characters',
		element: document.querySelector('label[for="firstname"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters are allowed',
		element: document.querySelector('label[for="firstname"] .input-requirements li:nth-child(2)')
	}
];


var lastnameValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'This input needs to be at least 3 characters',
		element: document.querySelector('label[for="lastname"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters are allowed',
		element: document.querySelector('label[for="lastname"] .input-requirements li:nth-child(2)')
	}
];

/*****************************FirstName and LastName Validity Checks END **********************/


/*****************************Address Validity Checks **********************/
var streetaddressValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'Required',
		element: document.querySelector('label[for="streetaddress"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z0-9_ ]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters and numbers are allowed',
		element: document.querySelector('label[for="streetaddress"] .input-requirements li:nth-child(2)')
	}
];

var cityValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'Required',
		element: document.querySelector('label[for="city"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z_ ]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters are allowed',
		element: document.querySelector('label[for="city"] .input-requirements li:nth-child(2)')
	}
];



var stateValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'Required',
		element: document.querySelector('label[for="state"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			var illegalCharacters = input.value.match(/[^a-zA-Z_ ]/g);
			return illegalCharacters ? true : false;
		},
		invalidityMessage: 'Only letters are allowed',
		element: document.querySelector('label[for="state"] .input-requirements li:nth-child(2)')
	}
];

var zipcodeValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value < 10000 | input.value > 99999;
		},
		invalidityMessage: 'Enter 5 positive numbers',
		element: document.querySelector('label[for="zipcode"] .input-requirements li:nth-child(1)')
	}
];

var phonenumberValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value < 1000000 | input.value > 9999999;
		},
		invalidityMessage: 'Enter 7 positive numbers',
		element: document.querySelector('label[for="phonenumber"] .input-requirements li:nth-child(1)')
	}
];
/*********************************Email and Password Validity Checks***********************************/

var emailValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 3;
		},
		invalidityMessage: 'Required',
		element: document.querySelector('label[for="email"] .input-requirements li:nth-child(1)')
	},
	{
		isInvalid: function(input) {
			return !input.value.match(/\@/g);
		},
		invalidityMessage: 'You need an @for the email to be valid',
		element: document.querySelector('label[for="email"] .input-requirements li:nth-child(2)')
	}
];


var passwordValidityChecks = [
	{
		isInvalid: function(input) {
			return input.value.length < 8 | input.value.length > 40;
		},
		invalidityMessage: 'This input needs to be between 8 and 40 characters',
		element: document.querySelector('label[for="password"] .input-requirements li:nth-child(1)')
	}
];

var passwordRepeatValidityChecks = [
	{
		isInvalid: function() {
			return passwordRepeatInput.value != passwordInput.value;
		},
		invalidityMessage: 'This password needs to match the first one'

	}
];


/*********************************Email and Password Validity Checks END***********************************/

/* ----------------------------

	Setup CustomValidation

	Setup the CustomValidation prototype for each input
	Also sets which array of validity checks to use for that input

---------------------------- */

var firstnameInput = document.getElementById('firstname');
var lastnameInput = document.getElementById('lastname');
var streetaddressInput = document.getElementById('streetaddress');
var cityInput = document.getElementById('city');
var stateInput = document.getElementById('state');
var zipcodeInput = document.getElementById('zipcode');
var phonenumberInput = document.getElementById('phonenumber');
var emailInput = document.getElementById('email');
var passwordInput = document.getElementById('password');
var passwordRepeatInput = document.getElementById('password_repeat');

firstnameInput.CustomValidation = new CustomValidation(firstnameInput);
firstnameInput.CustomValidation.validityChecks = firstnameValidityChecks;

lastnameInput.CustomValidation = new CustomValidation(lastnameInput);
lastnameInput.CustomValidation.validityChecks = lastnameValidityChecks;

streetaddressInput.CustomValidation = new CustomValidation(streetaddressInput);
streetaddressInput.CustomValidation.validityChecks = streetaddressValidityChecks;

cityInput.CustomValidation = new CustomValidation(cityInput);
cityInput.CustomValidation.validityChecks = cityValidityChecks;

stateInput.CustomValidation = new CustomValidation(stateInput);
stateInput.CustomValidation.validityChecks = stateValidityChecks;

zipcodeInput.CustomValidation = new CustomValidation(zipcodeInput);
zipcodeInput.CustomValidation.validityChecks = zipcodeValidityChecks;

phonenumberInput.CustomValidation = new CustomValidation(phonenumberInput);
phonenumberInput.CustomValidation.validityChecks = phonenumberValidityChecks;

emailInput.CustomValidation = new CustomValidation(emailInput);
emailInput.CustomValidation.validityChecks = emailValidityChecks;

passwordInput.CustomValidation = new CustomValidation(passwordInput);
passwordInput.CustomValidation.validityChecks = passwordValidityChecks;

passwordRepeatInput.CustomValidation = new CustomValidation(passwordRepeatInput);
passwordRepeatInput.CustomValidation.validityChecks = passwordRepeatValidityChecks;




/* ----------------------------

	Event Listeners

---------------------------- */

var inputs = document.querySelectorAll('input:not([type="submit"])');


var submit = document.querySelector('input[type="submit"');
var form = document.getElementById('registration');

function validate() {
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].CustomValidation.checkInput();
	}
}

submit.addEventListener('click', validate);
form.addEventListener('submit', validate);



function results(){

	var firstname = document.getElementById('firstname').value;
	var lastname = document.getElementById('lastname').value;

	document.write("<h1> Thank you, please review your responses</h1>");
	document.write("<p>Firstname: </p>" + firstname + "<br/>");
	document.write("<p>Lastname: </p>" + lastname + "<br/>");
}