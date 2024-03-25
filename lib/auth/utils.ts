import { cookies } from 'next/headers';

import { createClient } from '@/utils/supabase/server';

const getSupabaseUser = async () => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {
		data: { user },
	} = await supabase.auth.getUser();

	return user;
};

export { getSupabaseUser };
