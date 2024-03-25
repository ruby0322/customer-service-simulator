'use client';

import { useState } from 'react';

import DynamicInput from './DynamicInput';
import { Button } from './ui/button';

function Input({
	handleExtractQuestions,
	setText,
	text,
}: {
	handleExtractQuestions: () => void;
	setText: (arg: string) => void;
	text: string;
}) {
	const [submitted, setSubmitted] = useState<boolean>(false);
	return (
		<div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
			<div className="rounded-t-lg bg-white px-4 py-2 dark:bg-gray-800">
				<DynamicInput
					value={text}
					setValue={setText}
					placeholder={'輸入文本'}
					className="h-[5rem] max-h-[80vh] w-full border-0 bg-white px-0 text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
				/>
			</div>
			<div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
				<Button
					variant="outline"
					onClick={() => {
						setSubmitted(true);
						handleExtractQuestions();
					}}
				>
					{submitted ? (
						<div role="status" className="flex gap-3">
							<svg
								aria-hidden="true"
								className="h-5 w-5 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
							<div>分析並提取問題中...</div>
						</div>
					) : (
						'自動提取問題'
					)}
				</Button>
				<div className="flex space-x-1 ps-0 sm:ps-2 rtl:space-x-reverse">
					<button
						type="button"
						className="inline-flex cursor-pointer items-center justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
					>
						<svg
							className="h-4 w-4"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 12 20"
						>
							<path
								stroke="currentColor"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
							/>
						</svg>
						<span className="sr-only">Attach file</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Input;
