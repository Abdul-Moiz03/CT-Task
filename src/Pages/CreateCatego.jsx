import axios from "axios";
import "./CreateCatego.css";
import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import { isJwtExpired } from "jwt-check-expiration";
import { useNavigate } from "react-router-dom";
const baseURL = "https://ct-testing.herokuapp.com";

const checkJWT = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (isJwtExpired(accessToken)) {
    let token = localStorage.getItem("refreshToken");
    if (isJwtExpired(token)) {
      return null;
    } else {
      return true;
    }
  } else {
    return false;
  }
};
const renewApi = () => {
  axios
    .post(`${baseURL}/admin/renewAccessToken`, {
      refreshToken: localStorage.getItem("refreshToken"),
    })
    .then((data) => {
      localStorage.removeItem("accessToken");
      localStorage.setItem("accessToken", data.data.data[0].NewAccessToken);
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
};
const CreateCatego = () => {
  const [showModal, setShow] = useState(false);
  const [Name, setName] = useState("");
  const [data, setdata] = useState([]);
  const [namee, setNamee] = useState("");
  const [pkId, setId] = useState(0);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  console.log(data);
  console.log(namee);
  const accessToken = localStorage.getItem("accessToken");
  useEffect(() => {
    getData();
  }, []);
  console.log(accessToken);

  const getData = () => {
    let token = checkJWT();
    // accessToken
    token === null && navigate("/login");
    token === true && renewApi();
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(`${baseURL}/admin/categories`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((data) => {
        setdata(data.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const [password, setPassword] = useState('');

  const handleSubmint = () => {
    let token = checkJWT();
    // accessToken
    token === null && navigate("/login");
    token === true && renewApi();
    const accessToken = localStorage.getItem("accessToken");
    console.log(token);
    axios
      .post(
        `${baseURL}/admin/createCategory`,
        { Name: Name },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((data) => {
        console.log(data);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    let token = checkJWT();
    // accessToken
    token === null && navigate("/login");
    token === true && renewApi();
    const accessToken = localStorage.getItem("accessToken");
    axios
      .delete(`${baseURL}/admin/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((data) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEdit = (id, name) => {
    // let namee = prompt("Please enter your name", name);
    handleShow();
    setNamee(name);
    // handleClose();
    setId(id);
  };

  const handleSaveChanges = () => {
    let token = checkJWT();
    // accessToken
    token === null && navigate("/login");
    token === true && renewApi();
    const accessToken = localStorage.getItem("accessToken");

    axios
      .put(
        `${baseURL}/admin/categories/${pkId}`,
        {
          Name: namee,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((data) => {
        getData();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="maindiv container text-center py-5">
      <Form className="create-form main">
        <div className="form-group form-items">
          <input
            className="form-control"
            placeholder="Category Name"
            type="text"
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          />
        </div>

        {/* <Form.Field>
      <label>Last Name</label>
      <input placeholder='Last Name' type="text"
          value={userName}
          onChange={e => {
            setUserName(e.target.value);
          }}
          required />
    </Form.Field> */}

        <Button
          style={{ margin: 20 }}
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmint}
          disabled={Name === ""}
        >
          Add Category
        </Button>
      </Form>

      <h2 className="text-center">Category List</h2>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Icon</th>
              <th scope="col">Action</th>
              {/* <th scope="col">Handle</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.map((e, i) => (
              <tr key={i}>
                <td>{e.PKCategoryId}</td>
                <td>{e.Name}</td>
                <td>
                  <img src={e.Icon} alt="None" />
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleEdit(e.PKCategoryId, e.Name)}
                  >
                    Edit
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    className="btn btn-danger"
                    onClick={() => handleDelete(e.PKCategoryId)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* modal */}

      <div className="d-flex align-items-center justify-content-center"></div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Category Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            className="form-control"
            placeholder="Category Name"
            type="text"
            value={namee}
            onChange={(e) => {
              setNamee(e.target.value);
            }}
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-primary"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            className="btn btn-primary"
            variant="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateCatego;
