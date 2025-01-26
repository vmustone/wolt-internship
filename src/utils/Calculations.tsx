const calculateTotalPrice = (cartValue: number, fee: number, surcharge: number) => {
	return cartValue + fee + surcharge;
};

const calculateSmallOrderSurcharge = (cartValue: number, orderMinimumNoSurcharge: number): number => {
	const convertedCartValue = cartValue * 100;
    const surcharge = orderMinimumNoSurcharge - convertedCartValue;
    return surcharge > 0 ? surcharge : 0;
};


const calculateFees = (distance: any, distanceRanges: any, basePrice: number) => {
	let deliveryFee = basePrice;
	for (const range of distanceRanges) {
		if (distance >= range.min && (distance < range.max || range.max === 0)) {
		  deliveryFee += range.a + (range.b * distance / 10);
		  break;
		}
	}

	return deliveryFee;
}

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRadians = (degree: number) => degree * (Math.PI / 180);
    const R = 6371 * 1000; // Maapallon säde metreinä

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = Math.sin(dLat / 2) ** 2 +
              Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
              Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return Math.round(R * c); // Etäisyys metreinä
};

export { calculateTotalPrice, calculateSmallOrderSurcharge, calculateFees, calculateDistance };