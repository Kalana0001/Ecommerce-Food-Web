import React, { useState } from 'react';
import axios from 'axios';
import './AddReview.css';
import { Link } from 'react-router-dom';
import { toast} from 'react-toastify';

const AddReview = () => {
  const [name, setName] = useState('');
  const [disc, setDisc] = useState('');
  const [customDisc, setCustomDisc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const descriptionToSend = customDisc ? customDisc : disc;
      await axios.post('http://localhost:8089/mongo-addUser', { name, disc: descriptionToSend });
      toast.success("Review added to cart successfully!");
    
      setName('');
      setDisc('');
      setCustomDisc('');
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user');
    }
  };

  return (
    <div className='addreview'>
    <div className="add-user-container">
      <h2>Add Reviews</h2>
      <form className="add-user-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <br />
        <label>Description:</label>
        <textarea
          value={disc}
          onChange={(e) => setDisc(e.target.value)}
          placeholder="Type or select from dropdown"
        />
        <br />
        <label>Or select from dropdown:</label>
        <select
          value={customDisc}
          onChange={(e) => setCustomDisc(e.target.value)}
        >
          <option value="">Select...</option>
          <option value="Fast and reliable service!">Fast and reliable service!</option>
          <option value="High-quality products, great value.">High-quality products, great value.</option>
          <option value="Excellent customer support, very helpful.">Excellent customer support, very helpful.</option>
        </select>
        <br />
        <button type="submit">Add User</button>
        <Link to="/review"><button className='reback' type="button">Back</button></Link>
      </form>
    </div>
    </div>
  );
};

export default AddReview;
