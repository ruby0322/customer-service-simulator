import { useState } from 'react';

import { ChatBubbleIcon } from '@radix-ui/react-icons';

import LoadingButton from './LoadingButton';
import CustomCard from './custom-card';
import { Card } from './ui/card';
import { Input } from './ui/input';

function Complaint({
	customerName,
	fetchComplaint,
	complaint,
	finalResponse,
	setFinalResponse,
}: {
	customerName: string;
	fetchComplaint: () => void;
	complaint: string | null;
	finalResponse: string | null;
	setFinalResponse: (str: string) => void;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const [response, setResponse] = useState<string>('');
	const onFetchButtonClick = () => {
		setLoading(true);
		fetchComplaint();
	};
	const onSendButtonClick = () => {
		if (response.length > 0) {
			setFinalResponse(response);
			setResponse('');
		}
	};
	const onInputChange = (event: React.FormEvent<HTMLInputElement>) => {
		setResponse(event.currentTarget.value);
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
					<Card className="max-w-5/6 px-4 py-2">{finalResponse}</Card>
				</div>
			)}
			<div className="flex items-center justify-center gap-2">
				<Input
					placeholder={
						finalResponse === null
							? 'Respond to complaint'
							: 'Send again to replace previous response'
					}
					value={response}
					onChange={onInputChange}
				/>
				<LoadingButton
					onClick={onSendButtonClick}
					loading={false}
					text="Send"
					loadingText="Sending"
				/>
			</div>
		</CustomCard>
	);
}

export default Complaint;
