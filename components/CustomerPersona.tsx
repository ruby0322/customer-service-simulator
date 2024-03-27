import { useState } from 'react';

import { PersonIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';

import LoadingButton from './LoadingButton';
import CustomCard from './custom-card';
import { Card } from './ui/card';

function Item({ content }: { content: string }) {
	return (
		<Card className="flex w-40 cursor-pointer flex-col items-center gap-2 p-4 text-center duration-200 ease-in-out hover:scale-[1.05]">
			<div>{content}</div>
		</Card>
	);
}

function ProfileSection({ items }: { items: string[] }) {
	return (
		<div className="flex min-h-32 flex-wrap items-center justify-center gap-4">
			{items &&
				items.map((item, index) => {
					return <Item content={item} key={`product-${index}-${item}`} />;
				})}
		</div>
	);
}

function CustomerPersona({
	fetchCustomerPersona,
	customerPersona,
}: {
	fetchCustomerPersona: () => void;
	customerPersona: CustomerPersona | null;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const onButtonClick = () => {
		setLoading(true);
		fetchCustomerPersona();
	};
	if (customerPersona === null) {
		return (
			<CustomCard>
				<LoadingButton
					loading={loading}
					onClick={onButtonClick}
					text="Generate Customer Persona"
					loadingText="Generating Customer Persona"
				/>
			</CustomCard>
		);
	}
	return (
		<CustomCard icon={<PersonIcon />} title="Customer Persona">
			<div className="w-full text-center text-xl">
				{customerPersona?.name}
				<br />({customerPersona?.gender}, {customerPersona?.occupation},{' '}
				{customerPersona?.age})
			</div>
			<blockquote className="mt-6 border-l-2 pl-6 italic">
				"{customerPersona?.motto}"
			</blockquote>
			<Separator className="border-[1px] bg-white/10" />
			<p className="w-full text-center text-lg"> Interests </p>
			<ProfileSection items={customerPersona?.interests as string[]} />
			<Separator className="border-[1px] bg-white/10" />
			<p className="w-full text-center text-lg"> Purchasing Motives </p>
			<ProfileSection items={customerPersona?.purchasingMotives as string[]} />
		</CustomCard>
	);
}

export default CustomerPersona;
