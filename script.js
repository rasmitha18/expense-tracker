let description = document.getElementById("descr");
let amount1 = document.getElementById("amount");
let addtrans = document.getElementById("trans");
let history1 = document.getElementById("history");

let income1 = document.getElementById("income");
let expense1 = document.getElementById("expense");
let balance1 = document.getElementById("balance");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

displayTransactions();

addtrans.addEventListener("click", function () {

    if(description.value==="" || amount1.value===""){
        alert("Please fill all fields");
        return;
    }

    let transaction = {
        description: description.value,
        amount:Number(amount1.value)
    };

    transactions.push(transaction);

    localStorage.setItem("transactions",JSON.stringify(transactions));

    description.value="";
    amount1.value="";

    displayTransactions();

});

function displayTransactions(){

    history1.innerHTML="";

    let income=0;
    let expense=0;

    transactions.forEach(function(item,index){

        let li=document.createElement("li");

        li.innerHTML=`
        ${item.description} : $${item.amount}
        <button class="delete-btn">Delete</button>
        `;

        let deleteBtn=li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click",function(){

            transactions.splice(index,1);

            localStorage.setItem("transactions",JSON.stringify(transactions));

            displayTransactions();

        });

        history1.append(li);

        if(item.amount>0){
            income+=item.amount;
        }else{
            expense+=Math.abs(item.amount);
        }

    });

    let balance=income-expense;

    income1.innerText=`$${income}`;
    expense1.innerText=`$${expense}`;
    balance1.innerText=`$${balance}`;

}