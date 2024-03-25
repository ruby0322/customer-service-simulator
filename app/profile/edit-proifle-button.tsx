'use client';

import type { Resolver } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { updateProfile } from '@/actions/profile';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import type { ProfileFormValues } from './page';

const resolver: Resolver<ProfileFormValues> = async (values) => {
	return {
		values: values.username?.length > 0 ? values : {},
		errors: !values.username
			? {
					username: {
						type: 'required',
						message: 'This is required.',
					},
				}
			: {},
	};
};

function EditProfileButton({ userId }: { userId: string }) {
	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<ProfileFormValues>({
		resolver,
	});

	const onSubmit = async (profileFormValues: ProfileFormValues) => {
		console.log(profileFormValues);
		const reader = new FileReader();
		if (profileFormValues.picture.length === 0) {
			reader.onloadend = () => {
				updateProfile(userId, profileFormValues.username);
			};
			reader.readAsDataURL(new Blob());
			return;
		}
		reader.onloadend = () => {
			const base64 = reader.result;
			updateProfile(userId, profileFormValues.username, base64 as string);
		};
		reader.readAsDataURL(profileFormValues.picture[0]);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="mt-8 w-full">編輯個人資料</Button>
			</DialogTrigger>
			<DialogContent className="w-[20rem]">
				<DialogHeader>
					<DialogTitle>編輯個人資料</DialogTitle>
					<DialogDescription>
						你可以隨時修改遊戲暱稱。但請注意，在活動結算時，你的遊戲暱稱將被作為印製在參賽證明上的名字。
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="grid gap-4 py-4">
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="username">
								暱稱
								<Input
									id="username"
									type="text"
									placeholder="管中閔"
									{...register('username', {
										required: 'This field is required',
									})}
								/>
							</Label>
							{errors.username && (
								<p className="text-red-500">{errors.username.message}</p>
							)}
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="picture">
								頭像
								<Input id="picture" type="file" {...register('picture')} />
							</Label>
						</div>
					</div>
					<DialogFooter>
						<DialogClose asChild disabled={!isValid}>
							<Button className="w-full" type="submit">
								儲存
							</Button>
						</DialogClose>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

export default EditProfileButton;
