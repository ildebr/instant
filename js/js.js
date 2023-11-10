var elements = document.querySelectorAll('.faq__question')


//current question being displayed
var currentquestion =1;
console.log(elements)

elements.forEach((ele)=>{
    ele.addEventListener('click', function(e){
        console.log('alo')
        console.log(e.currentTarget)
        e.currentTarget.classList.toggle('faq__question__active')
    })
})

//holds the options that have been selected
var options_selected = []

$('#phone_input').inputmask({
    "mask": "(999) 999-9999"
})

var options = document.querySelectorAll('.options_el')

var question_length = document.querySelectorAll('.question').length
console.log(question_length)

var pgb = document.querySelector('.progress_bar')

var unidad = 100 / question_length;

pgb.style.width = `${unidad * 1}%`

options.forEach((ele)=>{
    ele.addEventListener('click', function(e){
        attr = e.currentTarget.getAttribute('data-option-question-number')
        console.log(attr)
        value = e.currentTarget.getAttribute('data-option-value')
        console.log(value)

        document.querySelector(`.question[data-question-number="${currentquestion}"]`).classList.remove('active')
        document.querySelector(`.question[data-question-number="${currentquestion}"]`).classList.add('selected')
        options_selected[currentquestion -1] = value
        console.log(options_selected)
        var questions_options = document.querySelectorAll(`.options_el[data-option-question-number="${currentquestion}"]`)
        questions_options.forEach((ele)=>{
            if(ele != e.currentTarget){
                ele.classList.remove('options_el__selected')
            }
            e.currentTarget.classList.add('options_el__selected')
        })

        currentquestion+=1

        pgb.style.width = `${currentquestion * unidad}%`

        console.log(currentquestion)
        document.querySelector(`.question[data-question-number="${currentquestion}"]`).classList.add('active')

        
    })
})

var back_buttons = document.querySelectorAll('.back-button')

back_buttons.forEach((ele)=>{
    ele.addEventListener('click', function(e){
        val = e.currentTarget.getAttribute('data-option-question-number')
        console.log(val)
        document.querySelector(`.question[data-question-number="${val}"]`).classList.remove('active')
        --val
        document.querySelector(`.question[data-question-number="${val}"]`).classList.add('active')

        --currentquestion

        pgb.style.width = `${currentquestion * unidad}%`
    })
})

var cont = document.querySelectorAll('.button-continue')

cont.forEach((ele)=>{
    ele.addEventListener('click', function(e){
        val = e.currentTarget.getAttribute('data-question-button')
        console.log(val)
        if(val == question_length -1) console.log('end')
        document.querySelector(`.question[data-question-number="${val}"]`).classList.remove('active')
        ++val
        document.querySelector(`.question[data-question-number="${val}"]`).classList.add('active')

        ++currentquestion
        

        pgb.style.width = `${currentquestion * unidad}%`
    })
})


var tipn = document.querySelectorAll('#text_input_name')

//validates input
tipn.forEach((ele)=>{
    ele.addEventListener('input', function(e){
        if(tipn[0].value.length > 2 && tipn[1].value.length > 2){
            document.querySelector('#name-button').classList.add('valid')
        }else{
            document.querySelector('#name-button').classList.remove('valid')
        }
    })
})

//validates email

pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

var email = document.querySelector('#email_input')

email.addEventListener('input', function(e){
    console.log(e.currentTarget.value)
    console.log(pattern.test(e.currentTarget.value))
    if(pattern.test(e.currentTarget.value)){
        document.querySelector('#email-button').classList.add('valid')
    }else{
        document.querySelector('#email-button').classList.remove('valid')
    }
})




var emailbutton = document.querySelector('#email-button')

emailbutton.addEventListener('click', function(e){
    console.log(email)
    console.log(document.querySelector(`[name="firstname"]`).value)
    console.log(options_selected)


    var settings = {
        "url": "",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({
            "firstName": $(`[name="firstname"]`).val(),
            "lastName": $(`[name="lasttname"]`).val(),
            "WhoDoYouOweTax": options_selected[0],
            "HowMuch": options_selected[1],
            "threateningLetters": options_selected[2]
        }),
    };

    console.log(settings)

    $.ajax(settings).done(function(result) {

        if(options_selected[1] == 'Under $10,000'){
            window.location.href = "https://debthardshiprelief.com/nonq/";
        }else{
            window.location.href = "https://debthardshiprelief.com/thankyou/";
        }
        
    })

})