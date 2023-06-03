import { MDBDataTable } from "mdbreact";
import { useEffect, useState } from "react";
import { approveDomicile, getDomiciles , deleteDomicile} from "../services/domiciles";

import { FaEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { NotificationManager} from 'react-notifications';

const DomicilesList = () => {
  const nv = useNavigate()
  const [domicilesArray, setDomicilesArray] = useState([]);
  const fetchData = async () => {
    const response = await getDomiciles();
    const data = response?.data;
    console.log(data);
    setDomicilesArray(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApproved = async (id) => {
    const response = await approveDomicile(id);
    const data = response?.data;
    console.log(data);
    NotificationManager.success('Approved Successfully')
    fetchData();
  };

  const handleDelete = async(id)=>{
    const response = await deleteDomicile(id);
    const data = response?.data;
    console.log(data);
    NotificationManager.success('Deleted Successfully')
    fetchData();
  }

  return (
    <div className="domiclies__list">
      <div className="domiclies__list--container">
        <table id="customers">
          <tr>
            <th>FullName</th>
            <th>CNIC</th>
            <th>Distract</th>
            <th>Tehsil</th>
            <th>Parmanent Address</th>
            <th>Status</th>
            <th>Options</th>
            <th>Actions</th>
          </tr>
          {domicilesArray?.map((item) => (
            <tr key={item._id}>
              <td>{item?.fullName}</td>
              <td>{item?.CNIC}</td>
              <td>{item?.Distract}</td>
              <td>{item?.Tehsil}</td>
              <td>{item?.Permanent_address}</td>
              <td>{item?.isActive === true ? "Approved" : "Not Approved"}</td>
              <td>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaEye size={20} style={{ padding: "5px" }} onClick={()=>{
                  nv("/admin/domicile/"+item?._id)
                }}/>
                <FiEdit size={20} style={{ padding: "5px" }} 
                onClick={()=>{nv("/admin/domicile/edit/"+item?._id)}}
                />

                <AiFillDelete size={20} style={{ color: "red", padding: "5px" }}

                onClick={()=>{handleDelete(item?._id)}}
                />
              </div>
              </td>
              <td>
                <button
                  style={{ marginRight: "6px" }}
                  onClick={() => handleApproved(item?._id)}
                >
                  Approved
                </button>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default DomicilesList;
