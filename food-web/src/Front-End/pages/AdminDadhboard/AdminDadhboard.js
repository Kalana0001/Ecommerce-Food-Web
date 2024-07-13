import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from "axios";
import './AdminDadhboard.css';
import logo from '../../assests/log.png'; 
import { FaUser } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import { IoFastFood } from "react-icons/io5";


const AdminDadhboard = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const [data, setData] = useState([]);

  const loadData = async () => {
      const response = await axios.get("http://localhost:8089/selectusers");
      setData(response.data);
  };

  useEffect(() => {
      loadData();
  }, []);

  const deleteData = (id) => {
      if(window.confirm("Are you sure?")){
          axios.delete(`http://localhost:8089/api/userremove/${id}`);
          toast.success("Data Deleted Successfully");
          setTimeout(() => loadData(), 500);
      }
  };

  return (
    <div className="sidecontainer">
      <div className={`sidenav ${sidebarVisible ? 'visible' : 'hidden'}`}>
        <a href="#" className="sidelogo" id="sidealog">
          <img src={logo} alt="Logo"/>
          <span className="sidenav-head">Admin</span>
        </a>
        <div className='sidehover'>
          <a href="#" className="sidea">
            <i className="fas fa-menorah"><FaUser id="sideicon" /></i>
            <span className="sidesnav-item"><strong>Customers</strong></span>
          </a>
        </div>
        <div className='sidehover'>
          <a href="/productdash" className="sidea">
            <i className="fas fa-menorah"><IoFastFood id="sideicon" /></i>
            <span className="sidesnav-item"><strong>Prodcuts</strong></span>
          </a>
        </div>
        <div className='sidehover'>
          <a href="#" className="sidea">
            <i className="fas fa-menorah"><FaUser id="sideicon" /></i>
            <span className="sidesnav-item"><strong>Suppliers</strong></span>
          </a>
        </div>
        <div className='sidehover'>
          <a href="#" className="sidea">
            <i className="fas fa-menorah"><FaUser id="sideicon" /></i>
            <span className="sidesnav-item"><strong>Settings</strong></span>
          </a>
        </div>
      </div>

      <section className="main">
        <div className="main-top">
        <button className="togglebutton" onClick={toggleSidebar}><CgMenuGridR className='togicon' /></button>
          <h1>Admin Dashboard</h1>
          <i className="fas fa-user-cog"></i>
        </div>
        <div className="users">
          <div className="card">
            <img src={logo} alt="User"/>
            <h4>Customers</h4>
            <p>Here</p>
            <div className="per">
              <table>
                <tr>
                  <td><span>85%</span></td>
                  <td><span>87%</span></td>
                </tr>
                <tr>
                  <td>2023</td>
                  <td>2024</td>
                </tr>
              </table>
            </div>
            <button>Show</button>
          </div>
          <div className="card">
            <img src={logo} alt="User"/>
            <h4>Supplires</h4>
            <p>Here</p>
            <div className="per">
              <table>
                <tr>
                  <td><span>82%</span></td>
                  <td><span>85%</span></td>
                </tr>
                <tr>
                  <td>2023</td>
                  <td>2024</td>
                </tr>
              </table>
            </div>
            <button>Show</button>
          </div>
          <div className="card">
            <img src={logo} alt="User"/>
            <h4>Products</h4>
            <p>Here</p>
            <div className="per">
              <table>
                <tr>
                  <td><span>94%</span></td>
                  <td><span>92%</span></td>
                </tr>
                <tr>
                  <td>2023</td>
                  <td>2024</td>
                </tr>
              </table>
            </div>
            <button>Show</button>
          </div>
          <div className="card">
            <img src={logo} alt="User"/>
            <h4>Orders</h4>
            <p>Here</p>
            <div className="per">
              <table>
                <tr>
                  <td><span>85%</span></td>
                  <td><span>82%</span></td>
                </tr>
                <tr>
                  <td>2023</td>
                  <td>2024</td>
                </tr>
              </table>
            </div>
            <button>Show</button>
          </div>
        </div>

        <section className="attendance">
          <div className="attendance-list">
          <Link to="/addeditUsers">
                <button className='btn btn-add'>Add</button>
          </Link>
          </div>
        </section>

        <section className="attendance">
          <div className="attendance-list">
            <h1>Customer List</h1>
            <table className="table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Supplier ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Address</th>
                  <th>password</th>
                  <th>Update</th>
                  <th>Delete</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
              {data.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <th scope='row'>{index+1}</th>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.contact}</td>
                    <td>{item.address}</td>
                    <td>{item.password}</td>
                    <td><Link to={`/addeditUsers/${item.id}`}><button className='btn btn-edit'>Update</button></Link></td>
                    <td><button className='btn-delete' onClick={() => deleteData(item.id)}>Delete</button></td>
                    <td><Link to={`/viewcus/${item.id}`}><button className='btn btn-view'>View</button></Link></td>
                </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </section>
      </section>
    </div>
  );
}

export default AdminDadhboard;
