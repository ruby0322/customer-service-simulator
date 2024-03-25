import type { SupabaseClient } from '@supabase/supabase-js';

export async function fetchUser(supabaseClient: SupabaseClient) {
	try {
		const {
			data: { user },
		} = await supabaseClient.auth.getUser();
		if (!user || !user.id) {
			throw new Error('User not found. Please log in.');
		}
		return user;
	} catch (error) {
		console.error('Error fetching user:', error);
		throw error;
	}
}
