import { PieChartIcon } from '@radix-ui/react-icons';

import { Button } from './ui/button';

function LoadingButton({
	text,
	loadingText,
	loading,
	onClick,
	className,
}: {
	text: string;
	loadingText: string;
	loading: boolean;
	onClick: () => void;
	className?: string;
}) {
	return (
		<Button className={className} onClick={onClick}>
			{loading ? (
				<>
					<PieChartIcon className="mr-2 h-4 w-4 animate-spin" />
					{loadingText}
				</>
			) : (
				<>{text}</>
			)}
		</Button>
	);
}

export default LoadingButton;
