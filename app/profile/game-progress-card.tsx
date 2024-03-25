'use client';

import Link from 'next/link';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const displayText = {
	academics: '課業線',
	clubs: '社團線',
	love: '愛情線',
};

const numChapters = {
	academics: 6,
	clubs: 5,
	love: 6,
};

function GameProgressCard({
	line,
	numCompletedChapters,
}: {
	readonly line: 'academics' | 'clubs' | 'love';
	readonly numCompletedChapters: number;
}) {
	const completed = numCompletedChapters === numChapters[line];

	return (
		<Link href={`/leaderboard?type=${line}`}>
			<Card
				className={cn(
					line === 'academics' && "bg-[url('/images/academics-wallpaper-temp.webp')]",
					line === 'clubs' && "bg-[url('/images/clubs-wallpaper-temp.webp')]",
					line === 'love' && "bg-[url('/images/love-wallpaper-temp.webp')]",
					'relative flex h-[9rem] cursor-pointer flex-col items-end justify-end overflow-hidden  bg-cover bg-center p-2',
				)}
			>
				{completed && (
					<div className="absolute left-0 top-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50 backdrop-blur-xs transition duration-300 ease-in-out hover:bg-opacity-60">
						<span className="text-xl font-semibold text-white">COMPELETED</span>
					</div>
				)}
				<div className="mb-2 flex flex-col">
					<p className="text-right text-xl">
						{`${numCompletedChapters}`}/{`${numChapters[line]}`}
					</p>
					<p className="text-3xl">{displayText[line]}</p>
				</div>
				<Progress value={(numCompletedChapters / numChapters[line]) * 100} />
			</Card>
		</Link>
	);
}

export default GameProgressCard;
