'use strict';

  let start = document.getElementById('start'),
      cancel = document.getElementById('cancel'),
      btnPlus = document.getElementsByTagName('button'),
      incomePlus = btnPlus[0],
      expensesPlus = btnPlus[1],
      additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
      depositCheck = document.querySelector('#deposit-check'),
      budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
      budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
      expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
      accumulatedMonthValue = document.getElementsByClassName('accumulated_month_value')[0],
      additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
      additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
      incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
      targetMonthValue = document.getElementsByClassName('target_month-value')[0],
      salaryAmount = document.querySelector('.salary-amount'),
      incomeTitle = document.querySelector('.income-title'),
      incomeAmount = document.querySelector('.income-amount'),
      expensesTitle = document.querySelector('.expenses-title[type="text"]'),
      expensesAmount = document.querySelector('.expenses-amount'),
      additionalExpenses = document.querySelector('.additional_expenses'),
      periodSelect = document.querySelector('.period-select'),
      additionalExpensesItem = document.querySelector('.additional_expenses-item'),
      targetAmount = document.querySelector('.target-amount'),
      periodAmount = document.querySelector('.period-amount'),
      allInput = document.querySelectorAll('input');
    

  
  let expensesItems = document.querySelectorAll(`.expenses-items`),
      incomeItem = document.querySelectorAll(`.income-items`),
      inputPlaceholder = document.getElementsByTagName(`input`);


  let isNumber = function(n){
      return !isNaN(parseFloat(n)) && isFinite(n);
  };


class AppData{

  constructor(income = {}, addIncome =  [], expenses =  {},addExpenses =  [], incomeMonth =  0, deposit =  false, moneyDeposit=  0, percentDeposit =  0, budget =  0, budgetDay =  0, budgetMonth=  0, expensesMonth =  0){
    this.income =  income;
    this.addIncome =  addIncome;
    this.expenses =  expenses;
    this.addExpenses =  addExpenses;
    this.incomeMonth =  incomeMonth;
    this.deposit =  deposit;
    this.moneyDeposit =  moneyDeposit;
    this.percentDeposit =  percentDeposit;
    this.budget =  budget;
    this.budgetDay =  budgetDay;
    this.budgetMonth =  budgetMonth;
    this.expensesMonth =  expensesMonth;
  }
  



  start(){
    if(salaryAmount.value === ''){
      alert('????????????, ????????"???????????????? ??????????", ???????????? ???????? ??????????????????');
      return 
    }

    this.budget =  +salaryAmount.value;
    this.getExpInc();
    this.getExpIncMonth(this.income);
    this.getExpIncMonth(this.expenses);
    // this.getAddExpenses();
    // this.getAddIncome();
    this.getAddExpInc(additionalExpensesItem);
    this.getAddExpInc(additionalIncomeItem);
    this.getBudget();    
    this.showResult();

    document.querySelectorAll('input').forEach(item => {item.disabled =   'disabled';});
    document.querySelectorAll('.btn_plus').forEach(item => {item.setAttribute('disabled', 'disabled');});
    start.style.display = 'none';
    cancel.style.display = 'block';
  }

  cancel(){

    document.querySelectorAll('input').forEach(item => 
    {   
      item.value = '';
      item.disabled = ''; 
    });

 

    this.income = {};
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.incomeMonth = 0;
    this.deposit = false;
    this.moneyDeposit = 0;
    this.percentDeposit = 0;
    this.budget  = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;

    this.removeInput(incomeItem);
    this.removeInput(expensesItems);


    periodSelect.value = 1;
    periodAmount.textContent = 1;

    expensesPlus.style.display = 'block';
    incomePlus.style.display = 'block';
    start.style.display = 'block';
    cancel.style.display = 'none';
  }

  removeInput(item){
    for(let i = 1; i < item.length; i++){
      item[i].remove();
    }
  };

  showResult(){
    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = Math.ceil(this.budgetDay);
    expensesMonthValue.value = this.expensesMonth;
    additionalExpensesValue.value = this.addExpenses.join(', ');
    additionalIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth()); // ???????????????????? ????????
    incomePeriodValue.value = this.calcPeriod();
    periodSelect.addEventListener('input', function(){
        incomePeriodValue.value = this.budgetMonth * periodSelect.value;
        return incomePeriodValue.value;
    });
  }

  // addExpensesBlock(){   //???????????????????????? ??????????????: ????????????  ????????;                          
  //   let cloneExpensesItem = expensesItems[0].cloneNode(true);

  //   for(let i = 0; i< cloneExpensesItem.childNodes.length; i++){
  //     cloneExpensesItem.childNodes[i].value = '';
  //   }
  //   expensesItems[0].parentNode.insertBefore(cloneExpensesItem,   expensesPlus);
  //   expensesItems = document.querySelectorAll('.expenses-items');
  //   if(expensesItems.length === 3){
  //     expensesPlus.style.display = 'none';
  //   }

  //   this.inputCheckPlaceholder();
  // }

  // addIncomeBlock(){       
  //   let cloneIncomeItem = incomeItem[0].cloneNode(true);
  //   for(let i = 0; i< cloneIncomeItem.childNodes.length; i++){
  //     cloneIncomeItem.childNodes[i].value = '';
  //   }
  //   incomeItem[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
  //   incomeItem = document.querySelectorAll('.income-items');
  //   if(incomeItem.length === 3){
  //     incomePlus.style.display = 'none';
  //   }

  //   this.inputCheckPlaceholder();
  // }



  addExpInc(item){
    // let item = this.who;
    
    const cloneItem = document.querySelectorAll(`.${item}-items`)[0].cloneNode(true);
    let itemExpInc = document.querySelectorAll(`.${item}-items`);
    let plusIncExp;
    if(item === `expenses`){
      plusIncExp = btnPlus[1];
    }
    if(item === `income`){
      plusIncExp = btnPlus[0];
    }
    for(let i = 0; i< cloneItem.childNodes.length; i++){
      cloneItem.childNodes[i].value = '';
    }
    itemExpInc[0].parentNode.insertBefore(cloneItem, plusIncExp);
    itemExpInc = document.querySelectorAll(`.${item}-items`);
    if(itemExpInc.length === 3){
      plusIncExp.style.display = 'none';
    }
    if(item === `expenses`){
      incomeItem = itemExpInc; 
    }
    if(item === `income`){
      expensesItems = itemExpInc;
    }
    
    appData.inputCheckPlaceholder();
  }

    // getExpenses(){                                      //????????????????????????  ??????????????: ???????????????????? ?? ????????????;
  //   expensesItems.forEach((item) =>  {                                     
  //     let itemExpenses = item.querySelector('.expenses-title').value; //  ???????????????????????? ??????????????: ???????? - ????????????????????????;
  //     let cashExpenses = item.querySelector('.expenses-amount').value;//  ???????????????????????? ??????????????: ???????? - ??????????;
  //     if(itemExpenses !== '' && cashExpenses !== ''){
  //       this.expenses[itemExpenses] = cashExpenses;
  //     }
  //   });
  // }

  // getIncome(){
  //   incomeItem.forEach((item) => {
  //     let itemIncome = item.querySelector('.income-title').value;
  //     let cashIncome = item.querySelector('.income-amount').value;
  //     if(itemIncome !== '' && cashIncome !== ''){
  //       this.income[itemIncome] = cashIncome;
  //     }
  //   });

  // }

  getExpInc(){
    
    const count = item =>{
      const startStr = item.className.split('-')[0];
      const itemTitle = item.querySelector(`.${startStr}-title`).value;
      const itemAmount = item.querySelector(`.${startStr}-amount`).value;
      if(itemTitle !== '' && itemAmount !== ''){
        this[startStr][itemTitle] = itemAmount;
      }
    };

    incomeItem.forEach(count);
    expensesItems.forEach(count);
    
  }


  getAddExpenses(){                   //?????????????????? ?????????????? 
    additionalExpensesItem.value.split(', ').forEach((item) => {
      item = item.trim();
      if (item !== ''){
        this.addExpenses.push(item);
      }
    });

    
  }

  getAddIncome(){                  //?????????????????? ??????????
    additionalIncomeItem.forEach((item) => {  
      item = item.value.trim();
      if (item !== ''){
        this.addIncome.push(item);
      }
    });
  }


  getAddExpInc(item){
    debugger
    if(item === additionalExpensesItem){item.value.split(', ');}
    const startStr = item.className.split(/[_-]/)[1];
    item.forEach((item) => {
      if(item === additionalIncomeItem){item = item.value.trim();}
      else{ item = item.trim();}
      if(item !== ''){
        this[startStr].push(item);
      }
    });
  }






  // getExpensesMonth(){

  //   for( let key in  this.expenses){
  //     this.expensesMonth += +this.expenses[key];
  //   }
  // }

  // getIncomeMonth(){

  //   for(let key in this.income){
  //     this.incomeMonth += +this.income[key];
  //   }
  // }
  

  getExpIncMonth(item){
    item = item;

    let b = 0 ;

    if(item === this.income){b = this.incomeMonth;}
    if(item === this.expenses){b = this.expensesMonth;}

    
    for(let key in item){
        b += +item[key];
    }

    if(item === this.income){this.incomeMonth=b;}
    if(item === this.expenses){this.expensesMonth=b;}
  }


 

  getBudget(){
    this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;   //???????????? ???? ??????????
    this.budgetDay = this.budgetMonth / 30;   //???????????? ???? ????????
  }

  getTargetMonth(){ //???????????????????? ????????
    return targetAmount.value / this.budgetMonth;
  }

  calcPeriod(){
    return this.budgetMonth * periodSelect.value;
  }

  getStatusIncome(){
    if(this.budgetDay>1200){
      console.log("?? ?????? ?????????????? ?????????????? ????????????");
    }else if(this.budgetDay>600 && this.budgetDay<1200){
      console.log("?? ?????? ?????????????? ?????????????? ????????????");
    }else if(this.budgetDay>0 && this.budgetDay<600){
      console.log("?? ?????????????????? ?? ?????? ?????????????? ???????????? ???????? ????????????????");
    }else{
      console.log("?????? ???? ?????????? ???? ??????");
    }
  }

  eventListener(){
    start.addEventListener('click', this.start.bind(this));
    cancel.addEventListener('click', this.cancel.bind(this));
    // expensesPlus.addEventListener('click', this.addExpensesBlock.bind(this));
    // incomePlus.addEventListener('click', this.addIncomeBlock.bind(this));
    // expensesPlus.addEventListener('click', this.addExpInc.bind({...this, ...{who: 'expenses'}}));
    // incomePlus.addEventListener('click', this.addExpInc.bind({...this, ...{who: 'income'}}));
    expensesPlus.addEventListener('click', function(){
      appData.addExpInc('expenses');
    });
    incomePlus.addEventListener('click', function(){
      appData.addExpInc('income');
    });
    periodSelect.addEventListener('input', function(){
      periodAmount.innerHTML = periodSelect.value;
    });
    this.inputCheckPlaceholder();
    this.removeeventListener();
  }

  removeeventListener(){
    start.removeEventListener('click', this.start.bind(this));
    cancel.removeEventListener('click', this.cancel.bind(this));
    // expensesPlus.removeEventListener('click', this.addExpensesBlock.bind(this));
    // incomePlus.removeEventListener('click', this.addIncomeBlock.bind(this));
    // expensesPlus.removeEventListener('click', this.addExpInc.bind({...this, ...{who: 'expenses'}}));
    // incomePlus.removeEventListener('click', this.addExpInc.bind({...this, ...{who: 'income'}}));
    expensesPlus.removeEventListener('click', function(){
      appData.addExpInc('expenses');
    });
    incomePlus.removeEventListener('click', function(){
      appData.addExpInc('income');
    });
    periodSelect.removeEventListener('input', function(){
      periodAmount.innerHTML = periodSelect.value;
    });
  }

  inputCheckPlaceholder(){
    for(let i = 0; i < inputPlaceholder.length; i++){
      inputPlaceholder[i].addEventListener('input',()=> {
        if(inputPlaceholder[i].getAttribute("placeholder") === "????????????????????????"){
        inputPlaceholder[i].value = inputPlaceholder[i].value.replace(/[^??-????????-??????._^%$#!~@,-\s*]/,'');
        }
        if(inputPlaceholder[i].getAttribute("placeholder") === "??????????"){
          inputPlaceholder[i].value = inputPlaceholder[i].value.replace(/[^0-9]/,'');
        }
      });
    }
  }

}
  
  const appData = new AppData();
  appData.eventListener();












