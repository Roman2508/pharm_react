export const getMonthAndYearForNews = (monthNum: string, year: string) => {
  let monthName = ""

  if (monthNum === "01") {
    monthName = "Січень"
  } else if (monthNum === "02") {
    monthName = "Лютий"
  } else if (monthNum === "03") {
    monthName = "Березень"
  } else if (monthNum === "04") {
    monthName = "Квітень"
  } else if (monthNum === "05") {
    monthName = "Травень"
  } else if (monthNum === "06") {
    monthName = "Червень"
  } else if (monthNum === "07") {
    monthName = "Липень"
  } else if (monthNum === "08") {
    monthName = "Серпень"
  } else if (monthNum === "09") {
    monthName = "Вересень"
  } else if (monthNum === "10") {
    monthName = "Жовтень"
  } else if (monthNum === "11") {
    monthName = "Листопад"
  } else if (monthNum === "12") {
    monthName = "Грудень"
  }

  return `Новини за ${monthName} ${year} року`
}
