import React from "react";
import "./StudentCard.css";
import Textinput from "../../Share/Textinput/Textinput";
import axios from "axios";
import { ipconfig } from "../../core/ipconfig";

const StudentCard = ({ title, onClose, data, setData, fetchdata }: any) => {
  const HandleTextChange = (Name: any, value: any) => {
    const AllData: any = { ...data };
    AllData[Name] = value;
    setData(AllData);
  };

  const HandleAddStudent = async () => {
    if (title === "Add New Student") {
      try {
        let response = await axios.post(`${ipconfig}/students/create`, data);
        console.log(response?.data);
        await fetchdata();
      } catch (error: any) {
        console.log(error);
      }
    } else {
      console.log(data?._id);
      try {
        let response = await axios.post(`${ipconfig}/students/update`, data, {
          params: { id: data._id },
        });
        console.log(response?.data);
        await fetchdata();
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  return (
    <div className="studentCard-container">
      <div className="studentCard-Innercontainer">
        <div className="studentcard-title">{title}</div>
        <div className="studentcard-inputItems">
          <Textinput
            type="text"
            placeholder="Name"
            width={286}
            height="40px"
            value={data?.Name}
            onChange={(e: any) => {
              HandleTextChange("Name", e.target.value);
            }}
          />
        </div>
        <div className="studentcard-inputItems">
          <Textinput
            type="text"
            placeholder="Email"
            width={286}
            height="40px"
            value={data?.Email}
            onChange={(e: any) => {
              HandleTextChange("Email", e.target.value);
            }}
          />
        </div>
        <div className="studentcard-inputItems">
          <Textinput
            type="text"
            placeholder="Phone"
            width={286}
            height="40px"
            value={data?.PhoneNumber}
            onChange={(e: any) => {
              HandleTextChange("PhoneNumber", e.target.value);
            }}
          />
        </div>
        <div className="studentcard-inputItems">
          <Textinput
            type="text"
            placeholder="Enroll Number"
            width={286}
            height="40px"
            value={data?.EnrollNumber}
            onChange={(e: any) => {
              HandleTextChange("EnrollNumber", e.target.value);
            }}
          />
        </div>
        <div className="studentcard-inputItems">
          <Textinput
            type="text"
            placeholder="Date of Admission"
            width={286}
            height="40px"
            value={data?.AdmissionDate}
            onChange={(e: any) => {
              HandleTextChange("AdmissionDate", e.target.value);
            }}
          />
        </div>
        <div
          className="studentcard-Button submitbutton"
          onClick={() => {
            HandleAddStudent();
            onClose();
          }}
        >
          Submit
        </div>
        <div className="studentcard-Button cancelbutton" onClick={onClose}>
          Cancel
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
