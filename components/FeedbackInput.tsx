'use client';

import DynamicInput from './DynamicInput';

function FeedbackInput({
	suggestion,
	setSuggestion,
	answerQuestion,
	reviseAnswer,
}: {
	suggestion: string;
	setSuggestion: (arg: string) => void;
	answerQuestion: () => void;
	reviseAnswer: () => void;
}) {
	const handleRevise = () => {
		if (suggestion !== '') {
			reviseAnswer();
		}
	};

	return (
		<div className="flex items-center rounded-lg">
			<button
				type="submit"
				className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 dark:text-sky-200"
				onClick={answerQuestion}
			>
				<svg
					className="h-5 w-5"
					viewBox="0 0 15 15"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z"
						fill="currentColor"
						fillRule="evenodd"
						clipRule="evenodd"
					></path>
				</svg>
			</button>
			<DynamicInput
				placeholder="我希望怎麼修改作答內容..."
				className="block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
				value={suggestion}
				setValue={setSuggestion}
			/>
			<button
				type="submit"
				className="inline-flex cursor-pointer justify-center p-2 text-blue-600 dark:text-sky-200"
				onClick={handleRevise}
			>
				<svg
					className="h-5 w-5 rotate-90 rtl:-rotate-90"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 18 20"
				>
					<path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
				</svg>
				<span className="sr-only">Send message</span>
			</button>
		</div>
	);
}

export default FeedbackInput;
