const determineMaxDaysInMonth = (month: string) => {
  if (month === '01') {
    return '31'
  } else if (month === '02') {
    return '28'
  } else if (month === '03') {
    return '31'
  } else if (month === '04') {
    return '30'
  } else if (month === '05') {
    return '31'
  } else if (month === '06') {
    return '30'
  } else if (month === '07') {
    return '31'
  } else if (month === '08') {
    return '31'
  } else if (month === '09') {
    return '30'
  } else if (month === '10') {
    return '31'
  } else if (month === '11') {
    return '30'
  } else if (month === '12') {
    return '31'
  } else {
    return ''
  }
}

export default determineMaxDaysInMonth
