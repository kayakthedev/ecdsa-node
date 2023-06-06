import server from "./server";
import { deriveAddressFromPrivateKey} from "./utils"

function Wallet({ balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;

    setPrivateKey(privateKey);
  
    const {
      data: { balance },
    } = await server.get(`balance/${deriveAddressFromPrivateKey(privateKey)}`);
    setBalance(balance);
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>


      <label>
        Private Key
        <input placeholder="Type an address, for example: 0x1" value={privateKey} onChange={onChange}></input>
      </label>

      <b>Address: {privateKey && deriveAddressFromPrivateKey(privateKey)}</b>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
