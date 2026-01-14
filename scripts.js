const form = document.querySelector('form');
const value = document.getElementById('amount');
const expenseName = document.getElementById('expense');
const category = document.getElementById("category");

const expenseList = document.querySelector("ul")
expenseList.addEventListener("click", function(event){
    if (event.target.classList.contains('remove-icon')){
        removeExpense(event.target.closest('.expense'));
    }
})

const totalExpenses = document.querySelector("aside header p span")
const totalExpenseValue = document.querySelector('aside header h2')

value.oninput = () =>
{
    value.value = formatCurrencyBRL(Number(value.value.replace(/\D/g, ""))/100);

}

function formatCurrencyBRL(value){

    value = value.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    })

    return value
}

form.onsubmit = (event) => {
    event.preventDefault();
    const newExpense ={
        id: new Date().getTime(),
        expense: expenseName.value,
        categoryId: category.value,
        categoryName: category.options[category.selectedIndex].text,
        value: value.value,
        createdDate: new Date()

    }

    form.reset()

    expenseAdd(newExpense);
    updateTotalExpense();
}

function expenseAdd(newExpense){
    try {
        const newExpenseItem = document.createElement("li")
        newExpenseItem.classList.add("expense")
        const expenseIcon = document.createElement("img")

        expenseIcon.setAttribute("src",`img/${newExpense.categoryId}.svg`)
        expenseIcon.setAttribute("alt", newExpense.categoryName)

        

        const expenseContent = document.createElement("div")
        expenseContent.classList.add("expense-info")

        const expenseName = document.createElement("strong")
        expenseName.textContent = newExpense.expense

        const expenseCategory = document.createElement("span")
        expenseCategory.textContent = newExpense.categoryName

        expenseContent.append(expenseName, expenseCategory)

        const expenseValue = document.createElement("span")
        expenseValue.classList.add("expense-amount");
        expenseValue.innerHTML = `<small>R$</small>${newExpense.value.toUpperCase().replace('R$','')}`
    
        const removeExpense = document.createElement("img")
        removeExpense.setAttribute('src', "img/remove.svg")
        removeExpense.setAttribute('alt', "remover")

        removeExpense.classList.add('remove-icon')


        newExpenseItem.append(expenseIcon, expenseContent, expenseValue, removeExpense)



        expenseList.append(newExpenseItem)
    }
    catch (error) {
        console.log(error)
        alert('deu ruim')
    }

}
function updateTotalExpense(){
    try {
        
        const expenses = expenseList.children
        
        totalExpenses.textContent = `${expenses.length} ${expenses.length > 1 ? "despesas" : "despesa"}`

        let total = 0

        for (let i = 0; i < expenses.length; ++i){
            const item = expenses[i].querySelector(".expense-amount")
            const valueString = item.textContent.replace(/[^\d,]/g,'').replace(',', '.')
            total += parseFloat(valueString)
        }

        totalExpenseValue.textContent = formatCurrencyBRL(total)



        
        

    } 
    catch (error) {
        console.log(error)
    }

}
function removeExpense(target){
    target.remove()
    updateTotalExpense()

}