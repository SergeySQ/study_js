let money = +prompt("Ваш месячный доход?"),
  income = "фриланс",
  addExpenses = prompt(
    "Перечислите возможные расходы за рассчитываемый период через запятую"
  ),
  deposit = confirm("Есть ли у вас депозит в банке?", "false"),
  mission = 100000,
  period = 6,
  budgetDay,
  budgetMonth;
console.log(typeof money, typeof income, typeof deposit);
console.log(addExpenses.length);
console.log("Период равен " + period + " месяцам ");
console.log("Цель заработать " + mission + " рублей");
console.log(addExpenses.toLowerCase().split(","));

let expenses1 = prompt("Введите обязательную статью расходов?"),
  amount1 = +prompt("Во сколько это обойдется?"),
  expenses2 = prompt("Введите обязательную статью расходов?"),
  amount2 = +prompt("Во сколько это обойдется?");

budgetMonth = money - (amount1 + amount2);
console.log("Бюджет на месяц:", budgetMonth);

console.log(
  "Цель будет достигнута за:",
  Math.ceil(mission / budgetMonth) + " месяц(a/ев)"
);

budgetDay = budgetMonth / 30;
console.log("Дневной бюджет: ", Math.floor(budgetDay));

if (budgetDay > 1200) {
  console.log("У вас высокий уровень дохода");
} else if (budgetDay > 600 && budgetDay < 1200) {
  console.log("У вас средний уровень дохода");
} else if (budgetDay < 0) {
  console.log("Что то пошло не так");
} else if (budgetDay < 600) {
  console.log("К сожалению у вас уровень дохода ниже среднего");
} else if (budgetDay == 600 && budgetDay == 1200) {
  console.log("хорошо поработали");
} else {
  console.log("Ошибка");
}
