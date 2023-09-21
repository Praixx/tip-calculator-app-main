(function(){
    
    "use strict"

    const tipButton = document.querySelectorAll(".tip-percent");
    const peopleInput = document.getElementById("people-input");
    const reset = document.getElementById("reset");
    const bill = document.getElementById("input-amount");

    let tipPercent = 0;




    tipButton.forEach(function (tip) {
        tip.dataset.state = "original";
        

        tip.addEventListener("click", function () {
            document.getElementById("Custom").value = "";
            
            

            tipButton.forEach(function (btn) {
            btn.dataset.state = "original";
            btn.style.border = "1px solid var(--Very-dark-cyan)";
            btn.style.backgroundColor = "var(--Very-dark-cyan)";
            });

            setTimeout(function () {
            if (tip.dataset.state === "original") {
                tip.dataset.state = "active";
                tip.style.border = "1px solid var(--Strong-cyan)";
                tip.style.backgroundColor = "var(--Strong-cyan)";
                tipPercent = parseFloat(tip.innerHTML.replace('%', ''));
            } else {
                tip.dataset.state = "original";
                tip.style.border = "1px solid var(--Very-dark-cyan)";
                tip.style.backgroundColor = "var(--Very-dark-cyan)";
            }

            tipCalculator()
            
            }, 0);  
            
        });
        
    });


    
    peopleInput.addEventListener("click", tipCalculator);
    peopleInput.addEventListener("input", tipCalculator);
    bill.addEventListener("click", tipCalculator);
    peopleInput.addEventListener("input", tipCalculator);
    reset.addEventListener("click", resetCalculator);




    document.getElementById("Custom").addEventListener("click", function(){
        tipButton.forEach(function(btn){
            btn.dataset.state = "original";
            btn.style.border = "1px solid var(--Very-dark-cyan)";
            btn.style.backgroundColor = "var(--Very-dark-cyan)";
        })

        tipPercent = document.getElementById("Custom").value;

        tipCalculator();
        
    })


    function tipCalculator(){

        const amountInput = document.getElementById("input-amount").value;
        const tipPerPerson = document.querySelector(".result .tip-amount h2");
        const total = document.querySelector(".result .total h2");
        const custom = document.getElementById("Custom").value;
        const totalPeople = peopleInput.value;
        const errorMessage = document.querySelector(".input-details-cont .People p");
        const errors = document.querySelectorAll(".error-msg");
        let tipCalculation = 0;
        let totalBill = 0;


        errors.forEach(function(error){
            error.className = "error-msg error";
        })

    

        if(!tipPercent == 0){
            tipCalculation = (( (amountInput * (tipPercent /  100)) / totalPeople).toFixed(2));    
            totalBill =  ((amountInput / totalPeople) + parseFloat(tipCalculation)).toFixed(2);

        }
        else if(tipPercent == 0 && custom > 0){
            
            tipPercent = custom;
            tipCalculation = (( (amountInput * (tipPercent /  100)) / totalPeople).toFixed(2));    
            totalBill =  ((amountInput / totalPeople) + parseFloat(tipCalculation)).toFixed(2);
        }else if(tipPercent == 0 && custom == 0){
            errors[1].classList.remove("error");
            
        }

        errorMessage.className = "error";
        peopleInput.style.border = "1px solid var(--White)";

        
        if(peopleInput.value <= 0){
            errorMessage.classList.remove("error");
            peopleInput.style.border = "1px solid red"
            
        }else if( amountInput == 0 && tipPercent == 0){
            errors.forEach(function(error){
                error.classList.remove("error");
            })
        
        } else if (amountInput == 0 ){
            errors[0].classList.remove("error");
            
        }else if(tipPercent == 0){
            errors[1].classList.remove("error");

        }else{
            tipPerPerson.innerHTML = `$${tipCalculation}`;
            total.innerHTML = `$${totalBill}`;
        }

       
        
    };


    function resetCalculator(){
        document.getElementById("input-amount").value = "";
        document.getElementById("Custom").value = "";
        document.getElementById("people-input").value = "";

        tipButton.forEach(function(btn){
            btn.dataset.state = "original";
            btn.style.border = "1px solid var(--Very-dark-cyan)";
            btn.style.backgroundColor = "var(--Very-dark-cyan)";
        })

        document.querySelector(".result .tip-amount h2").innerHTML = `$0.00`;
        document.querySelector(".result .total h2").innerHTML = `$0.00` 
    }

})();