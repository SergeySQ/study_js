/* let money = prompt("Ваш месячный доход?", 50000),
	income = "Фриланс",
	addExpenses = prompt(
		"Перечислите возможные расходы за рассчитываемый период через запятую",
		"иНтернет, такси, коммуналка"
	),
	deposit = prompt("Есть ли у вас депозит в банке?", false),
	mission = 1000000,
	period = 6,
	budgetDay,
	budgetMonth;
let expensesName, expensesAmount;
for (let i = 0; i < 2; i++) {
	expensesName = prompt(
		"Введите обязательную статью расходов?",
		"time-coffi"
	);
	expensesAmount = +prompt("Во сколько это обойдется?", 1000);
}
expensesName = prompt("Введите обязательную статью расходов?", "time-coffi");
let expensesName2 = prompt(
	"Введите обязательную статью расходов?",
	"time-coffi"
);
expensesAmount = +prompt("Во сколько это обойдется?");
let expensesAmount2 = +prompt("Во сколько это обойдется?");

budgetMonth = money - (expensesAmount + expensesAmount);
budgetDay = Math.floor(budgetMonth / 30);

if (budgetDay >= 1200) {
	console.log("У вас высокий уровень дохода");
} else if (budgetDay < 600 && budgetDay < 1200) {
	console.log("У вас средний уровень дохода");
} else if (budgetDay < 600) {
	console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay === false) {
	console.log("Что то пошло не так");
}

console.log(
	"Цель будет достигнута за: ",
	Math.ceil(mission / budgetMonth),
	" месяцев"
);
console.log(
	"Период равен " + period + " месяцев Цель заработать ",
	mission,
	" Рублей"
);

console.log(addExpenses.toLowerCase().split());
console.log("Бюджет на день: ", budgetDay);
console.log("Бюджет на месяц: ", budgetMonth);
 */

"use strict";

/* function arg(str) {
	str = "a";
	if (typeof str === "string") {
		alert("Выввели не строку");
		return;
	}

	str = str.trim();
	return str.length > 30 ? str.slice(0, 30) + "..." : str;
}
console.log(arg());
 */
"use strict";
let isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};
let isStr = function (str) {
	let reg = /^[a-zA-Zа-яА-Я ,]+$/;
	return reg.test(str);
}
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
	percentDeposit: 0,
	moneyDeposit: 0,
	mission: 100000,
	period: 6,
	expenses1: [],
	asking: function () {
		let itemIncome,
			cashIcome;

		if (confirm("Есть ли у вас дополнительный источник заработка?")) {
			do {
				itemIncome = prompt(
					"Какой у вас дополнительный заработок на",
					"починке"
				);
			} while (!isStr(itemIncome));
			do {
				cashIcome = +prompt(
					"Сколько в месяц вы на " + itemIncome + " зарабатываете",
					10000
				);
			} while (!isNumber(cashIcome));
			appData.income[itemIncome] = cashIcome;
		}


		let addExpenses = prompt(
			"Перечислите возможные расходы за рассчитываемый период через запятую",
			"Вода,Свет,Инет"
		);

		appData.deposit = confirm("Есть ли у вас депозит в банке?");
		appData.addExpenses = addExpenses.toLowerCase().split(",");

		let expensesName,
			result = 0,
			expensesAmount;

		for (let i = 0; i < 2; i++) {
			expensesName = prompt("Введите обязательную статью расходов?");
			do {
				expensesAmount = parseInt(
					prompt(
						"Во сколько обойдется" + " " + expensesName + "?",
						5000
					)
				);
				result += +expensesAmount;
			} while (!isNumber(expensesAmount));
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
	getInfoDeposit: function () {
		if (appData.deposit) {
			appData.percentDeposit = prompt("Какой годовой процент", "10");
			appData.moneyDeposit = prompt("Какой сумма заложена?", 10000);
		}
	},
	calcSavedMoney: function () {
		return appData.budgetMonth * appData.period;
	},
};
appData.asking();
appData.getBudget();
appData.getInfoDeposit();
console.log(appData.budget);
console.log(appData.addExpenses);
appData.getExpensesMonth();
console.log("Расходы за месяц: " + appData.expensesMonth);
console.log("Бюджет на месяц: " + appData.budgetMonth);
console.log("Дневной бюджет: " + appData.budgetDay);
console.log("Цель заработать: " + appData.mission + " рублей");
appData.getStatusIncome();
console.log("Период " + appData.period + " месяцeв ");

if (appData.getTargetMonth() > 0) {
	alert(
		"Цель будет достигнута за: " +
		appData.getTargetMonth() +
		" " +
		"месяцев"
	);
} else {
	alert("Цель не будет достигнута");
}
console.log(
	"Цель будет достигнута за " + appData.getTargetMonth() + " месяцев"
);
console.log("Наша программа включает в себя данные: ");
for (const key in appData) {
	console.log(key + " : " + appData[key]);
}

console.log(appData);