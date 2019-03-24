'use strict';

function UI() {
    this.budgetFeedback = document.querySelector('.budget-feedback');
    this.expenseFeedback = document.querySelector('.expense-feedback');
    this.budgetForm = document.getElementById('budget-form');
    this.budgetInput = document.getElementById('budget-input');
    this.budgetAmount = document.getElementById('budget-amount');
    this.expenseAmount = document.getElementById('expense-amount');
    this.expenseForm = document.getElementById('expense-form');
    this.expenseInput = document.getElementById('expense-input');
    this.amountInput = document.getElementById('amount-input');
    this.expenseList = document.getElementById('expense-list');
    this.saveBtn = document.getElementById('save-button');
    this.balance = document.getElementById('balance');
    this.balanceAmount = document.getElementById('balance-amount');
    this.itemID = 0;
    this.itemList = [];
}

UI.prototype.submitBudgetForm = function() {
    const val = this.budgetInput.value;
    const currentValue = parseInt(this.budgetAmount.textContent);

    if (val === '' || val < 0) {
        this.validation('budgetFeedback', null, 1000);
        return false;
    }

    this.budgetAmount.textContent = +val +  +currentValue;
    this.budgetInput.value = '';
    this.showBalance();
};

UI.prototype.validation = function(form, msg, timer) {
    msg = msg || `<p>Value should be more than 0 and not to be empty</p>`;
    timer = timer || 3000;
    const self = this;

    this[form].classList.add('showItem');
    this[form].innerHTML = msg;

    setTimeout(function(){
        self[form].classList.remove('showItem');
    }, timer);
};

UI.prototype.showBalance = function() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;

    this.balanceAmount.textContent = total;

    if (total < 0) {
        this.balance.classList.remove('showGreen');
        this.balance.classList.add('showRed');
    } else {
        this.balance.classList.remove('showRed');
        this.balance.classList.add('showGreen');
    }
};

UI.prototype.totalExpense = function() {
    let total = 0;

    if (this.itemList.length > 0) {
        total = this.itemList.reduce(function(acc, cur) {
            return acc + cur.amount;
        }, 0);
    }

    this.expenseAmount.innerText = total;

    return total;
};

UI.prototype.submitExpenceForm = function() {
    const expenceValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (expenceValue === '' || amountValue === '' || amountValue < 0) {
        this.validation('expenseFeedback');
        return false;
    }

    let amount = parseInt(amountValue);

    this.expenseInput.value = '';
    this.amountInput.value = '';

    let expence = {
        id: this.itemID,
        title: expenceValue,
        amount,
    };

    this.itemID++;
    this.itemList.push(expence);
    this.addExpence(expence);
    this.showBalance();
};

UI.prototype.addExpence = function(expence) {
    const div = document.createElement('div');
    div.classList.add('expence');
    div.innerHTML = `<div class="expense-item d-flex justify-content-between align-items-baseline">

         <h6 class="expense-title mb-0 text-uppercase list-item">${expence.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expence.amount}</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expence.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expence.id}" >
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>`;
    this.expenseList.appendChild(div);
};

UI.prototype.editExpense = function(element) {
    let id = parseInt(element.dataset.id);
    let expense = this.itemList.filter(function (item) {
        return item.id === id;
    });
    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;
    this.deleteExpense(element);
};

UI.prototype.deleteExpense = function(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    this.expenseList.removeChild(parent);
    this.itemList = this.itemList.filter(function(item) {
        return item.id !== id;
    });
    this.showBalance();
};

UI.prototype.saveData = function() {
    const data = {
        budgetAmount: this.budgetAmount.textContent,
        itemList: this.itemList,
        itemID: this.itemID,
    };

    localStorage.setItem('state', JSON.stringify(data));
};

UI.prototype.loadData = function() {
    if (!localStorage.getItem('state')) {
        return false;
    }

    const self = this;
    const data = JSON.parse(localStorage.getItem('state'));
    this.itemID = data.itemID;
    this.budgetAmount.textContent = data.budgetAmount;
    this.itemList = data.itemList;

    this.itemList.forEach(function(item){
        self.addExpence(item);
    });
    this.showBalance();
};