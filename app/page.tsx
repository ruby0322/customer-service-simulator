'use client';

import { useState } from 'react';

import Question from '../components/Question';

import { extractQuestions } from '@/actions/chat';
import Input from '@/components/Input';

function Home() {
	const [text, setText] = useState<string>('');
	const [questions, setQuestions] = useState<Question[]>([]);

	const handleExtractQuestions = async () => {
		const questions = await extractQuestions(text);
		setQuestions(questions);
	};

	return (
		<div className="w-full">
			{questions.length === 0 && (
				<div className="flex flex-col items-center justify-center gap-8">
					<h2 className="text-5xl font-bold text-sky-200">Do My F**kin Homework</h2>
					<Input
						text={text}
						setText={setText}
						handleExtractQuestions={handleExtractQuestions}
					/>
				</div>
			)}
			<div>
				{questions.map((question, index) => (
					<Question key={index} question={question} />
				))}
			</div>
		</div>
	);
}

export default Home;
