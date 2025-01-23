import axios from 'axios';

const fetchStaticData = async () => {
	const response = await axios.get('https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/static');
	const coordinates = response.data.venue_raw.location.coordinates;
	console.log(response.data);
	return coordinates;
}

const fetchDynamicData = async () => {
	const response = await axios.get('https://consumer-api.development.dev.woltapi.com/home-assignment-api/v1/venues/home-assignment-venue-helsinki/dynamic');
	const orderMinimum = response.data.venue_raw.delivery_specs.order_minimum_no_surcharge;
	const basePrice = response.data.venue_raw.delivery_specs.delivery_pricing.base_price;
	const distanceRanges = response.data.venue_raw.delivery_specs.delivery_pricing.distance_ranges;
	console.log({ orderMinimum, basePrice, distanceRanges });
	return { orderMinimum, basePrice, distanceRanges };
  };
  
export { fetchDynamicData };
export { fetchStaticData };