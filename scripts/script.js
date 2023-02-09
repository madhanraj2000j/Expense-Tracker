
// select all the DOM elements
const balanceEl = document.getElementById('balance');
const moneyPlusEl = document.getElementById('money-plus');
const moneyMinusEl = document.getElementById('money-minus');
const listEl = document.getElementById('list');
const formEl = document.getElementById('form');
const transactionEl = document.getElementById('transaction');
const amountEl = document.getElementById('amount');

// global variables

let transactions = [];
let income = 0;
let expense = 0;
let balance = 0;

// Functions
 function init(){
  listEl.innerHTML = null;
 }

function updateValues(){
  income = transactions.map((transaction)=> transaction.amount).filter((val) => val > 0).reduce((prev, val) => prev + val, 0);

  expense = transactions.map((transaction)=> transaction.amount).filter((val) => val < 0).reduce((prev, val) => prev + val, 0);

  balance = transactions.map((transaction)=> transaction.amount).reduce((prev, val) => prev + val, 0);

  // displays the value
  moneyPlusEl .innerText = `₹${income}` ;
  moneyMinusEl .innerText = `₹${ Math.abs(expense)}`;
  balanceEl.innerText =`₹${balance}`;

}

 function deleteTransaction(id){
  transactions = transactions.filter((transaction)=>
    transaction.id !== id);
   
    console.log();

    // initial settings
    init();

    // re add the list element
    transactions.forEach((transaction)=>{
      addTransactionToDom(transaction);
    });
   
    // update the expense income balance values

    updateValues();

  }
 

 function addTransactionToDom({id,name,amount}){

  // get the sign of the transaction amount
  const sign = amount > 0 ? '₹' : '₹';
  
  // create an li element
  const liEl = document.createElement('li');

  // add class name to liEl
  liEl.classList = amount >0 ? 'plus':'minus'

  // inner HTML 
  liEl.innerHTML = `
     <span> ${name} </span>
     <span>${sign}${amount}</span>
     <button class= "delete-btn" onclick = deleteTransaction(${id})>X</button>
    ` ;

    // appendChild
    listEl.appendChild(liEl);
 }


// Event Listeners
formEl.addEventListener('submit',function(Event){
  Event.preventDefault();  

  if(transactionEl.value.trim()=== '' || amountEl.value.trim()==='') {
    alert('Please add Transaction Details');
  }else{

    // create a transaction object
    const transaction = {
      id : Date.now(),
      name : transactionEl.value,
      amount : Number(amountEl.value) ,
    };
    // console.log(transaction);

    // add transaction object to the transaction array
    transactions.push(transaction);

    // add transaction to the DOM
    addTransactionToDom(transaction);

    // clear the input element
    transactionEl.value = null;
    amountEl.value = null;

    // update the expense income balance values

    updateValues();

  }

})


// initial settings
init();