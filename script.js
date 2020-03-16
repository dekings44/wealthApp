const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionaire = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealth = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();

//Fetch random user and add money

async function getRandomUser() {
	const res = await fetch('https://randomuser.me/api/');
	const data = await res.json();

	const user = data.results[0];

	const newUser = {
		name: `${user.name.first} ${user.name.last}`,
		money: Math.floor(Math.random() * 1000000)
	};

	addData(newUser);
}

// Double everyone's money
function doubleMoney() {
	data = data.map(user => {
		return { ...user, money: user.money * 2 };
	});
	updateDOM();
}

// Sort everyone's money by wealth
function sortByWealth() {
	data.sort((a, b) => {
		return b.money - a.money;
	});
	updateDOM();
}

// Show only millionaires using filter method
function onlyMillioniares() {
	data = data.filter(amount => {
		return amount.money >= 1000000;
	});
	updateDOM();
}

//Add new obj to data arr
function addData(obj) {
	data.push(obj);

	updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
	// Clear main div
	main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

	providedData.forEach(item => {
		const element = document.createElement('div');
		element.classList.add('person');
		element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
			item.money
		)}`;
		main.appendChild(element);
	});
}

// Format number as money

function formatMoney(number) {
	return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney);
sortBtn.addEventListener('click', sortByWealth);
showMillionaire.addEventListener('click', onlyMillioniares);
