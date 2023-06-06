import { secp256k1 } from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";

export const deriveAddressFromPrivateKey = (privateKey) =>
  toHex(secp256k1.getPublicKey(privateKey));
