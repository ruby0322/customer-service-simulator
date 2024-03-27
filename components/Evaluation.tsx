import { useState } from 'react';

import { StarFilledIcon } from '@radix-ui/react-icons';

import { Progress } from '@/components/ui/progress';

import LoadingButton from './LoadingButton';
import CustomCard from './custom-card';

function Evaluation({
	finalResponse,
	evaluating,
	evaluation,
	fetchEvaluation,
}: {
	finalResponse: string;
	evaluating: boolean;
	evaluation: Evaluation | null;
	fetchEvaluation: () => void;
}) {
	const [loading, setLoading] = useState<boolean>(false);
	const onButtonClick = () => {
		setLoading(true);
		fetchEvaluation();
	};
	if (evaluation === null) {
		return (
			<CustomCard>
				<LoadingButton
					loading={loading}
					onClick={onButtonClick}
					text="Evaluate"
					loadingText="Evaluating"
				/>
			</CustomCard>
		);
	}
	return (
		<CustomCard icon={<StarFilledIcon />} title="Evaluation">
			<blockquote className="mt-6 border-l-2 pl-6 italic">"{finalResponse}"</blockquote>
			<div className="flex flex-col gap-6">
				<div className="flex w-full items-center justify-center gap-4">
					{evaluation.score} / 10
					<Progress value={evaluation.score * 10} className="w-2/3" />
				</div>
				<p>{evaluation.explanation}</p>
			</div>
			<LoadingButton
				loading={evaluating}
				onClick={onButtonClick}
				text="Reevaluate"
				loadingText="Reevaluating"
			/>
		</CustomCard>
	);
}

export default Evaluation;
