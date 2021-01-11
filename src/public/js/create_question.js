console.log('si entró el script wey ')

let que_1 = document.getElementById('que_1')
let que_2 = document.getElementById('que_2')
let que_3 = document.getElementById('que_3')
let que_4 = document.getElementById('que_4')

let alt_1 = document.getElementById('alt_1')
let alt_2 = document.getElementById('alt_2')
let alt_3 = document.getElementById('alt_3')
let alt_4 = document.getElementById('alt_4')


let que_1_text = document.getElementById('que_1_text')
let que_1_text_input = document.getElementById('que_1_text_input')
let que_2_text = document.getElementById('que_2_text')
let que_2_text_input = document.getElementById('que_2_text_input')
let que_3_text = document.getElementById('que_3_text')
let que_3_text_input = document.getElementById('que_3_text_input')
let que_4_text = document.getElementById('que_4_text')
let que_4_text_input = document.getElementById('que_4_text_input')

let type_alternative_var = 1


function alternative_2(){

    // Oculta o muestra items
    que_1.style.display = 'block'
    que_2.style.display = 'block'
    que_3.style.display = 'none'
    que_4.style.display = 'none'

    // Cambia las alternativas por true o falso
    alt_1.style.display = 'block'
    alt_2.style.display = 'block'
    alt_3.style.display = 'none'
    alt_4.style.display = 'none'

    alt_1.innerText = '1: '+ que_1_text_input.value
    alt_2.innerText = '2: '+ que_2_text_input.value

}
function alternative_3(){

    // Oculta o muestra items
    que_1.style.display = 'block'
    que_2.style.display = 'block'
    que_3.style.display = 'block'
    que_4.style.display = 'none'
    // Muestra y oculta alternativas
    alt_1.style.display = 'block'
    alt_2.style.display = 'block'
    alt_3.style.display = 'block'
    alt_4.style.display = 'none'
    // Cambia las alternativas por true o falso
    alt_1.innerText = '1: '+ que_1_text_input.value
    alt_2.innerText = '2: '+ que_2_text_input.value
    alt_3.innerText = '3: '+ que_3_text_input.value
}
function alternative_4() {

    // Oculta o muestra items
    que_1.style.display = 'block'
    que_2.style.display = 'block'
    que_3.style.display = 'block'
    que_4.style.display = 'block'

    // Muestra y oculta alternativas
    alt_1.style.display = 'block'
    alt_2.style.display = 'block'
    alt_3.style.display = 'block'
    alt_4.style.display = 'block'

    // Cambia las alternativas por true o falso
    alt_1.innerText = '1: ' + que_1_text_input.value
    alt_2.innerText = '2: ' + que_2_text_input.value
    alt_3.innerText = '3: ' + que_3_text_input.value
    alt_4.innerText = '4: ' + que_4_text_input.value
}
function true_or_false(){

    // Oculta todos los items
    que_1.style.display = 'block'
    que_2.style.display = 'block'
    que_3.style.display = 'none'
    que_4.style.display = 'none'

    // Cambia las alternativas por true o falso
    alt_1.style.display = 'block'
    alt_2.style.display = 'block'
    alt_3.style.display = 'none'
    alt_4.style.display = 'none'

    // Cambia las alternativas por true o falso
    alt_1.innerText = '1: '+ que_1_text_input.value
    alt_2.innerText = '2: '+ que_2_text_input.value

}

function type_alternative_on(){

    let $alternative = document.getElementById('type_alternative')
    if ($alternative.value === '1'){
        true_or_false()
    } else if ($alternative.value === '2'){
        alternative_2()
    } else if ($alternative.value === '3'){
        alternative_3()
    } else if ($alternative.value === '4'){
        alternative_4()
    }
}
function get_alternative(){

    alt_1.innerText = '1: '+ que_1_text_input.value
    alt_2.innerText = '2: '+ que_2_text_input.value
    alt_3.innerText = '3: '+ que_3_text_input.value
    alt_4.innerText = '4: '+ que_4_text_input.value

}




