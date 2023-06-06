const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

const privateKeyBytes = secp.secp256k1.utils.randomPrivateKey();
const privateKey = toHex(privateKeyBytes);
const publicKey = toHex(secp.secp256k1.getPublicKey(privateKeyBytes));

console.log("Private key:", "0x" + privateKey);
console.log("Public key:", "0x" + publicKey);

// Private key: 0xf1335382cd5e7e4797eaff39361ba5561dc84ebdf58440db41b8d2844cbb6fc5
// Public key: 0x029f3bb456ae35831c61a22f4472fd34d1ea99df7e4acb25748107a84b39ca4752

// Private key: 0x4c01ded8b4f26ac2acaa333a0906a38b90371cab904f040bec0ce3a85d708d89
// Public key: 0x029149df9a116adb84bbdb812397eebad66aaaa7d1b36c932d588f789578163008

// Private key: 0x6c639dccd84c3da77e95e8e1edebbdd18f091fdc149b8c001eed946707f84bcc
// Public key: 0x03157c6858f39ccb0fda9ee4f16e7edfb152541770a6f3b2eab00acb3fa75a2a37
