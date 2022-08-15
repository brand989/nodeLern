const colors = require("colors/safe")

let [start, end] = [process.argv[2], process.argv[3]]

const getPrimeNumbers = (start, end) => {

    if (isNaN(+start) || isNaN(+end)) {
        console.log('аргумент, переданный при запуске, не считается числом ')
        return
    }

    let numbers = []

    for (let num = start; num <= end; num++) {
        let j = 0

        for (let i = 1; i < num; i++) {

            if (num % i == 0) {
                j++
            }
        }

        if (j < 2) {
            numbers.push(num)
        }
    }


    if (!numbers.length) {
        console.log(colors.red("простых чисел в диапазоне нет"))
        return
    }

    let color = [colors.red, colors.yellow, colors.green]
    let colorNum = 0

    numbers.forEach(item => {
        if (colorNum === 3) {
            colorNum = 0
        }

        console.log(color[colorNum++](item))
        
    })

}

getPrimeNumbers(start, end)