import { Grid } from "@mui/material";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import img from "../../../public/pak_logo.png"

const createPDF = async () => {
  const input = document.getElementById("pdf");
  html2canvas(input).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    pdf.addImage(imgData, "JPEG", 0, 0);
    // pdf.output('dataurlnewwindow');
    pdf.save("download.pdf");
  });
};



// Create Document Component

import { getDomiciles } from "../services/applier";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Domicile = () => {
  // const { domicile } = useSelector((state) => state.domicile);

  const [domicile, setDomicilesArray] = useState(null);
  const {id} = useParams()
  const fetchData = async () => {
    const response = await getDomiciles(id);
    const data = response.domicile;
    console.log(data);
    setDomicilesArray(data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    domicile?<div className="App">
      <div className="mb5">
        <button onClick={createPDF}>Print</button>
      </div>
      <div className="domicile__card">
        <div id="pdf">
          <div className="domicile__card--container">
            <div style={{ border: "2px solid green" }}>
              <div
                style={{
                  border: "2px solid green",
                  margin: "3px",
                  padding: "20px",
                }}
              >
                <div className="domicile__card--header">
                  <Grid container>
                    <Grid container>
                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <div className="domicile__card--img">
                          <img src={img} alt="" />
                        </div>
                      </Grid>
                      <Grid item xs={5} sm={5} md={5} lg={5} xl={5}>
                        <div className="domicile__card--number">
                          <h3>Domicile No <span style={{textDecoration:'underline'}}>{domicile.serialNumber}</span></h3>
                        </div>
                      </Grid>
                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <div className="domicile__card--logo">
                          <div className="domicile__card--img">
                            <img
                              src={`http://127.0.0.1:3000/img/${domicile.images[0]}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="domicile__card--heading">
                          <h1>Domicile Certificate</h1>
                          <p>
                            the Pakistan Citizenship Act, 1951 (Act, li o 1951){" "}
                            <br />
                            Rules Made Through Under (Vide Rule No.23)
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="domicile__card--description">
                          <p>
                            I <span>{domicile.fullName}</span> Son/Daughter/Wife
                            of <span>{domicile.relationName}</span> <br />{" "}
                            Declare that I was born of parents who are
                            permanently domiciled in XYZ, province having
                            belinged to it by birht/ settled in it.
                            <br /> I belong to village / Mohalla
                            <span>{domicile.Current_address}</span> <br />{" "}
                            Tehsil <span>{domicile.Tehsil}</span>
                            District <span>{domicile.Distract}</span> <br />
                            Addresss <span>
                              {domicile.Current_address}
                            </span>{" "}
                            <br />
                            Date Of Birth <span>
                              {domicile.dateOfBirth}
                            </span>{" "}
                            CNIC <span>{domicile.CNIC} </span>
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <div className="domicile__card--signed">
                          <h3>Counter Signed by</h3>
                          <h5>DEPUTY COMMISSIONER/ASSISTANT COMMISSIONER</h5>
                          Date ___________________
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>: <h1>LOADING</h1>
    // <div>AGF</div>
  );
};
export default Domicile;
