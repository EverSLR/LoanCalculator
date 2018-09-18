// Variables
const submitBtn = document.getElementById("loan-form");
const resetBtn = document.getElementById("loan-form");


//Event Handlers & Events
    //Events
    window.addEventListener("load", function (e) {
        document.getElementById("results").style.display = "none";
        document.getElementById("loader").style.display = "none";
    });

    submitBtn.addEventListener("submit", function (e) {
        document.getElementById("results").style.display = "none";
        document.getElementById("loader").style.display = "block";
        setTimeout(calculateResults, 2000);
        e.preventDefault();
    });

    resetBtn.addEventListener("reset", function (e) {

        let sure = confirm("Reset Values?");
        if (!sure) {
            e.preventDefault();
        }else {
            document.getElementById("results").style.display = "none";
        }
    });


    
    
    //Event Handlers
    function calculateResults(e) {
        const loanAmountUI = document.getElementById("amount");
        const interestRateUI = document.getElementById("interest");
        const yearUI = document.getElementById("years");

        const monthlyPayment = document.getElementById("monthly-payment");
        const totalPayment = document.getElementById("total-payment");
        const totalInterest = document.getElementById("total-interest");

        console.log(loanAmountUI.nodeValue,interestRateUI.nodeValue,yearUI.value);

        //Calculate Results
        const principal = parseFloat(loanAmountUI.value);
        const calculateInterest = parseFloat(interestRateUI.value)/100/12;
        const calculatePayments = parseFloat(yearUI.value)* 12;

        //Compute Monthly Payments
        const x = Math.pow(1+calculateInterest,calculatePayments);
        const monthly = (principal*x*calculateInterest)/(x-1);
        if(isFinite(monthly)) {
            console.log(monthly);
            monthlyPayment.value = monthly.toFixed(2);
            totalPayment.value = (monthly*calculatePayments).toFixed(2);
            totalInterest.value = (monthly*calculatePayments-principal).toFixed(2);
            document.getElementById("results").style.display = "block";
            document.getElementById("loader").style.display = "none";
        }
        else{
            manageError("Error, check input values XO");
            document.getElementById("results").style.display = "none";
            document.getElementById("loader").style.display = "none";
        }
    }

    function manageError(errorMsg) {
        //Get Node Where the error DIV will be displayed
        const card = document.querySelector(".card");
        const heading = document.querySelector(".heading");

        //Create DIV to show error
        const errorDiv = document.createElement("div");
        errorDiv.className = "alert alert-danger";
        errorDiv.id = "customAlert";

        //Create text node and append to DIV
        const errorTextNode = document.createTextNode(errorMsg);
        errorDiv.appendChild(errorTextNode);

        //Insert Element in HTML
        card.insertBefore(errorDiv,heading);

        //Clear Element
        window.setTimeout(clearError,3000)

    };

    function clearError() {
        document.getElementById("customAlert").remove();
    };

