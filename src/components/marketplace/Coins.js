import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import AddListing from "./AddListing";
import Coin from "./Coin";
import Loader from "../utils/Loader";
import { Row, Button } from "react-bootstrap";
import { NotificationSuccess, NotificationError } from "../utils/Notifications";
import {
  getCoins as getCoinList,
  buyCoin,
  createListing,
  deleteCoin,
  clearListing,
} from "../../utils/marketplace";

// images imports
import Image1 from "../../assets/1.jpg";
import Image2 from "../../assets/2.jpg";
import Image3 from "../../assets/3.jpg";
import Image4 from "../../assets/4.jpg";
import Image5 from "../../assets/5.jpg";
import Image6 from "../../assets/6.jpg";
import Image7 from "../../assets/7.jpg";
import Image8 from "../../assets/8.jpg";
import Image9 from "../../assets/9.jpg";
import Image10 from "../../assets/10.jpg";

const images = [
  Image1,
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  Image7,
  Image8,
  Image9,
  Image10,
];

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCoins = useCallback(async () => {
    try {
      setLoading(true);
      setCoins(await getCoinList());
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  });

  const addCoin = async (data) => {
    try {
      setLoading(true);
      createListing(data).then((resp) => {
        getCoins();
      });
      toast(<NotificationSuccess text="Coin added successfully." />);
    } catch (error) {
      console.log({ error });
      toast(<NotificationError text="Failed to create a coin." />);
    } finally {
      setLoading(false);
    }
  };

  const buy = async (id, amount, price) => {
    try {
      await buyCoin({
        id,
        amount,
        price,
      }).then((resp) => getCoins());
      toast(<NotificationSuccess text="coin bought successfully" />);
    } catch (error) {
      toast(<NotificationError text="Failed to purchase coin." />);
    } finally {
      setLoading(false);
    }
  };

  const deleteEntry = async (id) => {
    try {
      await deleteCoin({
        id,
      }).then((resp) => getCoins());
      toast(<NotificationSuccess text="entry deleted successfully" />);
    } catch (error) {
      toast(<NotificationError text="Failed to delete the coin!!!" />);
    } finally {
      setLoading(false);
    }
  };

  const deleteLedger = async (id) => {
    try {
      await clearListing().then((resp) => getCoins());
      toast(<NotificationSuccess text="Ledger cleared successfully" />);
    } catch (error) {
      toast(<NotificationError text="Failed to delete the database!!!" />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoins();
  }, []);

  return (
    <>
      {!loading ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="fs-4 fw-bold mb-0">COLLECTABLES LISTING</h1>
            <Button
              variant="outline-blue"
              onClick={deleteLedger}
              className="w-100 py-3 btn-danger"
            >
              delete all entries
            </Button>
            <AddListing save={addCoin} />
          </div>
          <Row xs={1} sm={2} lg={3} className="g-3  mb-5 g-xl-4 g-xxl-5">
            {coins.map((_coin, index) => (
              <Coin
                coin={{
                  ..._coin,
                }}
                buy={buy}
                expunge={deleteEntry}
                altImage={images[index]}
              />
            ))}
          </Row>
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Coins;
