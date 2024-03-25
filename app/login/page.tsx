import { headers, cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { createClient } from '@/utils/supabase/server';

export default function Login() {
	const handleSignInWithGoogle = async () => {
		'use server';

		const origin = headers().get('origin');
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { data, error } = await supabase.auth.signInWithOAuth({
			provider: 'google',
			options: {
				redirectTo: `${origin}/auth/callback`,
			},
		});

		if (error) {
			return redirect('/login?message=Could not authenticate user');
		}
		return redirect(data.url);
	};

	return (
		<div className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2 px-8 sm:max-w-md">
			<Link
				href="/"
				className="bg-btn-background hover:bg-btn-background-hover group absolute left-8 top-8 flex items-center rounded-md px-4 py-2 text-sm text-foreground no-underline"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
				>
					<polyline points="15 18 9 12 15 6" />
				</svg>{' '}
				Back
			</Link>

			<form
				action={handleSignInWithGoogle}
				className="flex h-full w-full flex-1 flex-col items-center justify-center gap-2 text-foreground animate-in"
			>
				<p className="text-2xl font-bold">第二十九屆台大藝術季</p>
				<p className="text-5xl font-bold">台大莘活指南</p>
				<p className="text-4xl font-bold">城市尋寶</p>
				<Button
					variant={'outline'}
					className="h-32 w-full gap-3 p-5 text-2xl font-semibold"
				>
					<GoogleIcon />
					使用Google登入
				</Button>
			</form>
		</div>
	);
}

function GoogleIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			x="0px"
			y="0px"
			width="36"
			height="36"
			viewBox="0 0 48 48"
			className="m-0"
		>
			<path
				fill="#FFC107"
				d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
			></path>
			<path
				fill="#FF3D00"
				d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
			></path>
			<path
				fill="#4CAF50"
				d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
			></path>
			<path
				fill="#1976D2"
				d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
			></path>
		</svg>
	);
}
