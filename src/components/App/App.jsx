import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import ArticleList from '../ArticleList/ArticleList';
import { fetchArticlesWithTopic } from '../articles-api';
import SearchForm from '../SearchForm/SearchForm';
import Loader from '../Loader/Loader';
import Error from '../Error/Error';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async topic => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      <h1>Latest articles</h1>
      {loading && <Loader />}
      {error && <Error />}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
}

export default App;
