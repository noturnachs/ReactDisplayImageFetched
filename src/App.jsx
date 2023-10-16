import "./index.css";
import { useState } from "react";

function App() {
  const [error, setError] = useState(false);
  // const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [number, setNumber] = useState(1);

  const getPhotoList = async (number) => {
    setLoading(true);
    try {
      const request = await fetch(
        "https://jsonplaceholder.typicode.com/photos?_limit=" + number
      );
      const response = await request.json();
      setData(response);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="container">
      {loading ? <h3>Please wait...</h3> : null}
      <input
        type="number"
        placeholder="number of images"
        onChange={(e) => {
          e.preventDefault();
          setNumber(e.target.value);
          console.log(number);
        }}
      />
      <button
        type="button"
        onClick={() => {
          getPhotoList(number);
        }}
      >
        CLICK ME
      </button>
      <div className="cuntainer">
        {data.map((data, index) => (
          <div key={index} className="center">
            <span className="titlew">{data.title}</span>
            <img
              src={data.url}
              alt={`Image ${data.title}`}
              width="100"
              height="100"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
