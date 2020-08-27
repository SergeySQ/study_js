"use strict";
//Функция проверяет является числом или нет


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


class AppData {
	constructor() {
		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.period = 0;
	}
	//Функция проверяет является числом или нет
	isNumber(n) {
		return !isNaN(parseFloat(n)) & isFinite(n);
	}
	//Функция проверяет является буквой или нет
	isStr(str) {
		let reg = /^[a-zA-Zа-яА-Я ,]+$/;
		return reg.test(str);
	}
	//Вызывается по клику "Расчитать"
	start() {
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
	}
	//Вывод результатов вычислений в правую часть
	showResult() {
		const self = this;
		budgetMonthValue.value = this.budgetMonth;
		budgetDayValue.value = this.budgetDay;
		expensesMonthValue.value = this.expensesMonth;
		additionalExpensesValue.value = this.addExpenses.join(', ');
		additionalIncomeValue.value = this.addIncome.join(', ');
		targetMonthValue.value = Math.ceil(this.getTargetMonth());
		incomePeriodValue.value = this.calcPeriod();

		periodSelect.addEventListener('input', function () {
			incomePeriodValue.value = self.calcPeriod();
		});

		console.log(appData);
	}
	//Скрывает кнопку рассчитать и после этого мы показываем кнопку сброса 'reset' , потом отключаем все инпуты и плюсики и чекбоксы
	showReset() {
		document
			.querySelectorAll("input[type = text]")
			.forEach((item) => (item.disabled = true));
		incomePlus.disabled = true;
		expensesPlus.disabled = true;
		depositCheck.disabled = true;
		start.style.display = "none";
		cancel.style.display = "block";
	}
	//функция сброса внесенных данных  appData
	reset() {
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

		periodSelect.value = 1;
		periodAmount.textContent = 0;

		start.style.display = "block";
		cancel.style.display = "none";

		this.budget = 0;
		this.budgetDay = 0;
		this.budgetMonth = 0;
		this.expensesMonth = 0;
		this.income = {};
		this.incomeMonth = 0;
		this.addIncome = [];
		this.expenses = {};
		this.addExpenses = [];
		this.deposit = false;
		this.percentDeposit = 0;
		this.moneyDeposit = 0;
		this.period = 0;
	}
	//Функция клонирует div.expenses-items по нажатию кнопки "+"
	addExpensesBlock() {
		let cloneExpensesItem = expensesItems[0].cloneNode(true);
		expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
		expensesItems = document.querySelectorAll('.expenses-items');
		if (expensesItems.length === 3) {
			expensesPlus.style.display = 'none';
		}

	}
	getExpenses() {
		const _this = this;
		expensesItems.forEach(function (item) {
			let itemExpenses = item.querySelector('.expenses-title').value;
			let cashExpenses = item.querySelector('.expenses-amount').value;
			if (itemExpenses !== '' && cashExpenses !== '') {
				_this.expenses[itemExpenses] = cashExpenses;
			}
		});
	}
	//Функция клонирует div.income-items по нажатию кнопки "+"
	addIncomeBlock() {
		let cloneIncomeItem = incomeItem[0].cloneNode(true);
		incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
		incomeItem = document.querySelectorAll('.income-items');
		if (incomeItem.length === 3) {
			incomePlus.style.display = 'none';
		}
	}
	getIncome() {
		const _this = this;
		incomeItem.forEach(function (item) {
			let itemIncome = item.querySelector('.income-title').value;
			let cashIncome = item.querySelector('.income-amount').value;
			if (itemIncome !== '' && cashIncome !== '') {
				_this.income[itemIncome] = cashIncome;
			}
		});

		for (let key in this.income) {
			this.incomeMonth += +this.income[key];
		}
	}
	//Получить возможные доходы
	getAddIncome() {
		const _this = this;
		additionalIncomeItem.forEach(function (item) {
			let itemValue = item.value.trim();
			if (itemValue !== '') {
				_this.addIncome.push(itemValue);
			}
		});
	}
	//Получить возможные расходы
	getAddExpenses() {
		let addExpenses = additionalExpensesItem.value.split(',');
		const _this = this;
		addExpenses.forEach(function (item) {
			item = item.trim();
			if (item !== '') {
				_this.addExpenses.push(item);
			}
		});
	}
	//Функция возвращает сумму всех обязательных расходов за месяц
	getExpensesMonth() {

		for (let key in this.expenses) {
			this.expensesMonth += +this.expenses[key];
		}
		return this.expensesMonth;
	}
	//Функция возвращает Накопления за месяц (Доходы минус расходы)
	getBudget() {

		this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
		this.budgetDay = Math.floor(this.budgetMonth / 30);
		return this.budgetMonth;
	}
	//Подсчитывает за какой период будет достигнута цель
	getTargetMonth() {
		return targetAmount.value / this.getBudget();
	}
	//Функция оценивает уровень дохода пользователя
	getStatusIncome() {
		if (this.budgetDay >= 1200) {
			return 'У вас высокий уровень дохода';
		} else if ((this.budgetDay < 1200) && (this.budgetDay > 600)) {
			return 'У вас средний уровень дохода';
		} else if ((this.budgetDay <= 600) && (this.budgetDay >= 0)) {
			return 'К сожалению у вас уровень дохода ниже среднего';
		} else {
			return 'Что то пошло не так';
		}
	}
	getInfoDeposit() {
		const self = this;
		if (this.deposit) {
			do {
				this.percentDeposite = parseInt(
					prompt("Какой у Вас годовой процент?", "10")
				);
			} while (!(self.isNumber(this.percentDeposite)));
			do {
				this.moneyDeposite = parseInt(
					prompt("Какая сумма заложена?", 10000)
				);
			} while (!(self.isNumber(this.moneyDeposite)));
		}
	}
	//Функция выдвет информацию сколько можно накопить за опрделенный период
	calcPeriod() {
		return this.budgetMonth * periodSelect.value;
	}
	//Функция слушателей
	eventListeners() {



		//bind function 'start' with object 'appData' 
		start.addEventListener('click', this.start.bind(appData));

		//bind function 'start' with object 'appData' 
		cancel.addEventListener('click', this.reset.bind(appData));

		incomePlus.addEventListener('click', this.addIncomeBlock);
		expensesPlus.addEventListener('click', this.addExpensesBlock);

		periodSelect.addEventListener('input', function () {
			periodAmount.textContent = periodSelect.value;
		});

		//Валидция полей
		let inputName = document.querySelectorAll(
				'input[placeholder = "Наименование"]'
			),
			inputAmount = document.querySelectorAll('input[placeholder = "Сумма"]');
		const self = this;
		inputName.forEach((item) => {
			item.addEventListener("input", function (e) {
				if (e.target.value !== "" && !(self.isStr(e.target.value))) {
					alert("В данном поле допустимы только буквы русского алфавита!");
					e.target.value = e.target.value.replace(/[^а-яА-Я ,]+$/g, "");
				}
			});
		});

		inputAmount.forEach((item) => {
			item.addEventListener("input", function (e) {
				if (e.target.value !== "" && !(self.isNumber(e.target.value))) {
					alert("В данном поле допустимы только цифры!");
					e.target.value = e.target.value.replace(/[^\d]+$/g, "");
				}
			});
		});


	}
}

const appData = new AppData();

appData.eventListeners();
console.log(appData);







/* salaryAmount.addEventListener("input", function () {
	if (salaryAmount.value === "") {
		start.disabled = true;
	} else {
		start.disabled = false;
	}
}); */

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