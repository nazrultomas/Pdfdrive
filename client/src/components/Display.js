import { useState } from "react";
import "./Display.css";
const Display = ({ contract, account }) => {
  const [data, setData] = useState("");
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    try {
      if (Otheraddress) {
        dataArray = await contract.display(Otheraddress);
        console.log(dataArray);
      } else {
        dataArray = await contract.display(account);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      
      const files = str_array.map((item, i) => {
        return (
          <a href={item}  target="_blank" rel="noreferrer"  >
            <object
  key={i}
  data={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
  type="application/pdf"
  className="file-list"
  width="100%"
  height="500px"
>
  <p>Your browser does not support viewing PDFs. 
     <a href={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`} target="_blank" rel="noreferrer">
       Click here to download.
     </a>
  </p>
</object>
          </a>
        );
      });
      setData(files);
    } else {
      alert("No file to display");
    }
  };  
  return (
    <>
      <div className="file-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;
