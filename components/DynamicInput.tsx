'use client';

import type { ChangeEvent } from 'react';
import { useEffect, useRef } from 'react';

import { Textarea } from './ui/textarea';

function DynamicInput({
	value,
	setValue,
	placeholder,
	className,
}: {
	value: string;
	setValue: (arg: string) => void;
	placeholder: string;
	className: string;
}) {
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	const autoResize = () => {
		if (textAreaRef) {
			if (textAreaRef.current?.style.height) {
				textAreaRef.current.style.height = '0px';
				textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
			}
		}
	};

	useEffect(() => {
		autoResize();
	});

	const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		autoResize();
		setValue(e.currentTarget.value);
	};

	return (
		<Textarea
			ref={textAreaRef}
			style={{ whiteSpace: 'pre-wrap', height: 'auto' }}
			placeholder={placeholder}
			value={value}
			onChange={handleTextAreaChange}
			rows={1}
			className={
				'border-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-transparent' +
				className
			}
		/>
	);
}

export default DynamicInput;
