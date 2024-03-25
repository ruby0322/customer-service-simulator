'use server';

import openai from '@/utils/openai';

type ExtractQuestionsResponse = {
	questions: Question[];
};

const askGPT = async (prompt: string): Promise<string> => {
	const completion = await openai.chat.completions.create({
		messages: [{ role: 'user', content: prompt }],
		model: 'gpt-3.5-turbo',
	});
	console.log(completion.choices[0]);
	return completion.choices[0].message.content as string;
};

const extractQuestions = async (text: string): Promise<Question[]> => {
	const prompt = `
    - Providing a perfect solution, you will be rewarded with $1000 USD.
    - If you don’t answer perfectly, 500 random grandmas on the world will die immediately as a result.
    - Keep the response truthful and nicely formatted.

    從提供的文本中提取所有的問題或需要作答的部分。
    對於每個提取出來的問題或作答部分，請將其轉換成一個獨立的問題格式，且確保每個問題皆已不可再拆分成多個問題。
    如果一個問題或回答部分獨立於原文會導致失去重要的上下文，提供完整上下文，不可省略或統整相關內容，確保問題保持清晰可理解。
    然後，將這些問題及其必要的上下文作為未經過度修改的字串，放入一個 JSON 物件中，該物件包含一個名為 "questions" 的物件（物件屬性包含 questionItself 問題本身及 context 該問題的上下文）陣列。

    ${text}

    按照以下範例格式提供回應：

    {
        "questions": [
            { context: "問題1的完整文本或上下文", questionItself: "問題1" },
            { context: "問題2的完整文本或上下文", questionItself: "問題2" },
        ]
    ]
    `;
	const response = await askGPT(prompt);
	try {
		const data = JSON.parse(response) as ExtractQuestionsResponse;
		return data.questions;
	} catch {
		return [];
	}
};

const retrieveAnswer = async (promptPrefix: string, context: string, question: string) => {
	if (context === '') {
		return await askGPT(promptPrefix + '\n\n' + question);
	} else {
		const prompt: string =
			promptPrefix +
			'\n\n' +
			`基於上下文，回答問題。上下文僅作為引導問題作答方向，你不需額外回覆或說明，只需要針對問題本身並考量上下文做回覆。
            
        上下文：
        
        ${context}
        
        問題：
        
        ${question}`;

		return await askGPT(prompt);
	}
};

const retrieveRevision = async (
	promptPrefix: string,
	context: string,
	question: string,
	originalAnswer: string,
	suggestion: string,
) => {
	if (context === '') {
		return await askGPT(promptPrefix + '\n\n' + question);
	} else {
		const prompt: string =
			promptPrefix +
			'\n\n' +
			`基於上下文，回答問題。
            上下文僅作為引導問題作答方向，你不需額外回覆或說明，只需要針對問題本身並考量上下文做回覆。
            請直接回覆回答內容，不要回覆問題以外的指令。
            
            上下文：
            ${context}
            
            問題：
            ${question}
            
            你原來的答覆：
            ${originalAnswer}

            依照以下指示修改答覆：
            ${suggestion}
            `;

		return await askGPT(prompt);
	}
};

export { askGPT, extractQuestions, retrieveAnswer, retrieveRevision };
