import { useEffect, useState } from "react"

export default function DateTime() {
	const [currentTime, setCurrentTime] = useState(new Date())

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(intervalId) // Cleanup function
	}, [])

	const formattedDate = currentTime.toLocaleDateString("en-US", {
		day: "2-digit",
		month: "short",
		year: "numeric",
	})

	const formattedTime = currentTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	})

	return (
		<>
			<div className="w-full h-16 flex justify-center items-center bg-gray-100 rounded-md">
				<span className="text-xl font-bold">{formattedDate}</span>
			</div>
			<div className="w-full h-16 flex justify-center items-center bg-gray-100 rounded-md">
				<span className="text-xl font-bold">{formattedTime}</span>
			</div>
		</>
	)
}
