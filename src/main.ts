const button = document.getElementById('btn')

interface Props {
  bill: number
  amount: number
  icon: string
}

/**
 * This is the main entry point for the application
 */
document.addEventListener('change', () => {
  getAmountMoneyToRender()
})

/**
 * This is the main entry point for the application
 */
button?.addEventListener('click', () => {
  getAmountMoneyToRender()
})

/**
 * 
 * calculate the amount of money to render
 * @returns array of money render
 */
const getAmountMoneyToRender = () => {
  let text_amount = getValue('amount').replace(',', '.') // replace comma to dot
  const amount = Number(text_amount)
  let finalAmount = Number(amount.toFixed(2))
  const billets = [500,200,100,50,20,10,5,2,1,0.5,0.2,0.1,0.05,0.02,0.01]
  
  const renderArray: Array<Props> = billets.map((item) => {
    let billNumber = 0

    if (item <= finalAmount) {
      while (item <= finalAmount) {
        finalAmount = Number(finalAmount.toFixed(2)) - item
        billNumber++
      }
      return {
        bill: item,
        amount: billNumber,
        icon: "💶"
      }
    } else {
      return {
        bill: item,
        amount: 0,
        icon: "💶"
      }
    }

  }
  )
  return HtmlRender(renderArray)
}

/**
 * 
 * @param amount 
 * @returns html render
 */
const HtmlRender = (amount: Array<Props>) => {
  const element = document.getElementById('rendering')
  if (element) {
    element.innerHTML = ''
    return amount.map((item) => {
      if (item.amount === 0) return
      const p = document.createElement('p')
      p.innerHTML = `<span class="bold">${item.amount}</span> X <span class="green">${item.bill}</span> ${item.icon}`
      element?.append(p)
    })
  }
  console.log('Element not found')
  return []
}

/**
 * Get the value of an input element
 */
const getValue = (id: string) => {
  const element = <HTMLInputElement>document.getElementById(id)
  if (element) {
    return (element.value)
  }
  return ''
}