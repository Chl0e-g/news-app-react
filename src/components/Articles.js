import ArticlesList from "./ArticlesList"
import ArticlesNav from "./ArticlesNav"
import {useState} from "react"

function Articles() {
    const [currentTopic, setCurrentTopic] = useState('all')

    return (
        <>
        <ArticlesNav currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />
        <ArticlesList/>
        </>
    )
}

export default Articles