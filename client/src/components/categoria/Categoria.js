import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Style.css";
import Button from "@material-ui/core/Button";
const Categoria = () => {
  return (
    <Container>
      <Row>
        <Col xs={6} md={4} className="image">
          <Image  roundedCircle />
          <p>
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
          <Button variant="contained" color="primary">
            Primary
          </Button>
        </Col>
        <Col xs={6} md={4} className="image">
          <Image  roundedCircle />
          <p>
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
          <Button variant="contained" color="primary">
            Primary
          </Button>
        </Col>
        <Col xs={6} md={4} className="image">
          <Image roundedCircle />
          <p>
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
          <Button variant="contained" color="primary">
            Primary
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Categoria;