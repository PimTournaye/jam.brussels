const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const formatFullDate = (date: Date) => {
  const month = months[date.getMonth()]
  const day = days[date.getDay()]
  const year = date.getFullYear()
  return `${month} ${day}, ${year}`
}

// print out data in format 'Sat Nov 14'
export const formatFullTime = (date: Date) => {
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const ampm = hours >= 12 ? 'pm' : 'am'
  const hour12 = hours % 12
  const hour = hour12 === 0 ? 12 : hour12
  const min = minutes < 10 ? '0' + minutes : minutes
  return `${hour}:${min}${ampm}`
}

// print out data in format 'Sat Nov 14'
export const formatShortDate = (date: Date) => {
    const month = months[date.getMonth()]
  const day = `${days[date.getDay()]} ${date.getDate()}`
  return `${day} ${month}`
}