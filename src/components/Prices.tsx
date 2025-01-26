const Prices = (
	{ name, value, unit } : 
	{ name: string, value: string, unit: string }
	)  => {

	return (
		<div className="price-breakdown">
            <label className="header">{name}</label>
            <span className="header" data-raw-value="0">{value} {unit}</span>
        </div>
	);
}

export default Prices;