import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ArticleList from '../ArticleList/ArticleList';
import { fetchArticlesWithTopic } from '../articles-api';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        // const response = await axios.get(
        //   'https://hn.algolia.com/api/v1/search?query=react'
        // ); - замість цього використаєм
        const data = await fetchArticlesWithTopic('react');
        setArticles(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);

  return (
    <div>
      <h1>Latest articles</h1>
      {loading && <p>Loading data, please wait...</p>}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}

export default App;
