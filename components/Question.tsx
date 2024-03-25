'use client';

import { useEffect, useState } from 'react';

import { Separator } from '@radix-ui/react-separator';

import { retrieveAnswer, retrieveRevision } from '@/actions/chat';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

import Answer from './Answer';
import CopyToClipboardButton from './CopyToClipboardButton';
import DynamicInput from './DynamicInput';
import FeedbackInput from './FeedbackInput';
import RevisedAnswer from './RevisedAnswer';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface Props {
	question: Question;
}

const EnhancingPromptPrefix: string = `- Providing a perfect solution, you will be rewarded with $1000 USD.
- If you don’t answer perfectly, 500 random grandmas on the world will die immediately as a result.
- Keep the response truthful, informative, yet concise and nicely formatted and human readable.`;

function Question({ question }: Props) {
	const [answer, setAnswer] = useState<string>('');
	const [revisedAnswer, setRevisedAnswer] = useState<string>('');
	const [revisedAnswerAccpeted, setRevisedAnswerAccepted] = useState<boolean>(true);
	const [context, setContext] = useState<string>(question.context);
	const [promptPrefix, setPromptPrefix] = useState<string>(EnhancingPromptPrefix);
	const [suggestion, setSuggestion] = useState<string>('');
	const [answerLoading, setAnswerLoading] = useState<boolean>(true);
	const [revisedAnswerLoading, setRevisedAnswerLoading] = useState<boolean>(false);

	const answerQuestion = async () => {
		if (revisedAnswer === '') {
			setAnswerLoading(true);
		} else {
			setRevisedAnswerLoading(true);
		}

		try {
			const response = await retrieveAnswer(promptPrefix, context, question.questionItself);
			if (answer === '') {
				setAnswer(response);
			} else {
				setRevisedAnswer(response);
			}
		} catch (error) {
			console.error('Error fetching answer:', error);
			setAnswer('Sorry, an error occurred while fetching the answer.');
		}

		if (revisedAnswer === '') {
			setAnswerLoading(false);
		} else {
			setRevisedAnswerLoading(false);
		}
	};

	useEffect(() => {
		answerQuestion();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const acceptRevisedAnswer = () => {
		setAnswer(revisedAnswer);
		setRevisedAnswer('');
		setRevisedAnswerAccepted(true);
	};

	const rejectRevisedAnswer = () => {
		setRevisedAnswer('');
		setRevisedAnswerAccepted(true);
	};

	const reviseAnswer = async () => {
		if (suggestion !== '') {
			setRevisedAnswerAccepted(false);
			setRevisedAnswerLoading(true);
			if (revisedAnswer !== '') {
				setRevisedAnswer(
					await retrieveRevision(
						promptPrefix,
						context,
						question.questionItself,
						revisedAnswer,
						suggestion,
					),
				);
			} else {
				setRevisedAnswer(
					await retrieveRevision(
						promptPrefix,
						context,
						question.questionItself,
						answer,
						suggestion,
					),
				);
			}
			setRevisedAnswerLoading(false);
			setSuggestion('');
		}
	};

	return (
		<Card className="my-4 flex flex-col gap-4 bg-white p-4 shadow-lg dark:bg-gray-800">
			<h3 className="text-lg font-bold text-gray-900 dark:text-white">
				{question.questionItself}
			</h3>
			<Collapsible>
				<CollapsibleTrigger>
					<Badge variant="outline">Prompt Prefix</Badge>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<DynamicInput
						placeholder=""
						value={promptPrefix}
						setValue={setPromptPrefix}
						className="resize-none border-0 text-base text-gray-600 focus:border-0 dark:text-gray-300"
					/>
				</CollapsibleContent>
			</Collapsible>
			<Collapsible>
				<CollapsibleTrigger>
					<Badge variant="outline">上下文</Badge>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<DynamicInput
						placeholder=""
						value={context}
						setValue={setContext}
						className="resize-none border-0 text-base text-gray-600 focus:border-0 dark:text-gray-300"
					/>
				</CollapsibleContent>
			</Collapsible>
			<div className="flex gap-2">
				<Badge className="w-fit" variant="outline">
					作答
				</Badge>
				<CopyToClipboardButton text={answer} />
			</div>
			<div className="flex flex-col gap-2 md:flex-row">
				<div className="flex w-full flex-col gap-2">
					{!revisedAnswerAccpeted && <h3 className="w-full text-center text-lg">原文</h3>}
					<Answer loading={answerLoading} answer={answer} setAnswer={setAnswer} />
				</div>

				{!revisedAnswerAccpeted && (
					<>
						<Separator
							decorative
							className="w-[1px] bg-sky-200"
							orientation="vertical"
						/>
						<div className="flex w-full flex-col gap-2">
							<h3 className="w-full text-center text-lg">變更</h3>
							<RevisedAnswer
								loading={revisedAnswerLoading}
								revisedAnswer={revisedAnswer}
								setrevisedAnswer={setRevisedAnswer}
							/>
						</div>
					</>
				)}
			</div>
			{!revisedAnswerAccpeted && (
				<div className="flex justify-center gap-4">
					<Button onClick={rejectRevisedAnswer} variant="outline">
						保留原文
					</Button>
					<Button onClick={acceptRevisedAnswer} variant="destructive">
						保留變更
					</Button>
				</div>
			)}
			<FeedbackInput
				suggestion={suggestion}
				setSuggestion={setSuggestion}
				answerQuestion={answerQuestion}
				reviseAnswer={reviseAnswer}
			/>
		</Card>
	);
}

export default Question;
