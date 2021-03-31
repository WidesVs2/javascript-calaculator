class Calculator {
    constructor(prevOpElem, currOpElem) {
        this.prevOpElem = prevOpElem
        this.currOpElem = currOpElem
        this.clear()
    }

    clear() {
        this.currOp = ''
        this.prevOp = ''
        this.operation = undefined
    }

    clearEntry() {
        this.currOp = ''
    }

    delete() {
        this.currOp = this.currOp.toString().slice(0, -1)
    }

    appendNum(num) {
        if (num === '.' && this.currOp.includes('.')) return
        if (this.currOp.length >= 10) return
        this.currOp = this.currOp.toString() + num.toString()
    }

    chooseOp(operation) {
        if (this.currOp === '') return
        if (this.prevOp !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOp = this.currOp
        this.currOp = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOp)
        const curr = parseFloat(this.currOp)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break;
            case '-':
                computation = prev - curr
                break;
            case '×':
                computation = prev * curr
                break;
            case '÷':
                computation = prev / curr
                break;
            default:
                return
        }
        this.currOp = computation
        this.operation = undefined
        this.prevOp = ''
    }

    squared() {
        this.currOp = parseFloat(this.currOp) * parseFloat(this.currOp)
    }

    squareRoot() {
        this.currOp = Math.sqrt(parseFloat(this.currOp))
    }

    negative() {
        this.currOp = parseFloat(this.currOp) - (parseFloat(this.currOp) * 2)
    }

    fraction() {
        this.currOp = 1 / parseFloat(this.currOp)
    }

    getDisplayNumber(num) {
        const strNum = num.toString()
        const integers = parseFloat(strNum.split('.')[0])
        const decimals = strNum.split('.')[1]
        
        let integerDisplay

        
        if (isNaN(integers)) {
            integerDisplay = ''
        } else {
            if (integers >= 10000000000) {
                integerDisplay = 'eRr0r'
            } else {
                integerDisplay = integers.toLocaleString('en', { maximumFractionDigits: 0 })
            }
        }
        if (decimals != null) {
            return `${integerDisplay}.${decimals}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currOpElem.innerText = this.getDisplayNumber(this.currOp)
        if (this.operation != undefined) {
            this.prevOpElem.innerText = `${this.getDisplayNumber(this.prevOp)} ${this.operation}`
        } else {
            this.prevOpElem.innerText = this.getDisplayNumber(this.prevOp)
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const negativeButton = document.querySelector('[data-negative]')
const percentButton = document.querySelector('[data-percent]')
const clearEntryButton = document.querySelector('[data-clear-entry]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const fractionButton = document.querySelector('[data-fraction]')
const squaredButton = document.querySelector('[data-squared]')
const sqrRootButton = document.querySelector('[data-square-root]')
const currOp = document.querySelector('[data-curr-op]')
const prevOp = document.querySelector('[data-prev-op]')

const calculator = new Calculator(prevOp, currOp)

numberButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault()
        calculator.chooseOp(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculator.compute()
    calculator.updateDisplay()
})

clearButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculator.delete()
    calculator.updateDisplay()
})

clearEntryButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculator.clearEntry()
    calculator.updateDisplay()
})

squaredButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculator.squared()
    calculator.updateDisplay()
})

sqrRootButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculator.squareRoot()
    calculator.updateDisplay()
})

negativeButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculator.negative()
    calculator.updateDisplay()
})

fractionButton.addEventListener('click', (e) => {
    e.preventDefault()
    calculator.fraction()
    calculator.updateDisplay()
})