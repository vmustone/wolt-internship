import { useState } from 'react';
import "./styles.css"

function App() {
  return (
    <div className="background">
      <OrderForm />
    </div>
  )
}

const getLocation = (callback: (latitude: number, longitude: number) => void) => {
  // Tarkistetaan, onko selain tukenut sijainnin hakemista
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        (position) => {

          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;
          console.log("Latitude: " + userLatitude + ", Longitude: " + userLongitude);
          callback(userLatitude, userLongitude);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser!");
  }
}
 
function OrderForm() {
  const [cartValue, setCartValue] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [smallOrderSurcharge, setSmallOrderSurcharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);


  const calculateTotalPrice = () => {
    const total = cartValue + deliveryFee + smallOrderSurcharge;
    setTotalPrice(total);
  };

  const handleGetLocation = () => {
    getLocation((latitude, longitude) => {
      setUserLatitude(latitude);
      setUserLongitude(longitude);
    });
  };

  return (
    <div className="form-container">
      <h3 className="header">Deliver order price calculator</h3>
      <form className="order-form">
        <h4 className="header">Details</h4>
        <div className="form-group">
          <label className="header">Venue slug</label>
          <input type="text" placeholder="enter" data-test-id="venueSlug"/>
        </div>
        <div className="form-group">
          <label className="header">Cart value €</label>
          <input type="number" placeholder="enter" data-test-id="cartValue" onChange={(e) => setCartValue(parseFloat(e.target.value))}/>
        </div>
        <div className="form-group">
          <label className="header">User latitude</label>
          <input type="number" placeholder="enter" data-test-id="userLatitude" value={userLatitude} readOnly/>
        </div>
        <div className="form-group">
          <label className="header">User longitude</label>
          <input type="number" placeholder="enter" data-test-id="userLongitude" value={userLongitude} readOnly/>
        </div>
        <div className="form-group">
          <div className="buttons">
            <button type="button" data-test-id="getLocation" onClick={handleGetLocation}>Get location</button>
          </div>
          <div className="buttons">
          <button type="button" onClick={calculateTotalPrice}>Calculate delivery price</button>
          </div>
        </div>
        <div className="form-group">
          <h4 className="header">Price breakdown</h4>
          <div className="test">
            <label className="header">Cart value</label>
            <span className="header">{cartValue} €</span>
          </div>
          <label className="header">Delivery fee {deliveryFee} €</label>
          <label className="header">Delivery distance {deliveryDistance} km</label>
          <label className="header">Small order surcharge {smallOrderSurcharge} €</label>
          <label className="header">Total price {totalPrice} €</label>
        </div>
      </form>
    </div>
  )
}



export default App
