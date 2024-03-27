import { useState } from 'react';

import { ChatBubbleIcon } from '@radix-ui/react-icons';

import { formulateResponse } from '@/actions/chat';

import LoadingButton from './LoadingButton';
import CustomCard from './custom-card';
import { Card } from './ui/card';
import { Input } from './ui/input';

function ComplaintTrainer({
	customerName,
	fetchComplaint,
	complaint,
	setFinalGuidelines,
	finalResponse,
	setFinalResponse,
}: {
	customerName: string;
	fetchComplaint: () => void;
	complaint: string | null;
	setFinalGuidelines: (str: string) => void;
	finalResponse: string | null;
	setFinalResponse: (str: string) => void;
}) {
	const [localFinalGuideLines, setLocalFinalGuidelines] = useState<string | null>(null);
	const [guidelines, setGuidelines] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(false);

	const onFetchButtonClick = () => {
		setLoading(true);
		fetchComplaint();
	};
	const onSendButtonClick = async () => {
		if (guidelines.length > 0) {
			setFinalGuidelines(guidelines);
			setLocalFinalGuidelines(guidelines);
			const resp = await formulateResponse(complaint as string, guidelines as string);
			setFinalResponse(resp);
			setGuidelines('');
		}
	};
	const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		setGuidelines(event.currentTarget.value);
	};
	if (complaint === null) {
		return (
			<CustomCard>
				<LoadingButton
					loading={loading}
					onClick={onFetchButtonClick}
					text={`You've got a complaint from ${customerName}`}
					loadingText="Receiving Complaint"
				/>
			</CustomCard>
		);
	}
	return (
		<CustomCard icon={<ChatBubbleIcon />} title="Complaint">
			<div className="flex flex-col gap-2">
				<p className="pl-2">{customerName}</p>
				<Card className="w-5/6 px-4 py-2">{complaint}</Card>
			</div>
			{finalResponse !== null && (
				<div className="flex flex-col items-end justify-end gap-2">
					<p className="pr-2">You</p>
					<Card className="max-w-5/6 px-4 py-2">
						Guidelines:
						<br />
						{localFinalGuideLines}
						<br />
						<br />
						Generated Response:
						<br />
						{finalResponse}
					</Card>
				</div>
			)}
			{localFinalGuideLines === null && (
				<div className="flex items-center justify-center gap-2">
					<Input
						placeholder={'Formulate guidlines for generating respond'}
						value={guidelines}
						onChange={onInputChange}
					/>
					<LoadingButton
						onClick={onSendButtonClick}
						loading={false}
						text="Send"
						loadingText="Sending"
					/>
				</div>
			)}
		</CustomCard>
	);
}

export default ComplaintTrainer;
