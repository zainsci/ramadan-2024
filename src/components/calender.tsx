import { useState } from "react"

import DateTime from "./datetime"
import AshraInfo from "./ashra"

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

function guidGenerator() {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	return S4() + S4() + S4()
}

const KSA = {
	withKSA: "2024-03-10",
	notWithKSA: "2024-03-11",
} as const

export default function Calender() {
	const [withKSA, setWithKSA] = useState<string>(KSA.withKSA)

	function getDay(week: number, weekDay: number) {
		return week * 7 + weekDay <= 30 ? week * 7 + weekDay : 0
	}

	function getGregorianDay(week: number, weekDay: number) {
		const thiDay = getDay(week, weekDay)
		if (typeof thiDay === "number") {
			if (thiDay === 0) return ""
			const thisDate = new Date(withKSA)
			const newDate = new Date(thisDate.setDate(thisDate.getDate() + thiDay))
			return newDate.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "short",
			})
		} else return ""
	}

	function dayStatus(day: string | undefined) {
		if (day === undefined) return ""
		const today = new Date()

		if (
			today.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "short",
			}) === day
		)
			return "bg-sky-300 border-sky-300"

		if (new Date(`${day} 2024`).valueOf() < today.valueOf())
			return "bg-gray-300"

		return "bg-white border-gray-300"
	}

	return (
		<>
			<div className="w-screen h-screen flex flex-col py-8">
				<div className="max-w-5xl mx-auto w-full flex flex-col justify-center items-center space-y-4">
					<h1 className="text-5xl text-center font-bold">Ramadan 1445/2024</h1>
					<div className="flex flex-1 gap-4 w-full select-none">
						<div className="w-full bg-white border border-gray-200 rounded-xl p-4 space-y-2 shadow-xl">
							<ul className="flex gap-2">
								{days.map((day) => (
									<li
										key={day + guidGenerator()}
										className="px-4 py-2 flex-1 rounded-md bg-gray-600 text-gray-200 text-lg font-bold"
									>
										{day}
									</li>
								))}
							</ul>
							{[0, 1, 2, 3, 4].map((week) => (
								<ul key={week + guidGenerator()} className="flex gap-2">
									{[0, 1, 2, 3, 4, 5, 6].map((weekDay) => (
										<li
											key={getDay(week, weekDay) + guidGenerator()}
											className="flex-1 flex flex-col overflow-hidden relative"
										>
											<button
												className={`flex flex-col justify-start items-start w-full h-full px-4 py-2 rounded-md text-lg ${
													!!getDay(week, weekDay) && "hover:bg-gray-100"
												} ${
													!!!getDay(week, weekDay) && "cursor-default"
												} relative overflow-hidden ${dayStatus(
													getGregorianDay(week, weekDay)
												)} border`}
											>
												<div className="font-bold">
													{!!getDay(week, weekDay) && getDay(week, weekDay)}
												</div>
												<div className="text-xs text-gray-600">
													{!!getDay(week, weekDay) &&
														getGregorianDay(week, weekDay)}
												</div>

												{getDay(week, weekDay) !== 0 ? (
													<div
														className={`w-5 h-5 rotate-45 absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 ${
															getDay(week, weekDay) > 20
																? "bg-blue-400"
																: getDay(week, weekDay) > 10
																? "bg-green-400"
																: "bg-red-400"
														}`}
													></div>
												) : null}
											</button>
										</li>
									))}
								</ul>
							))}
						</div>
						<div className="w-80 flex flex-col border border-gray-200 rounded-xl p-4 space-y-2 shadow-xl">
							<DateTime />
							<div className="bg-gray-100 border border-gray-200 flex-1 rounded-md space-y-2 p-2">
								<button
									className="w-full h-8 bg-white border border-gray-200 text-xs font-bold hover:bg-gray-100"
									onClick={() => setWithKSA(KSA.withKSA)}
								>
									With KSA
								</button>
								<button
									className="w-full h-8 bg-white border border-gray-200 text-xs font-bold hover:bg-gray-100"
									onClick={() => setWithKSA(KSA.notWithKSA)}
								>
									Not With KSA
								</button>
							</div>
						</div>
					</div>
					<div className="flex justify-center items-center select-none">
						<div className="w-full flex justify-center items-center gap-4">
							<AshraInfo />
						</div>
						<div className="w-80 flex flex-col"></div>
					</div>
				</div>
			</div>
		</>
	)
}
