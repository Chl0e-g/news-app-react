export const formatDate = (date) => {
    const formattedDate = new Date(date)
    const day = formattedDate.getDate()
    const month = formattedDate.toString().slice(4, 7)
    const year = formattedDate.toString().slice(10, 15)
    return `${day} ${month}, ${year}`
}