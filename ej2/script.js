document.getElementById("btnCheck").addEventListener("click", function() {
    //console.log('hola');
    let inputValue = document.getElementById("numbers").value;
    document.getElementById("arr").innerText='['+inputValue+']';
    const numbers = inputValue.split(',').map(Number);
    findClosestNumbers(numbers);
});

function findClosestNumbers(numbers) {
    //console.log('hola2');
    // obteniendo el promedio
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    const average = sum / numbers.length;

    // encontrando el valor mas cercano al promedio
    let closestValue = numbers[0];
    let smallestDifference = Math.abs(closestValue - average);

    for (let i = 1; i < numbers.length; i++) {
        const difference = Math.abs(numbers[i] - average);
        if (difference < smallestDifference) {
            smallestDifference = difference;
            closestValue = numbers[i];
        }
    }

    //encontrando el valor mas cercano a la derecha e izq
    let closestLeft = null;
    let closestRight = null;

    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < closestValue) {
            if (closestLeft === null || numbers[i] > closestLeft) {
                closestLeft = numbers[i];
            }
        } else if (numbers[i] > closestValue) {
            if (closestRight === null || numbers[i] < closestRight) {
                closestRight = numbers[i];
            }
        }
    }
    let distanceLeft=Math.abs(average-closestLeft);
    let distanceRight=Math.abs(average-closestRight);

    // ordenar el arreglo con el mas cercano al promedio primero
    const sortedArray = [closestValue, ...numbers.filter(num => num !== closestValue).sort((a, b) => a - b)];
    document.getElementById("prom").innerText=average.toString();
    document.getElementById("closep").innerText=closestValue.toString();
    document.getElementById("closei").innerText=closestLeft.toString();
    document.getElementById("disti").innerText=distanceLeft.toString();
    document.getElementById("closed").innerText=closestRight.toString();
    document.getElementById("distd").innerText=distanceRight.toString();
    document.getElementById("sorteda").innerText=sortedArray.toString();
}
    


