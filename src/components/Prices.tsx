
const Pricebreakdown = (
	{ name, value, unit } : 
	{ name: string, value: number, unit: string }
	)  => {

	return (
		<div className="price-breakdown">
            <label className="header">{name}</label>
            <span className="header">{value} {unit}</span>
        </div>
	);
}

export default Pricebreakdown;