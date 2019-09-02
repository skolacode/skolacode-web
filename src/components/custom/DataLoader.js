import React from 'react';

import data_icon from '../../assets/icons/data.png';

const DataLoader = (props) => (
	<div style={{ marginTop: 50, textAlign: 'center', ...(props.style || {}) }}>
		<img src={data_icon} style={{ width: props.width || 100 }} alt=""/>
		<div style={{ marginTop: 20, fontSize: 20, fontWeight: 'bold', color: '#000', ...(props.textStyle || {}) }}>
			Loading content...
		</div>
	</div>
);

export default DataLoader;