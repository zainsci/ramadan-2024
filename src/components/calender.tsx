import { useState } from "react"
import { Transition } from "@headlessui/react"

import DateTime from "./datetime"
import { Link } from "react-router-dom"

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const ashra = [
	{ name: "Rehmah", color: "bg-red-400" },
	{ name: "Magfirah", color: "bg-green-400" },
	{ name: "Nijat", color: "bg-blue-400" },
]

function guidGenerator() {
	var S4 = function () {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
	}
	return S4() + S4() + S4()
}

export default function Calender() {
	const [page, setPage] = useState(-1)
	const [showPage, setShowPage] = useState(false)

	function getDay(week: number, weekDay: number) {
		return week * 7 + weekDay <= 30 ? week * 7 + weekDay : 0
	}

	function getGregorianDay(week: number, weekDay: number) {
		const thiDay = getDay(week, weekDay)
		if (typeof thiDay === "number") {
			if (thiDay === 0) return ""
			const thisDate = new Date("2024-03-10")
			const newDate = new Date(thisDate.setDate(thisDate.getDate() + thiDay))
			return newDate.toLocaleDateString("en-GB", {
				day: "2-digit",
				month: "short",
			})
		} else return ""
	}

	function showDay(day: number) {
		if (!day) return

		// TODO: if the day > today: return
		const today = new Date(new Date().toLocaleDateString("en-GB")).valueOf()
		const startDay = new Date("2024-03-10")
		console.log(startDay.valueOf(), startDay.setDate(startDay.getDate() + day))
		const thisDay = new Date(
			startDay.setDate(startDay.getDate() + day)
		).valueOf()

		console.log(
			new Date(thisDay).toLocaleString("en-GB"),
			new Date(today).toLocaleString("en-GB")
		)
		if (thisDay > today) return

		setPage(day)
		setShowPage(true)
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
			return "bg-sky-300"

		if (new Date(`${day} 2024`).valueOf() < today.valueOf())
			return "bg-gray-300"

		return "bg-white"
	}

	return (
		<>
			<Transition
				show={showPage}
				enter="transition-opacity duration-200"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				onClick={() => setShowPage(false)}
			></Transition>

			<div className="w-screen h-screen flex flex-col py-8">
				<div className="max-w-5xl mx-auto w-full flex flex-col justify-center items-center space-y-4">
					<h1 className="text-5xl text-center font-bold">Ramadan 1445/2024</h1>
					<div className="flex flex-1 gap-4 w-full select-none">
						<div className="w-full bg-gray-200 rounded-xl p-4 space-y-2">
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
											<Link
												to={
													getGregorianDay(week, weekDay) === ""
														? ""
														: `/day/${getGregorianDay(week, weekDay)
																?.toString()
																.replace(" ", "-")}`
												}
												className={`flex flex-col justify-start items-start w-full h-full px-4 py-2 rounded-md text-lg ${
													!!getDay(week, weekDay) && "hover:bg-gray-100"
												} ${
													!!!getDay(week, weekDay) && "cursor-default"
												} relative overflow-hidden ${dayStatus(
													getGregorianDay(week, weekDay)
												)}`}
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
											</Link>
										</li>
									))}
								</ul>
							))}
						</div>
						<div className="w-80 flex flex-col bg-gray-200 rounded-xl p-4 space-y-2">
							<DateTime />
							<div className="bg-gray-100 flex-1 rounded-md"></div>
						</div>
					</div>
					<div className="flex justify-center items-center select-none">
						<div className="w-full flex justify-center items-center gap-4">
							{ashra.map((ashra) => (
								<div
									key={ashra.name}
									className="flex flex-col justify-start items-start w-24 text-sm font-bold px-4 py-2 rounded-md bg-gray-200 relative overflow-hidden"
								>
									<span>{ashra.name}</span>
									<span
										className={`w-5 h-5 rotate-45 absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 ${ashra.color} z-20`}
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
