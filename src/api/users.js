import api from './api'

export const fetchUserByUsername = async (username) => {
    const {data: {user}} = await api.get(`/users/${username}`)
    return user
}