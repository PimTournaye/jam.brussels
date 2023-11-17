const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

/**
 *  print out data in format 'Sat Nov 14, 2020'
 * @param date 
 * @returns string
 */
export const formatFullDate = (date: Date | string) => {
  // If input is type string, convert it to type Date ie. 2333-02-11 -> Date(2333-02-11)
  if (typeof date === 'string') date = new Date(Date.parse(date))
  const month = months[date.getMonth()]
  const day = days[date.getDay()]
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}


/**
 *  print out time of the input date in format '12:00am'
 * @param date 
 * @returns string
 */
export const formatFullTime = (date: Date) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hour12 = hours % 12
  const hour = hour12 === 0 ? 12 : hour12
  const min = minutes < 10 ? `0${minutes}` : minutes
  return `${hour}:${min}${ampm}`
}

/**
 *  print out data in format 'Sat Nov 14'
 * @param date 
 * @returns string
 */
export const formatShortDate = (date: Date | string) => {
  // If input is type string, convert it to type Date ie. 2333-02-11 -> Date(2333-02-11)
  if (typeof date === 'string') date = new Date(Date.parse(date))
  const month = months[date.getMonth()]
  const day = `${days[date.getDay()]} ${date.getDate()}`
  return `${day} ${month}`
}