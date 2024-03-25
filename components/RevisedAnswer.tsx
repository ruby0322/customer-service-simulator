import DynamicInput from './DynamicInput';
import { Skeleton } from './ui/skeleton';

function RevisedAnswer({
	revisedAnswer,
	setrevisedAnswer,
	loading,
}: {
	revisedAnswer: string;
	setrevisedAnswer: (arg: string) => void;
	loading: boolean;
}) {
	return (
		<>
			{loading ? (
				<div className="flex w-full flex-col gap-2">
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-full" />
					<Skeleton className="h-4 w-1/2" />
				</div>
			) : (
				<DynamicInput
					placeholder=""
					value={revisedAnswer}
					setValue={setrevisedAnswer}
					className="w-full resize-none border-0 text-base text-gray-600 focus:border-0 dark:text-gray-300"
				/>
			)}
		</>
	);
}
export default RevisedAnswer;
