import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './components/Card';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [timezone, setTimezone] = useState('Asia/Bangkok');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get('https://maqe.github.io/json/authors.json');
        const postsResponse = await axios.get('https://maqe.github.io/json/posts.json');

        const users = usersResponse.data;
        const posts = postsResponse.data;

        const mergedData = posts.map(post => {
          const user = users.find(user => user.id === post.author_id);
          return { ...post, author: user ? user.name : 'Unknown', avatar_url: user.avatar_url };
        });

        setCards(mergedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <div className="header">MAQE Forum</div>
      <div className="bodyhead">You current time is: Asia/Bangkok</div>
      <div className="content">
        {cards.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

export default App;
