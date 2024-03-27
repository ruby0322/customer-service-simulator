type Question = {
	context: string;
	questionItself: string;
};

type CompanyProfile = {
	name: string;
	foundedYear: number;
	products: string[];
	targetDemographics: string[];
	marketChallenges: string;
};

type CustomerPersona = {
	name: string;
	age: number;
	gender: string;
	motto: string;
	occupation: string;
	interests: string[];
	purchasingMotives: string[];
};

type ProductInformation = {
	name: string;
	features: string[];
	knownIssues: string[];
};

type Evaluation = {
	score: number;
	explanation: string;
};
