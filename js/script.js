"use strict";
let money = +prompt("Ваш месячный доход?", 50000),
	income = "фриланс",
	addExpenses = prompt("Перечислите возможные расходы за рассчитываемый период через запятую"),
	deposit = confirm("Есть ли у вас депозит в банке?"),
	mission = 100000,
	period = 6,
	budgetDay;

let showTypeOf = function (data) {
	console.log(data, typeof data);
};
showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);
console.log(income.length);
console.log(addExpenses.toLowerCase().split(","));
let expenses1 = prompt("Введите обязательную статью расходов?"),
	amount1 = +prompt("Во сколько это обойдется?", '8000'),
	expenses2 = prompt("Введите обязательную статью расходов?"),
	amount2 = +prompt("Во сколько это обойдется?", '8000');
let getExpensesMonth = function (amount1, amount2) {
	return amount1 + amount2;
};
getExpensesMonth(amount1, amount2);
console.log("Период " + period + " месяцeв ");
console.log("Цель заработать " + mission + " рублей");


let getAccumulatedMonth = function (money, getExpensesMonth) {
	return money - getExpensesMonth;
};
let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));
console.log("Бюджет на месяц:", accumulatedMonth);

let getTargetMonth = function (mission, accumulatedMonth) {
	return Math.ceil(mission / accumulatedMonth);
};
console.log('Цель будет достигнута за ' + getTargetMonth(mission, accumulatedMonth) + ' месяцев');
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
	} else if (budgetDay == 600 && budgetDay == 1200) {
		return "хорошо поработали";
	} else {
		return "Ошибка";
	}
};
console.log(getStatusIncome());