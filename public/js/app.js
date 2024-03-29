//console.log('Client side javascript file is loaded')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const SunRiseSunSet = document.querySelector('#message-4')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
   // console.log(location)
    messageOne.textContent = 'Loading data....'
    messageTwo.textContent = ''
    SunRiseSunSet.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            console.log(data.error)
            messageOne.textContent = data.error
        } else {
            //console.log(data)
            // console.log(data.data.forecast)
            // console.log(data.data.location)
            messageOne.textContent = data.data.forecast
            messageTwo.textContent = data.data.location
            SunRiseSunSet.textContent = data.data.SunRiseSunSet
        }
    
    })
})


})