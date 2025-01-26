import axios from 'axios';
import { calculateDistance, calculateFees, calculateSmallOrderSurcharge, calculateTotalPrice } from '../utils/Calculations.tsx';

const getData = async ({
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
	if (venue === 'home-assignment-venue-helsinki' && cartValue && latitude && longitude) {
		try {
			const staticData = await fetchStaticData();
			const dynamicData = await fetchDynamicData();
			const distance = calculateDistance(staticData[1], staticData[0], latitude, longitude);
			const fee = calculateFees(distance, dynamicData.distanceRanges, dynamicData.basePrice);
			const surcharge = calculateSmallOrderSurcharge(cartValue, dynamicData.orderMinimum);
			const totalPrice = calculateTotalPrice(cartValue * 100, fee, surcharge);
			return { fee, surcharge, totalPrice, distance };
		} catch (error) {
			console.error('Error fetching data:', error);
			alert('Error fetching data');
		}
	} else {
		alert('Error fetching data');
	}
}

const fetchStaticData = async () => {
	const response = await axios.get('https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/static');
	const coordinates = response.data.venue_raw.location.coordinates;
	return coordinates;
}

const fetchDynamicData = async () => {
	const response = await axios.get('https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/dynamic');
	const orderMinimum = response.data.venue_raw.delivery_specs.order_minimum_no_surcharge;
	const basePrice = response.data.venue_raw.delivery_specs.delivery_pricing.base_price;
	const distanceRanges = response.data.venue_raw.delivery_specs.delivery_pricing.distance_ranges;
	return { orderMinimum, basePrice, distanceRanges };
}




export { getData };
export { fetchDynamicData };
export { fetchStaticData };