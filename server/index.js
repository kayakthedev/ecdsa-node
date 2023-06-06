const express = require("express");
const { secp256k1 } = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { utf8ToBytes, toHex } = require("ethereum-cryptography/utils");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "03157c6858f39ccb0fda9ee4f16e7edfb152541770a6f3b2eab00acb3fa75a2a37": 100,
  "029149df9a116adb84bbdb812397eebad66aaaa7d1b36c932d588f789578163008": 50,
  "029f3bb456ae35831c61a22f4472fd34d1ea99df7e4acb25748107a84b39ca4752": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { recipient, amount, signature } = req.body;

  const sig = new secp256k1.Signature(BigInt(signature.r), BigInt(signature.s));
  sig.recovery = signature.v;

  const messageHash = toHex(keccak256(utf8ToBytes(amount + "" + recipient)));

  const sender = sig.recoverPublicKey(messageHash).toHex();

  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
