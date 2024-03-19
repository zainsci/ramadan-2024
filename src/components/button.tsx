import React from "react"
import { clsx } from "clsx"

interface IButton
	extends React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	> {}

export default function Button({ children, className, ...props }: IButton) {
	return (
		<button
			{...props}
			className={clsx(
				"px-5 h-8 flex justify-center items-center border border-gray-300 rounded-md text-sm bg-white shadow-lg hover:bg-gray-100 active:translate-y-0.5",
				className
			)}
		>
			{children}
		</button>
	)
}
