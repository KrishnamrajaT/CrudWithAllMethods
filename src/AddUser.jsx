import react from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export const AddUser = ({ refresh, setRefresh }) => {
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(15, "Too Long!")
      .required("Required"),
    age: Yup.number()
      .min(1, "Min value is 1")
      .max(100, "Max value is 100")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .min(10, "Too Short!")
      .max(15, "Too Long!")
      .required("Required")
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      email: "",
      phone: ""
    },
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      axios
        .post("http://localhost:3000/data", values)
        .then((res) => {
          resetForm();
          setRefresh(!refresh);
        })
        .catch((err) => {
          console.log("ERR", err);
        });
    }
  });
  return (
    <>
      <center>
        <h2>AddUser</h2>
      </center>
      <form onSubmit={formik.handleSubmit} className="p-4">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            placeholder="Enter name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Form.Text className="text-muted">
            {formik.touched.name && Boolean(formik.errors.name) ? (
              <div>{formik.errors.name}</div>
            ) : (
              ""
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Age</Form.Label>
          <Form.Control
            name="age"
            placeholder="Enter age"
            value={formik.values.age}
            onChange={formik.handleChange}
          />
          <Form.Text className="text-muted">
            {formik.touched.age && Boolean(formik.errors.age) ? (
              <div>{formik.errors.age}</div>
            ) : (
              ""
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            name="email"
            placeholder="Enter email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <Form.Text className="text-muted">
            {formik.touched.email && Boolean(formik.errors.email) ? (
              <div>{formik.errors.email}</div>
            ) : (
              ""
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            name="phone"
            placeholder="Enter phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <Form.Text className="text-muted">
            {formik.touched.phone && Boolean(formik.errors.phone) ? (
              <div>{formik.errors.phone}</div>
            ) : (
              ""
            )}
          </Form.Text>
        </Form.Group>

        <div>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
};
