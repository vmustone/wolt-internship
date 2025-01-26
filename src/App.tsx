import { useState } from 'react';

import Form from './components/Form.tsx';
import Header from './components/Header.tsx';
import PriceBreakdown from './components/Pricebreakdown.tsx';
import { getData } from "./utils/Api.tsx"; // Oletetaan, että tämä on omassa tiedostossaan
import "./css/styles.css"



function App() {
  const [cartValue, setCartValue] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState(0);
  const [smallOrderSurcharge, setSmallOrderSurcharge] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleGetData = async ({ 
    venue, 
    cartValue, 
    latitude, 
    longitude 
  } : {
    venue: string, 
    cartValue: number, 
    latitude: number, 
    longitude: number
  }) => {
    const data = await getData({ venue, cartValue, latitude, longitude });
    if (data) {
      setCartValue(cartValue);
      setDeliveryFee(data.fee);
      setDeliveryDistance(data.distance);
      setSmallOrderSurcharge(data.surcharge);
      setTotalPrice(data.totalPrice);
    }
  };

  return (
    <div className="background">
      <div className='form-container'>
        <Header text="Deliver order price calculator"/>
        <Form handleGetData={handleGetData}/>
        <PriceBreakdown
          cartValue={cartValue}
          deliveryFee={deliveryFee}
          deliveryDistance={deliveryDistance}
          smallOrderSurcharge={smallOrderSurcharge}
          totalPrice={totalPrice}
        />
      </div>
    </div>
  )
}

export default App
