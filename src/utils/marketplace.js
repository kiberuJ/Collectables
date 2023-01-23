import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";
import { utils } from "near-api-js";

const GAS = 100000000000000;

export function createListing(coin) {
  console.log("Invoked!!!", coin);
  coin.id = uuid4();
  coin.price = parseNearAmount(coin.price + "");
  coin.quantity = parseInt(coin.quantity);
  return window.contract.setCoin({ coin });
}

export function getCoins() {
  return window.contract.getCoins();
}

export async function buyCoin({ id, amount, price }) {
  const totalPrice = (utils.format.formatNearAmount(price) * amount).toString();
  await window.contract.buyCoin(
    { coinId: id, orderedCoins: parseInt(amount) },
    GAS,
    parseNearAmount(totalPrice)
  );
}

export async function deleteCoin(id) {
  await window.contract.deleteCoin({ coinId: id.id }, GAS);
}

export async function clearListing() {
  await window.contract.clearListing();
}

export async function entriesLength() {
  await window.contract.entriesLength();
}
