"use strict";
//Функция проверяет является числом или нет
let isNumber = function (n) {
	return !isNaN(parseFloat(n)) & isFinite(n);
};

//Функция проверяет является буквой или нет
let isStr = function (str) {
	let reg = /^[a-zA-Zа-яА-Я ,]+$/;
	return reg.test(str);
};

//Получить каждый элемент в отдельную переменную
let start = document.getElementById("start"),
	btnPlus = document.getElementsByTagName('button'),
	incomePlus = btnPlus[0],
	expensesPlus = btnPlus[1],
	depositCheck = document.querySelector('#deposit-check'),
	additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
	budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
	budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
	expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
	additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
	additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
	incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
	targetMonthValue = document.getElementsByClassName('target_month-value')[0],
	salaryAmount = document.querySelector('.salary-amount'),
	incomeTitle = document.querySelector('.income-items .income-title'),
	expensesTitle = document.querySelector('.expenses-items .expenses-title'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	additionalExpensesItem = document.querySelector('.additional_expenses-item'),
	targetAmount = document.querySelector('.target-amount'),
	periodAmount = document.querySelector('.period-amount'),
	periodSelect = document.querySelector('.period-select'),
	incomeItem = document.querySelectorAll('.income-items');

//28:51

let appData = {
	income: {},
	addIncome: [],
	incomeMonth: 0,
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposite: 0,
	moneyDeposite: 0,
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	//Вызывается по клику "Расчитать"
	start: function () {

		//Месячный доход  
		appData.budget = parseInt(salaryAmount.value);

		appData.getExpenses();
		appData.getIncome();
		appData.getExpensesMonth();
		appData.getAddExpenses();
		appData.getAddIncome();
		appData.getBudget();

		appData.showResult();



	},
	//Вывод результатов вычислений в правую часть
	showResult: function () {
		budgetMonthValue.value = appData.budgetMonth;
		budgetDayValue.value = appData.budgetDay;
		expensesMonthValue.value = appData.expensesMonth;
		additionalExpensesValue.value = appData.addExpenses.join(', ');
		additionalIncomeValue.value = appData.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(appData.getTargetMonth());
		incomePeriodValue.value = appData.calcPeriod();

		periodSelect.addEventListener('input', function () {
			incomePeriodValue.value = appData.calcPeriod();
		});
	},
	//Отключение кнопки которая добавляла дополнительные Обязательные расходы
	addExpensesBlock: function () {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		}
	},
	//Обязательные расходы
	getExpenses: function () {
		expensesItems.forEach(function (item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				appData.expenses[itemExpenses] = cashExpenses;
			}
		});
	},
	//Функция клонирует div.income-items по нажатию кнопки "+"
	addIncomeBlock: function (e) {
		let cloneIncomeItem = incomeItem[0].cloneNode(true);
		incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
		incomeItem = document.querySelectorAll('.income-items');
		if (incomeItem.length === 3) {
			incomePlus.style.display = 'none';
		}


	},
	//Дополнительные доходы
	getIncome: function () {
		incomeItem.forEach(function (item) {
			let itemIncome = item.querySelector('.income-title').value,
				cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== ' ' && cashIncome !== '') {
				appData.income[itemIncome] = cashIncome;
			}
		});
		for (let key in appData.income) {
			appData.incomeMonth += +appData.income[key];
		}
	},
	//Получить возможные расходы
	getAddExpenses: function () {
		let addExpenses = additionalExpensesItem.value.split(",");
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== " ") {
				appData.addExpenses.push(item);
			}
		});
	},
	//Получить возможные доходы
	getAddIncome: function () {
		additionalIncomeItem.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== "") {
				appData.addIncome.push(itemValue);
			}
		});
	},
	asking: function () {
		let addExpenses;
		do {
			addExpenses = prompt(
				"Перечислите возможные расходы за рассчитываемый период через запятую"
			);
		} while (!isStr(addExpenses));
		appData.addExpenses = addExpenses
			.toLowerCase()
			.split(",")
			.map((i) => i.trim());
		appData.deposit = confirm("Есть ли у вас депозит в банке?");

		let expensesName, expensesAmount;

		for (let i = 0; i < 2; i++) {
			do {
				expensesName = prompt("Введите обязательную статью расходов?");
			} while (!isStr(expensesName));
			do {
				expensesAmount = parseInt(
					prompt(
						"Во сколько обойдется" + " " + expensesName + "?",
						1000
					)
				);
			} while (!isNumber(expensesAmount));
			appData.expenses[expensesName] = expensesAmount;
		}
	},
	getInfoDeposite: function () {
		if (appData.deposit) {
			do {
				appData.percentDeposite = parseInt(
					prompt("Какой у Вас годовой процент?", "10")
				);
			} while (!isNumber(appData.percentDeposite));
			do {
				appData.moneyDeposite = parseInt(
					prompt("Какая сумма заложена?", 10000)
				);
			} while (!isNumber(appData.moneyDeposite));
		}
	},
	getExpensesMonth: function () {
		for (let key in appData.expenses) {
			appData.expensesMonth += +appData.expenses[key];
		}
		return appData.expensesMonth;
	},
	getBudget: function () {
		appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
		return appData.budgetMonth;
	},
	//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
	getTargetMonth: function () {
		return targetAmount.value / appData.getBudget();
	},
	getStatusIncome: function () {
		if (appData.budgetDay >= 1200) {
			console.log("У Вас высокий уровень дохода!");
		} else if ((appData.budgetDay <= 1200) & (appData.budgetDay >= 600)) {
			console.log("У Вас средний уровень дохода!");
		} else if ((appData.budgetDay <= 600) & (appData.budgetDay >= 0)) {
			console.log("К сожалению у вас уровень дохода ниже среднего");
		} else {
			console.log("Что-то пошло не так");
		}
	},

	calcPeriod: function () {
		return appData.getBudget() * periodSelect.value;
	},
};

salaryAmount.addEventListener('input', function () {
	if (salaryAmount.value === '') {
		start.disabled = true;
	} else {
		start.disabled = false;
		start.addEventListener('click', appData.start);
	}
});

expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
//Число под полоской  меняеться в зависимости от позиции range, используем событие input.
periodSelect.addEventListener('input', () => {
	periodAmount.textContent = periodSelect.value;
});

console.log("Бюджет на месяц " + appData.budgetMonth);
console.log("Бюджет на день " + appData.budgetDay);
console.log(
	"Цель заработать " + appData.mission + " " + "рублей/долларов/гривен/юани"
);

/* if (appData.getTargetMonth() > 0) {
	console.log('Цель будет достигнута за: ' + appData.getTargetMonth() + ' ' + 'месяцев');
} else {
	console.log('Цель не будет достигнута'); 
}
*/
/* console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
	console.log(key, appData[key]);
}
 */
/* console.log(appData.percentDeposite, appData.moneyDeposite, appData.calcSavedMoney());
console.log(appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', ')); */



//Валидция полей
let inputName = document.querySelectorAll('input[placeholder = "Наименование"]'),
	inputAmount = document.querySelectorAll('input[placeholder = "Сумма"]');

inputName.forEach(item => {
	item.addEventListener('input', function (e) {
		if ((e.target.value !== '') && (!isStr(e.target.value))) {
			alert('В данном поле допустимы только буквы русского алфавита!');
			e.target.value = e.target.value.replace(/[^а-яА-Я ,]+$/g, '');
		}
	});
});

inputAmount.forEach(item => {
	item.addEventListener('input', function (e) {
		if ((e.target.value !== '') && (!isNumber(e.target.value))) {
			alert('В данном поле допустимы только цифры!');
			e.target.value = e.target.value.replace(/[^\d]+$/g, '');
		}
	});
});