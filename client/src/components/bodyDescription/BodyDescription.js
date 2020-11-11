import React from "react";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import cuadrado2 from "./cuadrado2.jpg";
import "./Style.css";
const BodyDescription = () => {
  return (
    <Container>
      <Row className="tamanio">
        <Col xs={2} md={4} className="colImage">
          <Image src={cuadrado2} thumbnail className="image"/>
          <p>

            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
        </Col>
        <Col xs={6} md={4} className="colImagereverse">
          <Image src={cuadrado2} thumbnail  className="image" />
          <p>
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
        </Col>
        <Col xs={6} md={4} className="colImage">
          <Image src={cuadrado2} thumbnail className="image" />
          <p>
            Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod.
            Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo
            risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo
            cursus magna.
          </p>
          >
        </Col>
      </Row>
    </Container>
  );
};

export default BodyDescription;
