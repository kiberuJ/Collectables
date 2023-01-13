import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000;

export function createListing(listing) {
  listing.id = uuid4();
  listing.price = parseNearAmount(listing.price + "");
  return window.contract.setCoin({ listing });
}

export function getCoins() {
  return window.contract.getCoins();
}

export async function buyCoin({ id, price }) {
  await window.contract.buyCoin({ coinId: id }, GAS, price);
}

export async function deleteCoin(id) {
  await window.contract.deleteCoin({ coinId: id }, GAS);
}

export async function clearListing() {
  await window.contract.clearListing(GAS);
}

export async function entriesLength() {
  await window.contract.entriesLength();
}
