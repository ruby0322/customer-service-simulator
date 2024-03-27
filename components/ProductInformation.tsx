import { useState } from 'react';

import { CubeIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';

import LoadingButton from './LoadingButton';
import CustomCard from './custom-card';

function ProductInformation({
	fetchProductInformation,
	productInformation,
}: {
	fetchProductInformation: () => void;
	productInformation: ProductInformation | null;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const onButtonClick = () => {
		setLoading(true);
		fetchProductInformation();
	};
	if (productInformation === null) {
		return (
			<CustomCard>
				<LoadingButton
					loading={loading}
					onClick={onButtonClick}
					text="Generate Product Information"
					loadingText="Generating Product Information"
				/>
			</CustomCard>
		);
	}
	return (
		<CustomCard icon={<CubeIcon />} title="Product Information">
			<div className="w-full text-center text-xl">{productInformation?.name}</div>
			<Separator className="border-[1px] bg-white/10" />
			<p className="w-full text-center text-lg"> Features </p>
			<ul className="list-disc pl-4">
				{productInformation?.features.map((feature) => <li key={feature}>{feature}</li>)}
			</ul>
			<Separator className="border-[1px] bg-white/10" />
			<p className="w-full text-center text-lg"> Known Issues </p>
			<ul className="list-disc pl-4">
				{productInformation?.knownIssues.map((knownIssue) => (
					<li key={knownIssue}>{knownIssue}</li>
				))}
			</ul>
		</CustomCard>
	);
}

export default ProductInformation;
