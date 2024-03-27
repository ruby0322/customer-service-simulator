import { cn } from '@/lib/utils';

import { Card } from './ui/card';

function CustomCard({
	icon,
	title,
	children,
}: {
	icon?: React.ReactNode;
	title?: string;
	children?: React.ReactNode;
}) {
	return (
		<Card className={cn('w-[85vw] max-w-[40rem]', 'rounded-sm', 'p-4', 'flex flex-col gap-4')}>
			{(icon || title) && (
				<div className="mb-4 flex items-center gap-2">
					{icon} <p className="text-bold text-2xl">{title}</p>
				</div>
			)}
			{children}
		</Card>
	);
}

export default CustomCard;
