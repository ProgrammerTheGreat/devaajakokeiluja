document.addEventListener("DOMContentLoaded", () => {
    let displayInput = document.querySelector(".input");
    let displayOutput = document.querySelector(".output");
    const keysContainer = document.querySelector(".keys");

    const handleButtonClick = (event) => {
        const button = event.target.closest('div[data-button]');
        if (!button) return; // Exit if the click wasn't on a button

        const buttonType = button.getAttribute('data-button').toLowerCase();
        const buttonValue = button.innerText;
        console.log(`Button clicked: ${buttonType}, Value: ${buttonValue}`);

        if (buttonType === 'number' || buttonType === 'plus' || buttonType === 'minus'
            || buttonType === 'left-bracket' || buttonType === 'right-bracket' ||
            buttonType === 'divide' || buttonType === 'multiply' || buttonType === 'dot') {

            if (displayInput.innerText === "0" && buttonType === 'number') {
                displayInput.innerText = buttonValue; // Replace "0" with the new number
            } else if (displayOutput.innerText && (buttonType === "plus" || buttonType === "minus" ||
                buttonType === "multiply" || buttonType === "divide")) {
                // If there is a result in displayOutput, continue calculation from the result
                displayInput.innerText = displayOutput.innerText + buttonValue;
                displayOutput.innerText = "";
            } else if (displayOutput.innerText && buttonType === 'number') {
                displayOutput.innerText = "";
                displayInput.innerText = "";
                displayInput.innerText = displayInput.innerText + buttonValue;
            } else if (!displayInput.innerText && buttonType === 'dot') {
                displayInput.innerText = ""
            } else if (displayInput.innerText.includes(".") && buttonType === 'dot') {
                displayInput.innerText != "."
            } else if (displayInput.innerText && displayOutput.innerText && buttonType === 'dot') {
                displayInput.innerText != "."
            }  else {
                displayInput.innerText += buttonValue;
            }

        } else if (buttonType === 'ac' && displayInput.innerText) {
            displayInput.innerText = "0";
            displayOutput.innerText = "";
        } else if (buttonType === 'delete') {
            displayInput.innerText = displayInput.innerText.slice(0, -1);
            
            if (displayOutput.innerText) {
                displayInput.innerText = displayOutput.innerText;
                displayOutput.innerText = "";
            }
            else if (displayInput.innerText === "") {
                displayInput.innerText = "0";
            }
        } else if (buttonType === 'equals') {
            try {
                const expression = displayInput.innerText.replace(/x/g, '*');
                const result = math.evaluate(expression);
                displayOutput.innerText = result;
               
            } catch (error) {
                displayOutput.innerText = "Error. Something's wrong.";
            }
        }
    };

    keysContainer.addEventListener('click', handleButtonClick);
});
