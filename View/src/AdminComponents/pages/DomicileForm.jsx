import { Grid } from "@mui/material";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { useEffect, useState } from "react";
import {  updateDomicile } from "../services/applier";
import {  useParams } from "react-router-dom";
import { getDomiciles } from "../services/applier";
import { InputMask } from 'primereact/inputmask';

const Form = () => {

  const  format =(x, y) =>{
    var z = {
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds()
    };
    y = y.replace(/(M+|d+|h+|m+|s+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + z[v.slice(-1)]).slice(-2)
    });

    return y.replace(/(y+)/g, function(v) {
        return x.getFullYear().toString().slice(-v.length)
    });
}
  const fetchData = async () => {
    const response = await getDomiciles(id);
    const data = response.domicile;
    console.log(data);
    setFormInput((pre)=>{
      return {...pre,
        name: data.fullName,
        relationName: data.relationName,
        phoneNo: data.phone,
        entryDate: format(new Date(data.entryDate), 'yyyy-MM-dd'),
        district: data.Distract,
        tehsil: data.Tehsil,
        cnic: data.CNIC,
        relation: data.relationName,
        dateOfBirth: format(new Date(data.dateOfBirth), 'yyyy-MM-dd'),
        currentDistrict: data.Distract,
        currentTehsil: data.Tehsil,
        parmanentDistrict: "",
        parmanentTehsil: "",
        currentAddress: data.Current_address,
        permanentAddress: data.Permanent_address,
      }})
  };

  const { id } = useParams()
  useEffect(()=>{
    fetchData(id)
  },[])

  const [formInput, setFormInput] = useState({
    name: "",
    relationName: "",
    phoneNo: "",
    entryDate: "",
    district: "",
    tehsil: "",
    cnic: "",
    relation: "",
    dateOfBirth: "",
    currentDistrict: "",
    currentTehsil: "",
    parmanentDistrict: "",
    parmanentTehsil: "",
    currentAddress: "",
    permanentAddress: "",
  });



  const [image, setImage] = useState();

  const handleChange = (e) =>
    setFormInput({ ...formInput, [e.target.name]: e.target.value });

  const handleImage = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  };

  const data = JSON.stringify({
    fullName: formInput.name,
    FatherName: formInput.relationName,
    phone: formInput.phoneNo,
    CNIC: formInput.cnic,
    Current_address: formInput.currentAddress,
    Tehsil: formInput.tehsil,
    Permanent_address: formInput.permanentAddress,
    Distract: formInput.district,
    entryDate: formInput.entryDate,
    relationName: formInput.relationName,
    dateOfBirth: formInput.dateOfBirth,
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(bodyFormdata);
      const domicileId = id;
        try {
          console.log("response succesful", domicileId);
          const res = await updateDomicile(domicileId, data);
          console.log(res);
        } catch (error) {
          alert(error.message);
        }
  };

  return (
    <div className="domicile__form">
      <div className="domicile__form--container">
        <div className="domicile__form--title">
          <h3>Domicile Details</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <Grid container>
            <Grid container justifyContent="space-between">
              <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <div className="domicile__form--input">
                  <label htmlFor="">Applicant Name</label>
                  <input
                    type="text"
                    placeholder="Enter Full Name"
                    name="name"
                    value={formInput.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Grid>

              <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                <div className="domicile__form--input">
                  <label htmlFor="">Applicant Image</label>
                  <input
                    type="file"
                    id="file-upload-button"
                    name="image"
                    multiple
                    onChange={handleImage}
                    // required
                  />
                </div>
              </Grid>

            </Grid>


            <Grid container justifyContent="space-between">
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Entry Date</label>
                  <input
                    type="date"
                    placeholder="Enter Date"
                    name="entryDate"
                    value={formInput.entryDate}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Grid>

              
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">District</label>
                  <select
                    id="districts"
                    name="district"
                    onChange={handleChange}
                    required
                  >
                    <option value="Hangu">Hangu</option>
                    <option value="karak">Karak</option>
                    <option value="peshawar">peshawar</option>
                  </select>
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Tehsil</label>
                  <select
                    id="tehsils"
                    name="tehsil"
                    value={formInput.tehsil}
                    onChange={handleChange}
                    required
                  >
                    <option value="hangu">hangu</option>
                    <option value="karak">Karak</option>
                    <option value="peshawar">peshawar</option>
                  </select>
                </div>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Applicant CNIC</label>
                  <InputMask value={formInput.cnic} 
                    onChange={handleChange} 
                    type="text"
                    name="cnic"
                    mask="99999-9999999-9"
                    required
                    placeholder="99999-9999999-9" />
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Relation</label>
                  <select
                    id="districts"
                    name="districtuyuyi"
                    value={formInput.relationName}
                    onChange={handleChange}
                    required
                  >
                    <option value="father">Father</option>
                    <option value="brother">Brother</option>
                    <option value="brother">mother</option>
                    <option value="brother">brother</option>
                    <option value="uncle">Uncle</option>
                  </select>
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Relational Name</label>
                  <input
                    type="text"
                    placeholder="Enter Relational Name"
                    name="relationName"
                    value={formInput.relationName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between">
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Phone No</label>
                  <input
                    type="number"
                    placeholder="Enter Phone Number"
                    name="phoneNo"
                    value={formInput.phoneNo}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Grid>


              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Date of Birth</label>
                  <input
                    type="date"
                    placeholder="Enter Relational Name"
                    name="dateOfBirth"
                    value={formInput.dateOfBirth}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Grid>


            </Grid>
            <h4>Current Address</h4>
            <Grid container justifyContent="space-between">
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">District</label>
                  <select
                    id="districts"
                    name="currentDistrict"
                    value={formInput.currentDistrict}
                    onChange={handleChange}
                    required
                  >
                    <option value="hangu">hangu</option>
                    <option value="karak">Karak</option>
                    <option value="peshawar">peshawar</option>
                  </select>
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Tehsil</label>
                  <select
                    id="tehsils"
                    name="currentTehsil"
                    value={formInput.currentTehsil}
                    onChange={handleChange}
                    required
                  >
                    <option value="hangu">hangu</option>
                    <option value="karak">Karak</option>
                    <option value="peshawar">peshawar</option>
                  </select>
                </div>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <div className="domicile__form--input">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter current address"
                    name="currentAddress"
                    value={formInput.currentAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Grid>
            </Grid>
            <h4>Permanent Address</h4>
            <Grid container justifyContent="space-between">
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">District</label>
                  <select
                    id="districts"
                    name="parmanentDistrict"
                    value={formInput.parmanentDistrict}
                    onChange={handleChange}
                    required
                  >
                    <option value="hangu">hangu</option>
                    <option value="karak">Karak</option>
                    <option value="peshawar">peshawar</option>
                  </select>
                </div>
              </Grid>
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--input">
                  <label htmlFor="">Tehsil</label>
                  <select
                    id="tehsils"
                    name="parmanentTehsil"
                    value={formInput.parmanentTehsil}
                    onChange={handleChange}
                    required
                  >
                    <option value="hangu">hangu</option>
                    <option value="karak">Karak</option>
                    <option value="peshawar">peshawar</option>
                  </select>
                </div>
              </Grid>
              <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                <div className="domicile__form--input">
                  <label htmlFor="">Address</label>
                  <input
                    type="text"
                    placeholder="Enter parmanent address"
                    name="permanentAddress"
                    value={formInput.permanentAddress}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Grid>
            </Grid>
            <Grid container justifyContent="center">
              <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                <div className="domicile__form--button">
                  <PrimaryButton text="Update" tbPadding={0.4} />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
};

export default Form;
