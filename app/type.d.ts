type Leaderboard = {
	interval: string;
	penalty: number;
	user_id: string;
	username: string;
	avatar_url: string;
};

type UserGameDetail = {
	user_id: string;
	game_id: number;
	chapter: number;
	finish_time: Date;
};

type UserGameState = {
	user_id: string;
	game_id: number;
	start_time: string;
	current_section: number;
	current_chapter: number;
	finish_time: string | null;
	penalty: number;
};

type GameContent = {
	[key in 'love' | 'clubs' | 'academics']: {
		[key: string]: {
			[key: string]: React.ReactNode;
		};
	};
};

type UserGameVisited = {
	user_id: string;
	game_id: number;
	chapter: number;
	section: number;
};

type Visited = {
	game: string;
	chapter: string;
	section: string;
};

type GameDetails = {
	plot?: {
		title: string;
		content: React.ReactNode;
	};
	image?: {
		src: string;
		alt: string;
	};
	button?: {
		text: string;
		href: string;
	};
	buttonGroup?: {
		buttons: { text: string; href: string }[];
	};
	form?: {
		question: React.ReactNode;
		label: string;
		api: string;
	};
	error?: {
		message: React.ReactNode;
	};
	ending?: {
		result: string;
		content: React.ReactNode;
		redirect: string;
	};
	multiselect?: {
		question: React.ReactNode;
		label: string;
		api: string;
		options: string[];
		max: number;
	};
	multiSelectWithImage?: {
		question: React.ReactNode;
		label: string;
		api: string;
		options: { label: string; image: string }[];
		max: number;
	};
	chat?: {
		messages: { username: string; message: string; isSender: boolean; avatar: string }[];
	};
	skip?: {
		game: string;
		chapter: string;
		section: string;
	};
	back?: {
		game: string;
		chapter: string;
		section: string;
	};
};

type GameDetailsContent = {
	[key in 'love' | 'clubs' | 'academics']: {
		[key: string]: {
			[key: string]: GameDetails;
		};
	};
};

type User = {
	username: string;
	gmail: string;
	user_id: UUID;
	avatar_url: string;
};

type NumCompletedChapters = {
	love: number;
	academics: number;
	clubs: number;
};

type Question = {
	context: string;
	questionItself: string;
};
