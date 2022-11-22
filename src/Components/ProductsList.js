import React, { useState, useEffect } from "react";
import ApiURlS from "../Service/ApiURl's";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Container,
  Row,
  Col,
} from "reactstrap";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { Button } from "@mui/material";

const ProductsList = () => {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    ApiURlS.getAllProducts()
      .then((res) => {
        setproducts(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Container>
        <Row xs={3}>
          {products.map((product) => {
            return (
              <Col>
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src={product.productImage}
                    alt="Product Image"
                  />
                  <CardBody>
                    <CardTitle tag="h5"> {product.productName} </CardTitle>
                    <CardSubtitle tag="h6">
                      <CurrencyRupeeIcon /> {product.productPrice}
                    </CardSubtitle>
                    <CardText>{product.productDescription}</CardText>
                    <Button>Add to Card</Button>
                    <Button>Buy Now</Button>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default ProductsList;
