import Prices from "./Prices";

const centsToEuros = (cents: number) => (cents / 100).toFixed(2);

const PriceBreakdown = (
    { cartValue,
        deliveryFee,
        deliveryDistance,
        smallOrderSurcharge,
        totalPrice
    }: {
        cartValue: number,
        deliveryFee: number,
        deliveryDistance: any,
        smallOrderSurcharge: number,
        totalPrice: number 
    }
) => {
    return (
        <div className="price">
            <h4 className="header">Price breakdown</h4>
            <Prices name="Cart value" value={cartValue.toFixed(2)} unit='€'/>
            <Prices name="Delivery fee" value={centsToEuros(deliveryFee)} unit='€'/>
            <Prices name="Delivery distance" value={deliveryDistance} unit="m"/>
            <Prices name="Small order surcharge" value={centsToEuros(smallOrderSurcharge)} unit='€'/>
            <Prices name="Total price" value={centsToEuros(totalPrice)} unit='€'/>
        </div>
    );
}

export default PriceBreakdown;