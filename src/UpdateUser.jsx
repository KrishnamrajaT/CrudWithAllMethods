import react, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required"),
  age: Yup.number().positive("Positive").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  phone: Yup.string()
    .min(10, "Too Short!")
    .max(14, "Too Long!")
    .required("Required")
});

export const UpdateUser = ({ users, setRefresh, refresh }) => {
  const [formValues, setFormValues] = useState(users);

  const modifyUser = (body, resetForm) => {
    axios
      .put(`http://localhost:3000/data/${formValues._id}`, body)
      .then(() => {
        setRefresh(!refresh);
        resetForm();
        formValues({
          name: "",
          age: "",
          email: "",
          phone: ""
        });
      })
      .catch(() => {});
  };
  const formik = useFormik({
    initialValues: formValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      modifyUser(values, resetForm);
    }
  });
  useEffect(() => {
    setFormValues(users);
  }, [users]);
  return (
    <>
      <center>
        <h2>UpdateUser</h2>
      </center>
      <form onSubmit={formik.handleSubmit} className="p-3">
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
            ) : null}
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
            ) : null}
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
            ) : null}
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
            ) : null}
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
