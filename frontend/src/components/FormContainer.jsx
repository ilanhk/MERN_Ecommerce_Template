import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
        <Row className="justify-content-md-center">
            <Col xs={12} md={6}>
                { children }
            </Col>
        </Row>
    </Container>
  )
}

export default FormContainer;
//xs={12} md={6} on extra small screen it will be stacked on medium screens it will take up half