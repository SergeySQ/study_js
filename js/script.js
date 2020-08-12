"use strict";
let isNumber = function (n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
};


let money,
	income = "фриланс",
	addExpenses = prompt(
		"Перечислите возможные расходы за рассчитываемый период через запятую"
	),
	deposit = confirm("Есть ли у вас депозит в банке?"),
	mission = 100000,
	period = 6,
	budgetDay,
	expensesMonth,
	accumulatedMonth;


let start = function () {
	do {
		money = prompt('Ваш месячный доход?');
	}
	while (!isNumber(money));
};

start();

let showTypeOf = function (data) {
	console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(addExpenses.toLowerCase().split(","));
let expenses1 = [];

let getExpensesMonth = function () {
	let sum = 0;
	for (let i = 0; i < 2; i++) {
		expenses1[i] = prompt(
			"Введите обязательную статью расходов",
			"time-caffe"
		);
		while (isNumber(sum)) {
			sum += +prompt("Во сколько это обойдется?");
			break;
		}
	}
	console.log(sum);
	return sum;
};
expensesMonth = getExpensesMonth();
console.log('Расходы за месяц: ' + expensesMonth);
let getAccumulatedMonth = function () {
	return money - expensesMonth;
};
accumulatedMonth = getAccumulatedMonth();
console.log("Бюджет на месяц:", accumulatedMonth);

let getTargetMonth = function () {
	return Math.ceil(mission / accumulatedMonth);
};
if (getTargetMonth() <= 0) {
	console.log('Цель не будет достигнута');
} else {
	console.log('Цель будет достигнута');
}
console.log(
	"Цель будет достигнута за " +
	getTargetMonth(mission, accumulatedMonth) +
	" месяцев"
);

budgetDay = Math.floor(accumulatedMonth / 30);
console.log("Дневной бюджет: ", budgetDay);
let getStatusIncome = function () {
	if (budgetDay > 1200) {
		return "У вас высокий уровень дохода";
	} else if (budgetDay > 600 && budgetDay < 1200) {
		return "У вас средний уровень дохода";
	} else if (budgetDay < 0) {
		return "Что то пошло не так";
	} else if (budgetDay < 600) {
		return "К сожалению у вас уровень дохода ниже среднего";
	} else {
		return "Ошибка";
	}
};
console.log(getStatusIncome());
console.log("Период " + period + " месяцeв ");
console.log("Цель заработать " + mission + " рублей");