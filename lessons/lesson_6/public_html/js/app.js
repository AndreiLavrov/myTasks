'use strict';

function eventListeners() {

    const ui = new UI();

    ui.budgetForm.addEventListener('submit', function(event) {
       event.preventDefault();
       ui.submitBudgetForm();
    });

    ui.expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        ui.submitExpenceForm();
    });

    ui.expenseList.addEventListener('click', function (event) {
        event.preventDefault();
        if (event.target.parentElement.classList.contains('edit-icon')) {
            ui.editExpense(event.target.parentElement);
        } else if (event.target.parentElement.classList.contains('delete-icon')) {
            ui.deleteExpense(event.target.parentElement);
        }
    });

    ui.saveBtn.addEventListener('click', function(){
       event.preventDefault();
       ui.saveData();
    });

    ui.loadData();
}

document.addEventListener('DOMContentLoaded', function(){
   eventListeners();
});
