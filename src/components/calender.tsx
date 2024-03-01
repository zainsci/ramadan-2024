import { useState } from "react"
import DateTime from "./datetime"
import { Transition } from "@headlessui/react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const ashra = [
	{ name: "Rehmah", color: "bg-red-400" },
	{ name: "Magfirah", color: "bg-green-400" },
	{ name: "Nijat", color: "bg-blue-400" },
]

export default function Calender() {
	const [page, setPage] = useState(-1)
	const [showPage, setShowPage] = useState(false)

	function getDay(week: number, weekDay: number) {
		return week * 7 + weekDay <= 30 ? week * 7 + weekDay : null
	}

	function getGregorianDay(week: number, weekDay: number) {
		const thiDay = getDay(week, weekDay)
		if (typeof thiDay === "number") {
			const thisDate = new Date("2024-03-10")
			const newDate = new Date(thisDate.setDate(thisDate.getDate() + thiDay))
			return newDate.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "short",
			})
		}
	}

	function showDay(day: number | null) {
		if (!day) return

		setPage(day)
		setShowPage(true)
	}

	return (
		<>
			<div className="w-screen h-screen flex flex-col py-8">
				<div className="max-w-5xl mx-auto w-full flex flex-col justify-center items-center space-y-4">
					<h1 className="text-5xl text-center">Ramadan 2024</h1>
					<div className="flex flex-1 gap-4 w-full select-none">
						<div className="w-full bg-gray-200 rounded-xl p-4 space-y-2">
							<ul className="flex gap-2">
								{days.map((day) => (
									<li
										key={day}
										className="px-4 py-2 flex-1 rounded-md bg-gray-300 text-lg font-bold"
									>
										{day}
									</li>
								))}
							</ul>
							{[0, 1, 2, 3, 4].map((week) => (
								<ul key={week} className="flex gap-2">
									{[1, 2, 3, 4, 5, 6, 7].map((weekDay) => (
										<li
											key={getDay(week, weekDay)}
											className="flex-1 flex flex-col overflow-hidden relative"
										>
											<button
												className={`flex flex-col justify-start items-start w-full h-full px-4 py-2 rounded-md bg-gray-300 text-lg ${
													getDay(week, weekDay) && "hover:opacity-80"
												} ${
													!getDay(week, weekDay) && "cursor-default"
												} relative overflow-hidden`}
												onClick={() => showDay(getDay(week, weekDay))}
												disabled={!getDay(week, weekDay)}
											>
												<div>{getDay(week, weekDay)}</div>
												<div className="text-xs text-gray-600">
													{getGregorianDay(week, weekDay)}
												</div>

												{getDay(week, weekDay) !== null ? (
													<div
														className={`w-6 h-6 rotate-45 absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 ${
															getDay(week, weekDay) > 20
																? "bg-blue-500"
																: getDay(week, weekDay) > 10
																? "bg-green-500"
																: "bg-red-500"
														}`}
													></div>
												) : null}
											</button>
										</li>
									))}
								</ul>
							))}
						</div>
						<div className="w-80 flex flex-col bg-gray-200 rounded-xl p-4 space-y-2">
							<DateTime />
							<div className="bg-gray-100 flex-1"></div>
						</div>
					</div>
					<div className="flex justify-center items-center select-none">
						<div className="w-full flex justify-center items-center gap-4">
							{ashra.map((ashra) => (
								<div className="flex flex-col justify-start items-start w-24 text-sm font-bold px-4 py-2 rounded-md bg-gray-300 relative overflow-hidden">
									<span>{ashra.name}</span>
									<span
										className={`w-6 h-6 rotate-45 absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 ${ashra.color} z-20`}
									></span>
								</div>
							))}
						</div>
						<div className="w-80 flex flex-col"></div>
					</div>
				</div>
			</div>
		</>
	)
}
