/* import { testFunction } from '../../services/testingService';
import React, { useState } from 'react';
export const Home = () => {
	const handleButtonClick = () => {
		//testFunction().then(res => {
		//	setTestingData(res.data);
		//});
	};
	const [testingData, setTestingData] = useState([]);
	return (
		<div>
			<h1> Home </h1>
			<div>
				<button onClick={handleButtonClick}>Click Me</button>
			</div>
			<div>
				{testingData.length > 0
					? testingData.map((x, index) => (
							<div key={index}>
								<p>Date: {x.date}</p>
								<p>Temperature: {x.temperatureC}C</p>
								<p>Summary: {x.summary}</p>
								<p>--------------------</p>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
};
*/
