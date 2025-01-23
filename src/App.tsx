import { useState } from 'react';
import Buttons from './components/Buttons.tsx'
import Pricebreakdown from './components/Prices.tsx';
import Form from './components/Form.tsx'
import { fetchStaticData } from './Api.tsx';
import { fetchDynamicData } from './Api.tsx';
import "./styles.css"

function App() {
  return (
    <div className="background">
      <OrderForm />
    </div>
  )
}

const getLocation = (callback: (latitude: number, longitude: number) => void) => {
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

  //fetchDynamicData();
  //fetchStaticData();

  const handleGetLocation = () => {
    getLocation((latitude, longitude) => {
      setUserLatitude(latitude);
      setUserLongitude(longitude);
    });
  };

  return (
    <div className="form-container">
      <h3 className="header">Deliver order price calculator</h3>
      <h4 className="header">Details</h4>
      <div className="form-group">
        <Form cartValue={cartValue} setCartValue={setCartValue} userLatitude={userLatitude} userLongitude={userLongitude} />
        <Buttons name="Get location" onClick={handleGetLocation}/>
        <Buttons name="Calculate total price" onClick={calculateTotalPrice}/>
      </div>

      <h4 className="header">Price breakdown</h4>
          <Pricebreakdown name="Cart value" value={cartValue} unit='€'/>
          <Pricebreakdown name="Delivery fee" value={deliveryFee} unit='€'/>
          <Pricebreakdown name="Delivery distance" value={deliveryDistance} unit="km"/>
          <Pricebreakdown name="Small order surcharge" value={smallOrderSurcharge} unit='€'/>
          <Pricebreakdown name="Total price" value={totalPrice} unit='€'/>
    </div>
  )
}

export default App
