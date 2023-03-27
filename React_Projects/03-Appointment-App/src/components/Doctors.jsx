import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { AddModal } from "./AddModal"
import { useState } from "react"

const Doctors = ({ doctors, appointments, setAppointments }) => {
  const [show, setShow] = useState(false)
  const [selectedDrName, setSelectedDrName] = useState("")

  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  const handleClick = (drName) => {
    // handleShow()
    setShow(true)
    setSelectedDrName(drName)
  }

  console.log(selectedDrName)
  return (
    <Container className="p-2">
      <h3 className="display-6 mb-3" style={{ color: "rgb(166, 18, 189)" }}>
        Our Doctors
      </h3>

      <Row className="justify-content-center">
        {doctors.map((dr) => (
          <Col key={dr.id} xs={6} sm={4} md={3}>
            <img
              src={dr.img}
              alt={dr.name}
              className="img-thumbnail doctor-img"
              onClick={() => handleClick(dr.name)}
            />
            <h5>{dr.name}</h5>
            <h6>{dr.dep}</h6>
          </Col>
        ))}
      </Row>
      {/* <AddModal show={show} handleClose={handleClose} /> */}
      <AddModal
        show={show}
        handleClose={() => setShow(false)}
        drName={selectedDrName}
        appointments={appointments}
        setAppointments={setAppointments}
      />
    </Container>
  )
}

export default Doctors
