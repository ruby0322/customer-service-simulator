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

const formulateResponse = async (complaint: string, guidelines: string): Promise<string> => {
	const prompt = `
	You are an below average customer service personnel who has absolutely no knwoledge in customer service and is emotionally insensitive.
	Respond to customer's complaint based on guidelines provided by your manager.

	Evaluate how well the guidelines instructs customer service to respond to customer's emotions (be exetremely harsh), and generate response to the complaint exactly according to its level.
	
	Since you are just a below average customer service personnel, you should give response completey based on the guidelines with the same quality of the guidelines.
	That is, if the guidelines are vague and irrelevant, generate vague and irrelevant response;
	if the guidelines are precise and relevant, generate precise and relevant response.


	Respond in palintext without any prefix or wrappings.

	[Guidelines]
	${guidelines}
	[Guidelines Ends]
	
	[Complaint]
	${complaint}
	[Complaint Ends]

	`;
	const res = await askGPT(prompt);
	return res;
};

const evaluateResponse = async (
	companyProfile: CompanyProfile,
	customerPersona: CustomerPersona,
	productInformation: ProductInformation,
	complaint: string,
	response: string,
): Promise<Evaluation> => {
	const prompt = `Imagine you are a customer service representative, and evaluate the player's response to the customer complaint by focusing specifically on emotional intelligence aspects, including empathy, understanding, and emotional support offered in the reply. 
	Present your analysis as a JSON object comprising 'score' and 'explanation'.

	Grading Criteria:

	1. Demonstrates Emotional Intelligence

	2. Addresses the Issue

	3. Encourages Further Communication

	4. Relevance to Customer' Persona

	The 'score' attribute should be a float from 0 to 10, assessing the response's effectiveness in recognizing and addressing the emotional needs and state of the customer based on the persona's expectations.
	The 'explanation' should delve into how well the response demonstrates empathy, acknowledges the customer's feelings, communicates understanding of their frustration, and conveys a genuine intention to resolve the issue while providing emotional comfort.
	Your critique should elucidate the nuances of emotional intelligence displayed in the response, pointing out strengths in emotional connection and areas where a deeper understanding could enhance customer satisfaction.
	Aim for a concise, insightful, and truthful feedback that underscores the importance of emotional intelligence in customer service interactions.
	Be extremely harsh on scoring.
	
	[Company Profile]
	${JSON.stringify(companyProfile)}
	
	[Customer Persona]
	${JSON.stringify(customerPersona)}
	
	[Product Information]
	${JSON.stringify(productInformation)}

	[Customer's Complaint] (Enclosed in double quotes)
	"${complaint}"

	[Player's Response] (Enclosed in double quotes)
	"${response}"

	Make sure the return object fits the below typescript type and respond only the JSON object in plaintext without any wrapping.
	
	type Evaluation = {
		score: number;
		explanation: string;
	};
	`;
	const res = await askGPT(prompt);
	return JSON.parse(res) as Evaluation;
};

const formulateComplaint = async (
	companyProfile: CompanyProfile,
	customerPersona: CustomerPersona,
	productInformation: ProductInformation,
): Promise<string> => {
	const prompt = `
	Write a complaint in casual, spoken English, as if a customer is expressing their frustrations on an online service platform, based on the customer persona and their experience with the company's product.
	Within a 100-word limit, focus on the casual nuances of everyday speech, making the complaint feel authentic and heartfelt.
	Mention specific product features that initially attracted the customer, the anticipation of using it, and the specific problems that led to their dissatisfaction. Highlight the emotional impact and how the product's shortcomings have inconvenienced their daily life, all while maintaining a conversational tone.
	Keep it concise, genuine, and directly reflective of the customer's personal experience.

	[Company Profile]
	${JSON.stringify(companyProfile)}
	
	[Customer Persona]
	${JSON.stringify(customerPersona)}
	
	[Product Information]
	${JSON.stringify(productInformation)}
	`;
	return await askGPT(prompt);
};

const generateProductInformation = async (
	companyProfile: CompanyProfile,
	customerPersona: CustomerPersona,
): Promise<ProductInformation> => {
	const prompt = `
	Given the company profile and the customer persona, create a JSON-formatted product profile.
	This profile should contain 'name' for the item's unique name,
	'features' to describe its key functionalities and selling points, and
	'knownIssues' to list any common problems or defects associated with it.
	This product should align with the interests and needs of the customer persona, with the known issues being directly related to the customer's common complaints.
	The goal is to ensure a realistic and coherent connection between the product's attributes and the target consumer's experiences and feedback
	 
	[Company Profile]
	${JSON.stringify(companyProfile)}
	
	[Customer Persona]
	${JSON.stringify(customerPersona)}

	Make sure the return object fits the below typescript type and respond only the JSON object in plaintext without any wrapping.

	type ProductInformation = {
		name: string;
		features: string[];
		knownIssues: string[];
	};
	`;
	const response = await askGPT(prompt);
	return JSON.parse(response) as ProductInformation;
};

const generateCompanyProfile = async (spice: string): Promise<CompanyProfile> => {
	const prompt = `
	Construct a detailed profile in JSON format for a fictional company (be creative in the choice of industry, and should be inspired by ${spice}).
	This profile should include the following attributes:
	'name' for the company's unique name,
	'foundedYear' for the year it was established,
	'products' to list the types of flagship products it offers,
	'targetDemographics' for the specific audience it aims to serve, and
	'marketChallenges' to detail how it addresses the changing demands and challenges.
	This information should collectively offer a rich, narrative-driven insight into the company’s strategic positioning and operational dynamics.
	Make sure the return object fits the below typescript type and respond only the JSON object in plaintext without any wrapping.


type CompanyProfile = {
	name: string;
	foundedYear: number;
	products: string[];
	targetDemographics: string[];
	marketChallenges: string;
};
`;
	const response = await askGPT(prompt);

	return JSON.parse(response) as CompanyProfile;
};

const generateCustomerPersona = async (
	companyProfile: CompanyProfile,
): Promise<CustomerPersona> => {
	const prompt = `

	Utilizing the company profile provided, craft a consumer persona in a structured JSON format. This persona should encapsulate key demographic and psychographic elements including 'age', 'gender', 'motto',  'occupation', 'interests', and 'purchasingMotives'.
	Ensure the response is truthful, insightful, and succinctly addresses the complete spectrum of the consumer persona relevant to the company’s target market.

	Company Profile:
	${JSON.stringify(companyProfile)}

	Make sure the return object fits the below typescript type and respond only the JSON object in plaintext without any wrapping.

	type CustomerPersona = {
		name: string;
		age: number;
		gender: string;
		motto: string;
		occupation: string;
		interests: string[];
		purchasingMotives: string[];
	  };
	`;
	const response = await askGPT(prompt);
	return JSON.parse(response) as CustomerPersona;
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

export {
	askGPT,
	evaluateResponse,
	extractQuestions,
	formulateComplaint,
	formulateResponse,
	generateCompanyProfile,
	generateCustomerPersona,
	generateProductInformation,
	retrieveAnswer,
	retrieveRevision,
};
