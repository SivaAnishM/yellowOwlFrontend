import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Modal from "@mui/material/Modal";
import StudentCard from "../../Component/StudentCard/StudentCard";
import Textinput from "../../Share/Textinput/Textinput";
import axios from "axios";
import { ipconfig } from "../../core/ipconfig";

const Dashboard = () => {
  const [addPortal, setAddPortal] = useState<boolean>(false);
  const [deletePortal, setdeletePortal] = useState<boolean>(false);

  const [data, setdata] = useState<any>([]);
  let [searchdata, setsearchData] = useState<any>([]);

  const studentDetailes: any = {
    Name: "",
    Email: "",
    PhoneNumber: "",
    EnrollNumber: "",
    AdmissionDate: "",
  };

  const [studentCardtitle, setStudentCardTitle] = useState<any>("");
  const [selectedStudentdetails, setselectedStudentDetails] = useState<any>({});

  // update text based on width
  function updateButtonText() {
    const addButton: any = document.querySelector(".dashboard-addButton");

    if (window.innerWidth <= 800) {
      addButton.textContent = "ADD";
    } else {
      addButton.textContent = "ADD NEW STUDENT";
    }
  }

  // Initial check
  useEffect(() => {
    updateButtonText();
    HandleFetchAllStudent();
  }, []);

  // Update text on window resize
  window.addEventListener("resize", updateButtonText);

  const handleSearch = (val: any) => {
    if (val?.length > 1) {
      let res = searchdata?.filter((item: any) => {
        // Check if the Name or Email property contains the search value
        return (
          item.Name.toLowerCase().includes(val.toLowerCase()) ||
          item.Email.toLowerCase().includes(val.toLowerCase())
        );
      });
      setdata(res);
    } else {
      setdata(searchdata);
    }
    console.log(val);
  };

  const HandleFetchAllStudent = async () => {
    try {
      let response = await axios.get(`${ipconfig}/students/fetchAll`);
      console.log(response?.data);
      setdata(response?.data);
      setsearchData(response?.data);
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleDeleteStudent = async () => {
    try {
      let response = await axios.delete(
        `${ipconfig}/students/delete/${selectedStudentdetails?._id}`
      );
      console.log(response?.data);
      await HandleFetchAllStudent();
    } catch (error: any) {
      console.log(error);
    }
    setdeletePortal(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-Innercontainer">
        <div className="dashboard-headContents">
          <div className="dashboard-heading">Students</div>
          <div className="dashboard-searchConatiner">
            <Textinput
              type="text"
              placeholder="Search..."
              height="40px"
              width={"auto"}
              onChange={(e: any) => {
                handleSearch(e.target.value);
              }}
            />

            <div
              className="dashboard-addButton"
              onClick={() => {
                setStudentCardTitle("Add New Student");
                setAddPortal(true);
                setselectedStudentDetails(studentDetailes);
              }}
            ></div>
          </div>
        </div>

        <div className="dashboard-ListContainer">
          <div className="dashboard-InnerListCntainer">
            <div className="dashboard-Listheader">
              <div className="dashboard-headeritems">Name</div>
              <div className="dashboard-headeritems">Email</div>
              <div className="dashboard-headeritems">Phone</div>
              <div className="dashboard-headeritems">Enroll Number</div>
              <div className="dashboard-headeritems">Date of admission</div>
              <div className="dashboard-headeritems Lastlistitems"></div>
            </div>
            <div className="dashboard-ListItemContainer">
              {data?.length > 0
                ? data?.map((i: any, index: any) => {
                    return (
                      <div className="dashboard-ListItemBox" key={index}>
                        <div className="dashboard-listitems">
                          <div className="listItem-userLogo"></div>
                          <div>{i?.Name}</div>
                        </div>
                        <div className="dashboard-listitems">{i?.Email}</div>
                        <div className="dashboard-listitems">
                          {i?.PhoneNumber}
                        </div>
                        <div className="dashboard-listitems">
                          {i?.EnrollNumber}
                        </div>
                        <div className="dashboard-listitems">
                          {i?.AdmissionDate}
                        </div>
                        <div className="dashboard-listitems Lastlistitems">
                          <img
                            src={require("../../assets/EditIcon.png")}
                            alt="Edit-logo"
                            className="Listitems-button"
                            onClick={() => {
                              setStudentCardTitle("Edit Student");
                              setAddPortal(true);
                              setselectedStudentDetails(i);
                            }}
                          />
                          <img
                            src={require("../../assets/DeleteIcon.png")}
                            alt="Delete-logo"
                            className="Listitems-button"
                            onClick={() => {
                              setdeletePortal(true);
                              setselectedStudentDetails(i);
                            }}
                          />
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={addPortal}
        onClose={() => {
          setAddPortal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="dashboard-portalContainer"
      >
        <StudentCard
          onClose={() => {
            setAddPortal(false);
          }}
          title={studentCardtitle}
          data={selectedStudentdetails}
          setData={setselectedStudentDetails}
          fetchdata={HandleFetchAllStudent}
        />
      </Modal>

      <Modal
        open={deletePortal}
        onClose={() => {
          setdeletePortal(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="dashboard-portalContainer"
      >
        <div className="dashboar-deleteContainer">
          <div className="dashboard-DeleteTitle">
            Are you sure to delete this student ?
          </div>

          <div className="dashboard-deleteButtoncontainer">
            <div
              className="dashboard-buttons "
              style={{ background: "#22C53C" }}
              onClick={() => {
                handleDeleteStudent();
              }}
            >
              Yes
            </div>
            <div
              className="dashboard-buttons "
              style={{ background: "#C55322" }}
              onClick={() => {
                setdeletePortal(false);
              }}
            >
              No
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
