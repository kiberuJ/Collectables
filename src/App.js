import React, { useEffect, useCallback, useState } from "react";
import { Container, Nav } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { login, logout as destroy, accountBalance } from "./utils/near";
import Wallet from "./components/Wallet";
import { Notification } from "./components/utils/Notifications";
import Coins from "./components/marketplace/Coins";
import "./App.css";

const App = function AppWrapper() {
  const account = window.walletConnection.account();
  const [balance, setBalance] = useState("0");
  const getBalance = useCallback(async () => {
    if (account.accountId) {
      setBalance(await accountBalance());
    }
  }, [account.accountId]);

  useEffect(() => {
    getBalance();
  }, [getBalance]);
  return (
    <>
      {<Notification />}
      <Container fluid="md">
        <Nav className="justify-content-end pt-3 pb-5">
          {account.accountId ? (
            <Nav.Item>
              <Wallet
                address={account.accountId}
                amount={balance}
                symbol="NEAR"
                destroy={destroy}
              />
            </Nav.Item>
          ) : (
            <Nav.Item>
              <Button
                onClick={login}
                variant="outline-dark"
                className="rounded-pill px-3 mt-3"
              >
                Connect Wallet
              </Button>
            </Nav.Item>
          )}
        </Nav>
        <main>{<Coins />}</main>
      </Container>
    </>
  );
};

export default App;
