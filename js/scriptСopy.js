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
	cancel = document.getElementById("cancel"),
	btnPlus = document.getElementsByTagName("button"),
	incomePlus = btnPlus[0],
	expensesPlus = btnPlus[1],
	depositCheck = document.querySelector("#deposit-check"),
	additionalIncomeItem = document.querySelectorAll(".additional_income-item"),
	budgetMonthValue = document.getElementsByClassName("budget_month-value")[0],
	budgetDayValue = document.getElementsByClassName("budget_day-value")[0],
	expensesMonthValue = document.getElementsByClassName(
		"expenses_month-value"
	)[0],
	additionalIncomeValue = document.getElementsByClassName(
		"additional_income-value"
	)[0],
	additionalExpensesValue = document.getElementsByClassName(
		"additional_expenses-value"
	)[0],
	incomePeriodValue = document.getElementsByClassName(
		"income_period-value"
	)[0],
	targetMonthValue = document.getElementsByClassName("target_month-value")[0],
	salaryAmount = document.querySelector(".salary-amount"),
	incomeTitle = document.querySelector(".income-items .income-title"),
	expensesTitle = document.querySelector(".expenses-items .expenses-title"),
	expensesItems = document.querySelectorAll(".expenses-items"),
	additionalExpensesItem = document.querySelector(
		".additional_expenses-item"
	),
	targetAmount = document.querySelector(".target-amount"),
	periodAmount = document.querySelector(".period-amount"),
	periodSelect = document.querySelector(".period-select"),
	incomeItem = document.querySelectorAll(".income-items"),
	main = document.querySelector("main");

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
		this.budget = parseInt(salaryAmount.value);

		this.getExpenses();
		this.getIncome(Object.values(this.income));
		this.getExpensesMonth(Object.values(this.expenses));
		this.getAddExpenses();
		this.getAddIncome();
		this.getBudget();
		this.showReset();
		console.log("this", this);
		this.showResult();
	},
	//Вывод результатов вычислений в правую часть
	showResult: function () {
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(", ");
		additionalIncomeValue.value = this.addIncome.join(", ");
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcPeriod();

		periodSelect.addEventListener("input", function () {
			incomePeriodValue.value = appData.calcPeriod();
		});
	},
	showReset: function () {
		document
			.querySelectorAll("input[type = text]")
			.forEach((item) => (item.disabled = true));
		incomePlus.disabled = true;
		expensesPlus.disabled = true;
		depositCheck.disabled = true;
		start.style.display = "none";
		cancel.style.display = "block";
	},
	//Отключение кнопки которая добавляла дополнительные Обязательные расходы
	addExpensesBlock: function () {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(
			cloneExpensesItem,
			expensesPlus
		);
		expensesItems = document.querySelectorAll(".expenses-items");
		if (expensesItems.length === 3) {
			expensesPlus.style.display = "none";
		}
	},
	//Обязательные расходы
	getExpenses: function () {
		expensesItems.forEach(function (item) {
			let itemExpenses = item.querySelector(".expenses-title").value;
			let cashExpenses = item.querySelector(".expenses-amount").value;
			if (itemExpenses !== "" && cashExpenses !== "") {
				appData.expenses[itemExpenses] = cashExpenses;
			}
		});
	},
	//Функция клонирует div.income-items по нажатию кнопки "+"
	addIncomeBlock: function (e) {
		let cloneIncomeItem = incomeItem[0].cloneNode(true);
		incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
		incomeItem = document.querySelectorAll(".income-items");
		if (incomeItem.length === 3) {
			incomePlus.style.display = "none";
		}
	},
	//Дополнительные доходы
	getIncome: function () {
		incomeItem.forEach(function (item) {
			let itemIncome = item.querySelector(".income-title").value,
				cashIncome = item.querySelector(".income-amount").value;
			if (itemIncome !== " " && cashIncome !== "") {
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
		if (this.deposit) {
			do {
				this.percentDeposite = parseInt(
					prompt("Какой у Вас годовой процент?", "10")
				);
			} while (!isNumber(this.percentDeposite));
			do {
				this.moneyDeposite = parseInt(
					prompt("Какая сумма заложена?", 10000)
				);
			} while (!isNumber(this.moneyDeposite));
		}
	},
	getExpensesMonth: function () {
		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
		return this.expensesMonth;
	},
	getBudget: function () {
		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(appData.budgetMonth / 30);
		return this.budgetMonth;
	},
	//Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления
	getTargetMonth: function () {
		return targetAmount.value / this.getBudget();
	},
	getStatusIncome: function () {
		if (this.budgetDay >= 1200) {
			console.log("У Вас высокий уровень дохода!");
		} else if (this.budgetDay <= 1200 && this.budgetDay >= 600) {
			console.log("У Вас средний уровень дохода!");
		} else if (this.budgetDay <= 600 && this.budgetDay >= 0) {
			console.log("К сожалению у вас уровень дохода ниже среднего");
		} else {
			console.log("Что-то пошло не так");
		}
	},

	calcPeriod: function () {
		return this.budgetMonth * periodSelect.value;
	},
};
//Сброс данных
cancel.addEventListener("click", function () {
	document.querySelectorAll("input[type = text]").forEach((item) => {
		item.value = "";
		item.disabled = false;
	});
	cancel.style.display = "none";
	start.style.display = "block";
	Object.values(incomeItem)
		.slice(1)
		.forEach((item) => item.remove());
	incomePlus.style.display = "block";

	Object.values(expensesItems)
		.slice(1)
		.forEach((item) => item.remove());
	expensesPlus.style.display = "block";

	start.style.display = "block";
	cancel.style.display = "none";

	appData.budget = 0;
	appData.budgetDay = 0;
	appData.budgetMonth = 0;
	appData.expensesMonth = 0;
	appData.income = {};
	appData.incomeMonth = 0;
	appData.addIncome = [];
	appData.expenses = {};
	appData.addExpenses = [];
	appData.deposit = false;
	appData.percentDeposit = 0;
	appData.moneyDeposit = 0;
	appData.period = 0;
});
salaryAmount.addEventListener("input", function () {
	if (salaryAmount.value === "") {
		start.disabled = true;
	} else {
		start.disabled = false;
	}
});
start.addEventListener("click", appData.start.bind(appData));
expensesPlus.addEventListener("click", appData.addExpensesBlock);
incomePlus.addEventListener("click", appData.addIncomeBlock);
//Число под полоской  меняеться в зависимости от позиции range, используем событие input.
periodSelect.addEventListener("input", () => {
	periodAmount.textContent = periodSelect.value;
});

//Валидция полей
let inputName = document.querySelectorAll(
		'input[placeholder = "Наименование"]'
	),
	inputAmount = document.querySelectorAll('input[placeholder = "Сумма"]');

inputName.forEach((item) => {
	item.addEventListener("input", function (e) {
		if (e.target.value !== "" && !isStr(e.target.value)) {
			alert("В данном поле допустимы только буквы русского алфавита!");
			e.target.value = e.target.value.replace(/[^а-яА-Я ,]+$/g, "");
		}
	});
});

inputAmount.forEach((item) => {
	item.addEventListener("input", function (e) {
		if (e.target.value !== "" && !isNumber(e.target.value)) {
			alert("В данном поле допустимы только цифры!");
			e.target.value = e.target.value.replace(/[^\d]+$/g, "");
		}
	});
});

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
/* console.log("Бюджет на месяц " + appData.budgetMonth);
console.log("Бюджет на день " + appData.budgetDay);
console.log(
	"Цель заработать " + appData.mission + " " + "рублей/долларов/гривен/юани"
); */