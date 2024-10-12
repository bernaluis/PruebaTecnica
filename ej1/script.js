document.getElementById("btnCheck").addEventListener("click", function() {
    //console.log('hola');
    let inputValue = document.getElementById("exampleInputPassword1").value;
    let criteriaAmount=0;let message='';
    if (checkLength(inputValue,12)) {
        criteriaAmount++;
    }
    if(checkUpperCase(inputValue)){
        criteriaAmount++;
    }
    if (checkSpecialChars(inputValue)) {
        criteriaAmount++;
    }
    if (checkNumbers(inputValue)) {
        criteriaAmount++;
    }
    if (!checkSuccesiveChars(inputValue)) {
        criteriaAmount++;
    }
    
    //mensaje
    if (criteriaAmount === 0) {
        message = 'No es un password permitido. Nivel débil';
    } else if (criteriaAmount >= 2 && criteriaAmount < 5) {
        message = 'No es un password permitido. Nivel medio';
    } else if (criteriaAmount === 5) {
        message = 'Si es un password permitido. Nivel alto';
    }
    //alert(message);
    //alert(criteriaAmount);
    document.getElementById("msg").innerText=message.toString();
});
//longitud mayor a
function checkLength(val,length){
    let flag=false;
    if(val.length>length){
        flag=true;
    }
    return flag;
}
//si tiene mayusculas
function checkUpperCase(val){
    let flag=false;
    for (let index = 0; index < val.length; index++) {
        let letter=val.charAt(index);
        if(letter==letter.toUpperCase()){
            flag=true;
            break;
        }
    } 
    return flag;
}
//si tiene caracteres especiales
function checkSpecialChars(val){
    const regex=/^[a-zA-Z0-9]+$/;
    let flag=false;
    for (let index = 0; index < val.length; index++) {
        let letter=val.charAt(index);
        if(!regex.test(letter)){
            flag=true;
            break;
        }
    } 
    return flag;
}
//si tiene numeros
function checkNumbers(val){
    const regex=/^[0-9]+$/;
    let flag=false;
    for (let index = 0; index < val.length; index++) {
        let letter=val.charAt(index);
        if(regex.test(letter)){
            flag=true;
            break;
        }
    } 
    return flag;
}
//caracteres sucesivos
function checkSuccesiveChars(val){
    let flag=false;
    for (let index = 1; index < val.length; index++) {
        let letter=val.charAt(index);
        let prevLetter=val.charAt(index-1)
        if(letter==prevLetter){
            flag=true;
            break;
        }
    } 
    return flag;
}