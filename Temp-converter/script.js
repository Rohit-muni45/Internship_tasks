function convertTemp() {
    const inputTemp = document.getElementById('inputTemp').value;
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    let result;

    if (inputTemp === '') {
        alert('Please enter a temperature');
        return;
    }

    if (fromUnit === 'celsius') {
        if (toUnit === 'fahrenheit') {
            result = (inputTemp * 9/5) + 32;
        } else if (toUnit === 'kelvin') {
            result = parseFloat(inputTemp) + 273.15;
        } else {
            result = inputTemp;
        }
    } else if (fromUnit === 'fahrenheit') {
        if (toUnit === 'celsius') {
            result = (inputTemp - 32) * 5/9;
        } else if (toUnit === 'kelvin') {
            result = (inputTemp - 32) * 5/9 + 273.15;
        } else {
            result = inputTemp;
        }
    } else if (fromUnit === 'kelvin') {
        if (toUnit === 'celsius') {
            result = inputTemp - 273.15;
        } else if (toUnit === 'fahrenheit') {
            result = (inputTemp - 273.15) * 9/5 + 32;
        } else {
            result = inputTemp;
        }
    }

    document.getElementById('result').innerText = `Result: ${result.toFixed(2)} ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`;
    document.getElementById('result').classList.add('visible');
}

function clearFields() {
    document.getElementById('inputTemp').value = '';
    document.getElementById('fromUnit').value = 'celsius';
    document.getElementById('toUnit').value = 'fahrenheit';
    document.getElementById('result').innerText = '';
    document.getElementById('result').classList.remove('visible');
}
