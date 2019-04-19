const MILLION = 1000000
const THOUSAND = 1000

/** @description A shorthand for document.querySelector
 * @param {string} el The element you want to select
 * @return {Element}  
 */  
let s = (el) => document.querySelector(el)

/** @description A simple formatter for numbers in the thousands and millions
 * @param {number} num The number you want to format
 * @return {string}
 */  
let format_number = (num, numbers_past_decimal=1) => {

    if (num >= MILLION) {
        num = (num / MILLION).toFixed(numbers_past_decimal) + "M"
    }

    if ( num >= THOUSAND && num < MILLION ) {
        num = (num / THOUSAND).toFixed(numbers_past_decimal) + "K"
    }

    return num
}

let format_date = (date) => {
    let info = date.split('-')

    let day = parseInt(info[1])
    let month = parseInt(info[2])
    let year = info[0].slice(-2)

    date = `${day}/${month}/${year}`

    return date
}