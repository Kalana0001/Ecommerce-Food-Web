import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ReviewPage.css';

const ReviewPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8089/mongo-getUsers')
      .then(response => {
        console.log('Users received from backend:', response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);  

  return (
        <div className='review'>
            <div className="user-list-container">
                <h2>User Reviews</h2>
                <a href='/addreview' className="add-user-link">Add Reviews</a>
                <ul className="user-list">
                    {users.map(user => (
                    <li key={user._id} className="user-item">
                        {user.name} - {user.disc}
                    </li>
                    ))}
                </ul>
            </div>
        </div>
  );
};

export default ReviewPage;
