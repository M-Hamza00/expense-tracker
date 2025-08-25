let transactions = [];
let listElement = document.getElementById("tx-list");
let expenseElement = document.getElementById("expense");
let incomeElement = document.getElementById("income");
let balanceElement = document.getElementById("balance");
let formElement = document.getElementById("tx-form");

function load(){
    let data = localStorage.getItem("transactions");
    if(data){
        transactions  = JSON.parse(data);
    }
}

function save(){
    localStorage.setItem("transactions", JSON.stringify(transactions))
}    

function show(){
    listElement.innerHTML = "";
    transactions.forEach(function(tx){
        let li = document.createElement("li");
        let signClass = tx.amount >= 0 ? "pos" : "neg";
        li.innerHTML = `
        <span> ${tx.title} </span>
        <span class="amount ${signClass}"> ${tx.amount} </span>
        `;
        listElement.appendChild(li);
    });
}

function update(){
    let income = 0 ;
    let expense = 0 ;
    transactions.forEach(function(tx){
    if(tx.amount > 0){
        income += tx.amount;
    }else {
        expense += tx.amount;
    }
    });
    let balance = income + expense;
    balanceElement.textContent = balance;
    incomeElement.textContent = income;
    expenseElement.textContent = expense;
}

formElement.addEventListener("submit", function(event){
    event.preventDefault();
    let title = formElement.title.value;
    let amount = Number(formElement.amount.value);
    let newtx = {title: title, amount: amount};
    transactions.push(newtx);
    save();
    show();
    update();
    formElement.reset();
}); 

load();
show();
update();
