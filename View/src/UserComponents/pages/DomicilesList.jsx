import { useEffect, useState } from "react";
import { getDomiciles } from "../services/domiciles";
import { useNavigate } from 'react-router-dom';
const DomicilesList = () => {
  const nav = useNavigate()
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
                <button
                disabled = {item ?.isActive === false ? true : false}
                style ={item ?.isActive === false ? { marginRight: "6px",backgroundColor:'red' } : { marginRight: "6px",backgroundColor:'green' }}
                  onClick={() => nav('/user/domicile/'+item?._id)}
                >
                  Download
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
