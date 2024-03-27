'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';

function Home() {
	return (
		<div className="flex gap-4">
			<Link href="/customer-service">
				<Button>Customer Service</Button>
			</Link>
			<Link href="/customer-service-trainer">
				<Button>Customer Service Trainer</Button>
			</Link>
		</div>
	);
}

export default Home;
