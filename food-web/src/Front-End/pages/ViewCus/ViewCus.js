import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import "./ViewCus.css";

const ViewCus = () => {
    const [user, setUser] = useState([]);

    const {id} = useParams([]);

    useEffect(() => { 
        axios.get(`http://localhost:8089/api/get/${id}`)
             .then((resp) => setUser({...resp.data[0]}));
    }, [id]);

  return (
    <div  className='viewall'>
    <div className='viewcard'>
        <div className='viewcard-header'>
            <h2>{user.name}'s Contact Details</h2>
        </div>
        <div className="viewcard-body">
            <div className="centered-data">
                <img src={`http://localhost:8089/images/${user.image}`} alt="uploaded" className="card-image1" />
                <div className='data-container'>
                    <p className='viewp'><strong>Procut ID:</strong> {id}</p>
                    <p className='viewp'><strong>Name:</strong> {user.pname}</p>
                    <p className='viewp'><strong>Type:</strong> {user.ptype}</p>
                    <p className='viewp'><strong>Price:</strong> {user.price}</p>
                    <p className='viewp'><strong>Stock:</strong> {user.pstock}</p>
                    <p className='viewp'><strong>Discription:</strong> {user.pdisc}</p>
                    <p className='viewp'><strong>Supplier ID:</strong> {user.supid}</p>
                </div>
            </div>
            <Link to="/admindashboard" className="viewbtn1">Go Back</Link>
        </div>
    </div>
</div>
  )
}

export default ViewCus;