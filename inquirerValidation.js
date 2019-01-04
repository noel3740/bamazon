//Function will validate that a value entered in inquirer
function validateValue(value) {
    return (!value || value.trim().length <= 0) ? false : true;
}

//Function will validate a money value entered in inquirer
function validatePositiveMoney(value) {
    return (!validateValue(value) || isNaN(value) || parseFloat(value) <= 0) ? false : true;
}

//Function will validate an integer
function validatePositiveInt(value) {
    return (!validateValue(value) || isNaN(value) || parseInt(value) <= 0) ? false : true;
}

//Export the functions
module.exports.validateValue = validateValue;
module.exports.validatePositiveMoney = validatePositiveMoney;
module.exports.validatePositiveInt = validatePositiveInt;