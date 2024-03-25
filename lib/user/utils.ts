import type { SupabaseClient } from '@supabase/supabase-js';

export async function readUser(supabase: SupabaseClient, user_id: string) {
	const { data, error } = await supabase.from('user').select('*').eq('user_id', user_id);
	if (error) {
		throw new Error('Failed to fetch user data: ' + error.message);
	}
	const user: User = data[0];
	return user;
}

export async function updateUser(supabase: SupabaseClient, user: Partial<User>) {
	const { data, error } = await supabase
		.from('user')
		.update(user)
		.eq('user_id', user.user_id)
		.select();
	if (error) {
		throw new Error('Failed to update user data: ' + error.message);
	}
	const new_user: User = data[0];
	return new_user;
}

export async function createUser(supabase: SupabaseClient, user: User) {
	const { data, error } = await supabase.from('user').upsert(user).select();
	if (error) {
		throw new Error('Failed to create user data: ' + error.message);
	}
	const new_user: User = data[0];
	return new_user;
}
