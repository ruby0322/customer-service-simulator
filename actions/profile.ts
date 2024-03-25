'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { v4 as uuidv4 } from 'uuid';

import { updateUser } from '@/lib/user/utils';
import { createClient } from '@/utils/supabase/server';

const updateProfile = async (userId: string, username: string, pictureBase64?: string) => {
	if (pictureBase64 !== undefined) {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		/* Upload picture to supabase storage */
		const filename = `avatar-${uuidv4()}`;
		await supabase.storage
			.from('avatar')
			.upload(
				filename,
				Buffer.from(pictureBase64.replace(/data:image\/([^;]+);base64,/, ''), 'base64'),
			);

		/* Retrieve avatar URL */
		const {
			data: { publicUrl },
		} = supabase.storage.from('avatar').getPublicUrl(filename);

		/* Update user avatar */
		const user = await updateUser(supabase, {
			user_id: userId,
			username: username,
			avatar_url: publicUrl,
		});

		console.log(user);

		revalidatePath('/profile');
	} else {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		const user = await updateUser(supabase, {
			user_id: userId,
			username: username,
		});

		console.log(user);
		revalidatePath('/profile');
	}
};

const getNumCompletedChapters = async (userId: string): Promise<NumCompletedChapters> => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data } = await supabase.from('user_game_state').select().eq('user_id', userId);

	if (data && data.length > 0) {
		console.log(data);
		const numCompletedChapters: NumCompletedChapters = {
			love: 0,
			academics: 0,
			clubs: 0,
		};
		for (const row of data) {
			if (row.game_id === 0) {
				numCompletedChapters.love = row.current_chapter - 1;
			} else if (row.game_id === 1) {
				numCompletedChapters.clubs = row.current_chapter - 1;
			} else if (row.game_id === 2) {
				numCompletedChapters.academics = row.current_chapter - 1;
			}
		}
		return numCompletedChapters;
	}
	return {
		love: 0,
		academics: 0,
		clubs: 0,
	};
};

export { getNumCompletedChapters, updateProfile };
