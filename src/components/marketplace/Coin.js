import React, { useState } from "react";
import PropTypes from "prop-types";
import { utils } from "near-api-js";
import { Card, Button, Col, Badge, Stack, Row } from "react-bootstrap";

const Coin = ({ coin, buy, expunge, altImage }) => {
  const {
    id,
    price,
    name,
    description,
    sold,
    location,
    image,
    owner,
    quantity,
  } = coin;
  const formattedPrice = utils.format.formatNearAmount(price);

  const [amount, setAmount] = useState(1);

  const triggerBuy = () => {
    buy(id, amount, price);
  };

  const removeEntry = () => {
    expunge(id);
  };

  const updateQuantity = (e) => {
    setAmount(e.target.value);
  };

  const isImgUrl = (url) => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });
  };

  const realImage = isImgUrl(image) ? altImage : image;

  return (
    <Col key={id}>
      <Card className=" h-100">
        <Card.Header>
          <Stack direction="horizontal" gap={2}>
            <span className="font-monospace text-secondary">{owner}</span>
            {quantity <= 0 ? (
              <Badge bg="secondary" className="ms-auto">
                Out of Stock
              </Badge>
            ) : (
              <Badge bg="secondary" className="ms-auto">
                {quantity} Remaining Coins
              </Badge>
            )}
          </Stack>
        </Card.Header>
        <div className=" ratio ratio-4x3">
          <img src={realImage} alt={name} style={{ objectFit: "cover" }} />
        </div>
        <Card.Body className="d-flex  flex-column text-center">
          <Card.Title>{name}</Card.Title>
          <Card.Text className="flex-grow-1 ">{description}</Card.Text>
          <Card.Text className="text-secondary">
            <span>{location}</span>
          </Card.Text>
          <Row class="qnty">
            <Col>
              <label for="buy" id="lsel">
                Quantity:
              </label>
            </Col>
            <Col xs={8}>
              <select onChange={updateQuantity} value={amount} id="buy">
                {[...Array(quantity).keys()].map((i) => (
                  <option>{i + 1}</option>
                ))}
              </select>
            </Col>
          </Row>
          <Button
            variant="outline-dark"
            onClick={triggerBuy}
            className="w-100 py-3"
          >
            Buy for {formattedPrice * amount} NEAR
          </Button>
          <Button
            variant="outline-blue"
            onClick={removeEntry}
            className="w-100 py-3 btn-danger"
          >
            delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

Coin.propTypes = {
  coin: PropTypes.instanceOf(Object).isRequired,
  buy: PropTypes.func.isRequired,
};

export default Coin;
