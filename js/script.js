'use strict';
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
const buttonСalculate = document.getElementById('#start'),
	buttonPlus = document.getElementsByTagName('button'),
	buttonAddIncome = buttonPlus[0],
	buttonAddExpenses = buttonPlus[1],
	checkboxDeposit = document.querySelector('#deposit-check'),
	inputAdditionalIncome = document.querySelectorAll('.additional_income-item'),
	inputBudgetMonth = document.querySelector('.salary-amount'),
	inputIncomeTitle = document.querySelector('.income-title'),
	inputIncomeAmount = document.querySelector('.income-amount'),
	inputExpensesTitle = document.querySelector('.expenses-title'),
	expensesItems = document.querySelectorAll('.expenses-items'),
	inputAdditionalExpensesItem = document.querySelector('.additional_expenses-item'),
	inputTargetAmount = document.querySelector('.target-amount'),
	rangePeriodSelect = document.querySelector('.period-select'),
	resultBudgetMonth = document.getElementsByClassName('budget_month-value'),
	resultBudgetDay = document.getElementsByClassName('budget_day-value'),
	resultExpensesMonth = document.getElementsByClassName('expenses_month-value'),
	resultAdditionalIncome = document.getElementsByClassName('additional_income-value'),
	resultAdditionalExpenses = document.getElementsByClassName('additional_expenses-value'),
	resultIncomePeriod = document.getElementsByClassName('income_period-value'),
	resultTargetMonth = document.getElementsByClassName('target_month-value');







let money,

	start = function () {
		do {
			money = prompt('Ваш месячный доход?', 30000);
		}
		while (!isNumber(money));
		return money;
	};

let appData = {
	income: {},
	addIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	percentDeposite: 0,
	moneyDeposite: 0,
	mission: 100000,
	period: 12,
	budget: 0,
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	asking: function () {

		if (confirm('Есть ли у Вас дополнительный заработок?')) {
			let incomeName,
				incomeAmount;

			do {
				incomeName = prompt('Какой у Вас дополнительный заработок?', 'Играю на пианино');
			}
			while (!isStr(incomeName));
			do {
				incomeAmount = parseInt(prompt('Сколь Вы зарабатываете в месяц на ' + incomeName + '?', 10000));
			}
			while (!isNumber(incomeAmount));
			appData.income[incomeAmount] = incomeName;
		}

		let addExpenses;
		do {
			addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
		}
		while (!isStr(addExpenses));
		appData.addExpenses = addExpenses.toLowerCase().split(',').map(i => i.trim());
		appData.deposit = confirm('Есть ли у вас депозит в банке?');

		let expensesName,
			expensesAmount;

		for (let i = 0; i < 2; i++) {
			do {
				expensesName = prompt('Введите обязательную статью расходов?');
			}
			while (!isStr(expensesName));
			do {
				expensesAmount = parseInt(prompt('Во сколько обойдется' + ' ' + expensesName + '?', 1000));
			}
			while (!isNumber(expensesAmount));
			appData.expenses[expensesName] = expensesAmount;
		}
	},
	getExpensesMonth: function () {
		let accum = 0;
		for (let key in appData.expenses) {
			accum += appData.expenses[key];
		}
		appData.expensesMonth = accum;
	},
	getBudget: function () {
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = Math.ceil(appData.budgetMonth / 30);
	},
	//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
	getTargetMonth: function () {
		return (Math.ceil(appData.mission / appData.budgetMonth));
	},
	getStatusIncome: function () {
		if (appData.budgetDay >= 1200) {
			console.log('У Вас высокий уровень дохода!');
		} else if ((appData.budgetDay < 1200) & (appData.budgetDay >= 600)) {
			console.log('У Вас средний уровень дохода!');
		} else if ((appData.budgetDay < 600) & (appData.budgetDay >= 0)) {
			console.log('К сожалению у вас уровень дохода ниже среднего');
		} else {
			console.log('Что-то пошло не так');
		}
	},
	getInfoDeposite: function () {
		if (appData.deposit) {
			do {
				appData.percentDeposite = parseInt(prompt('Какой у Вас годовой процент?', '10'));
			}
			while (!isNumber(appData.percentDeposite));
			do {
				appData.moneyDeposite = parseInt(prompt('Какая сумма заложена?', 10000));
			}
			while (!isNumber(appData.moneyDeposite));
		}
	},
	calcSavedMoney: function () {
		return (appData.budgetMonth * appData.period);
	}
};
appData.budget = start();
console.log(appData.budget);
appData.asking();
console.log(appData.addExpenses);
appData.getExpensesMonth();
console.log('Расходы за месяц ' + appData.expensesMonth);



appData.getBudget();
appData.getInfoDeposite();

console.log('Бюджет на месяц ' + appData.budgetMonth);
console.log('Бюджет на день ' + appData.budgetDay);
console.log('Цель заработать ' + appData.mission + ' ' + 'рублей/долларов/гривен/юани');

appData.getStatusIncome();

if (appData.getTargetMonth() > 0) {
	alert('Цель будет достигнута за: ' + appData.getTargetMonth() + ' ' + 'месяцев');
} else {
	alert('Цель не будет достигнута');
}

console.log('Наша программа включает в себя данные: ');
for (let key in appData) {
	console.log(key, appData[key]);
}

console.log(appData.percentDeposite, appData.moneyDeposite, appData.calcSavedMoney());
console.log(appData.addExpenses.map(n => `${n[0].toUpperCase()}${n.slice(1)}`).join(', '));