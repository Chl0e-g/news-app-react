import api from './api'

export const fetchTopics = async () => {
    const {data: {topics}} = await api.get('/topics')
    return topics
}