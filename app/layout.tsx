import type { Metadata } from 'next';

import { Toaster } from '@/components/ui/toaster';

import './globals.css';

export const metadata: Metadata = {
	title: 'Customer Service Simulation',
	description: 'Beebee poopoo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className="dark flex min-h-screen w-screen items-center justify-center overflow-y-scroll bg-background text-foreground">
				<main className="flex w-[88vw] flex-col items-center justify-center py-16 md:w-[55vw]">
					{children}
					<Toaster />
				</main>
			</body>
		</html>
	);
}
