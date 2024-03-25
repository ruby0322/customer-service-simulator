import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createUser, readUser } from '@/lib/user/utils';
import { createClient } from '@/utils/supabase/server';

export async function GET(request: Request) {
	// The `/auth/callback` route is required for the server-side auth flow implemented
	// by the Auth Helpers package. It exchanges an auth code for the user's session.
	// https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get('code');

	if (code) {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		await supabase.auth.exchangeCodeForSession(code);
		const {
			data: { user },
		} = await supabase.auth.getUser();

		if (!user) {
			return NextResponse.redirect('/login');
		}

		const existingUser = await readUser(supabase, user.id as string);
		if (!existingUser) {
			const new_user: User = {
				avatar_url: user.user_metadata.avatar_url as string,
				gmail: user.email as string,
				user_id: user.id as string,
				username: user.user_metadata.full_name as string,
			};
			await createUser(supabase, new_user);
		}
	}

	// URL to redirect to after sign in process completes
	const home = new URL('/home', requestUrl.origin);
	return NextResponse.redirect(home);
}
