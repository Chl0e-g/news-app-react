import api from './api'

export const fetchArticles = async () => {
    const {data: {articles}} = await api.get('/articles')
    return articles
}