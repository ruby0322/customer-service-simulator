'use server';

import { cookies } from 'next/headers';

import { getNumCompletedChapters } from '@/actions/profile';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { readUser } from '@/lib/user/utils';
import { createClient } from '@/utils/supabase/server';

import EditProfileButton from './edit-proifle-button';
import GameProgressCard from './game-progress-card';

export interface ProfileFormValues {
	username: string;
	picture: FileList;
}

const ProfilePage = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {
		data: { user: supabaseUser },
	} = await supabase.auth.getUser();

	if (!supabaseUser) {
		throw new Error('User not found');
	}

	const user = await readUser(supabase, supabaseUser?.id as string);

	const numCompletedChapters = await getNumCompletedChapters(user?.user_id);
	console.log(numCompletedChapters);

	return (
		<div className="flex h-screen w-screen flex-col content-start p-6">
			<div className="flex w-full items-center justify-between">
				<div className="flex flex-col">
					<div className="mb-4 text-2xl">個人頁面</div>
					<div className="flex flex-col space-y-2">
						<div className="flex items-center gap-3">
							<Badge variant="outline">遊戲暱稱</Badge>
							<p className="... max-w-[9rem] truncate">{user?.username}</p>
						</div>
						<div className="flex items-center gap-3">
							<Badge className="... text-nowrap" variant="outline">
								電子郵件
							</Badge>
							<p className="... max-w-[9rem] truncate">{user?.gmail}</p>
						</div>
					</div>
				</div>
				<div className="flex flex-col">
					<Avatar className="h-32 w-32">
						<AvatarImage src={user?.avatar_url} />
						<AvatarFallback> Avatar </AvatarFallback>
					</Avatar>
				</div>
			</div>
			<EditProfileButton userId={user?.user_id} />
			<Separator className="my-6" />
			<div className="flex w-full flex-col justify-center gap-4">
				<div className="text-xl">破關進度</div>
				<GameProgressCard
					line="academics"
					numCompletedChapters={numCompletedChapters.academics}
				/>
				<GameProgressCard line="clubs" numCompletedChapters={numCompletedChapters.clubs} />
				<GameProgressCard line="love" numCompletedChapters={numCompletedChapters.love} />
			</div>
		</div>
	);
};

export default ProfilePage;
