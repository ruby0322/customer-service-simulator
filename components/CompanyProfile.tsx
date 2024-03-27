import { useState } from 'react';

import { BackpackIcon } from '@radix-ui/react-icons';
import { Separator } from '@radix-ui/react-separator';

import { Input } from '@/components/ui/input';

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
		<div className="flex min-h-32 items-center justify-center gap-4">
			{items &&
				items.map((item, index) => {
					return <Item content={item} key={`product-${index}-${item}`} />;
				})}
		</div>
	);
}

function CompanyProfile({
	fetchCompanyProfile,
	companyProfile,
}: {
	fetchCompanyProfile: (spice: string) => void;
	companyProfile: CompanyProfile | null;
}) {
	const [spice, setSpice] = useState<string>();
	const [loading, setLoading] = useState<boolean>(false);
	const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		setSpice(event.currentTarget.value);
	};
	const onButtonClick = () => {
		setLoading(true);
		fetchCompanyProfile(spice as string);
	};
	if (companyProfile === null) {
		return (
			<CustomCard>
				<Input
					placeholder="Enter a word to inspire the generation"
					value={spice}
					onChange={onInputChange}
				/>
				<LoadingButton
					onClick={onButtonClick}
					loading={loading}
					text="Generate Company Profile"
					loadingText="Generating Company Profile"
				/>
			</CustomCard>
		);
	}
	return (
		<CustomCard icon={<BackpackIcon />} title="Company Profile">
			<div className="w-full text-center text-xl">
				{companyProfile?.name} (Since {companyProfile?.foundedYear})
			</div>
			<Separator className="border-[1px] bg-white/10" />
			<p className="w-full text-center text-lg"> Products </p>
			<ProfileSection items={companyProfile?.products as string[]} />
			<Separator className="border-[1px] bg-white/10" />
			<p className="w-full text-center text-lg"> Target Demographics </p>
			<ProfileSection items={companyProfile?.targetDemographics as string[]} />
			<Separator className="border-[1px] bg-white/10" />
			<p className="w-full text-center text-lg"> Market Challenges </p>
			<p>{companyProfile?.marketChallenges}</p>
		</CustomCard>
	);
}

export default CompanyProfile;
