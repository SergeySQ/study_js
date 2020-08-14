"use strict";
let isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
let money,
	start = function () {
		do {
			money = prompt("Ваш месячный доход?", 50000);
		} while (!isNumber(money));
	};

start();
let appData = {
	budgetDay: 0,
	budgetMonth: 0,
	expensesMonth: 0,
	budget: money,
	income: {},
	adIncome: [],
	expenses: {},
	addExpenses: [],
	deposit: false,
	mission: 100000,
	period: 6,
	expenses1: [],
	asking: function () {
		let addExpenses = prompt(
			"Перечислите возможные расходы за рассчитываемый период через запятую", 'Вода,Свет,Инет'
		);

		appData.deposit = confirm("Есть ли у вас депозит в банке?");
		appData.addExpenses = addExpenses.toLowerCase().split(",");


		let expensesName,
			result = 0,
			expensesAmount;

		for (let i = 0; i < 2; i++) {
			expensesName = prompt('Введите обязательную статью расходов?');
			do {
				expensesAmount = parseInt(prompt('Во сколько обойдется' + ' ' + expensesName + '?', 5000));
				result += +expensesAmount;
			}
			while (!isNumber(expensesAmount));
			appData.expenses[expensesName] = expensesAmount;

		}
		return result;
	},
	getExpensesMonth: function () {

		let accum = 0;
		for (let key in appData.expenses) {
			accum += appData.expenses[key];
		}
		appData.expensesMonth = accum;
		return accum;

	},
	getBudget: function () {
		appData.budgetMonth = appData.budget - appData.expensesMonth;
		appData.budgetDay = Math.floor(appData.budgetMonth / 30);
	},
	getTargetMonth: function () {
		return Math.ceil(appData.mission / appData.budgetMonth);
	},
	getStatusIncome: function () {
		if (appData.budgetDay > 1200) {
			return "У вас высокий уровень дохода";
		} else if (appData.budgetDay > 600 && appData.budgetDay < 1200) {
			return "У вас средний уровень дохода";
		} else if (appData.budgetDay < 0) {
			return "Что то пошло не так";
		} else if (appData.budgetDay < 600) {
			return "К сожалению у вас уровень дохода ниже среднего";
		} else {
			return "Ошибка";
		}
	},

};
appData.asking();
appData.getBudget();
console.log(appData.budget);
console.log(appData.addExpenses);
appData.getExpensesMonth();
console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log("Бюджет на месяц: " + appData.budgetMonth);
console.log("Дневной бюджет: " + appData.budgetDay);
console.log("Цель заработать: " + appData.mission + " рублей");
appData.getStatusIncome();
console.log("Период " + appData.period + " месяцeв ");



if (appData.getTargetMonth() > 0) {
	alert('Цель будет достигнута за: ' + appData.getTargetMonth() + ' ' + 'месяцев');
} else {
	alert('Цель не будет достигнута');
}
console.log(
	"Цель будет достигнута за " +
	appData.getTargetMonth() +
	" месяцев"
);
console.log('Наша программа включает в себя данные: ');
for (const key in appData) {
	console.log(key + ' : ' + appData[key]);
}

console.log(appData);