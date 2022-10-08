import React from 'react';
import { createRoot } from 'react-dom/client';
export default function Carousel(mount) {
	const root = createRoot(mount);
	root.render(<Counter />);
}

function Counter() {
	const [count, setCount] = React.useState(0);
	return (
		<div>
			<p>Count has value: {count}</p>
			<button onClick={() => setCount(count + 1)}>Increment</button>
		</div>
	);
}
