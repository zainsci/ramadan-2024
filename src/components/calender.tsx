import { useState } from "react"
import DateTime from "./datetime"
import { Transition } from "@headlessui/react"

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

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
			<Transition
				show={showPage}
				enter="transition-opacity duration-200"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
				onClick={() => setShowPage(false)}
			>
				<div className="w-screen h-screen bg-gray-200 z-50">
					<div
						className="max-w-3xl p-10 mx-auto h-screen bg-white flex flex-col"
						onClick={(e) => {
							e.stopPropagation()
						}}
					>
						<h1 className="text-4xl">{page}</h1>
						<div className="text-sm text-gray-600">
							{new Date().toLocaleDateString("en-US", {
								day: "2-digit",
								month: "short",
								year: "numeric",
							})}
						</div>
						<p className="mt-4">
							Lorem ipsum dolor, sit amet consectetur adipisicing elit. Libero
							quaerat nobis ab deserunt autem nemo repellat vitae consequuntur
							voluptas molestias architecto quas et iste fugit, esse repellendus
							recusandae, fugiat error.
						</p>

						<div
							className="w-full rounded-md bg-gray-200 p-4 focus:outline-none mt-6"
							contentEditable
						></div>
					</div>
				</div>
			</Transition>
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
											className="flex-1 flex flex-col"
										>
											<button
												className={`flex flex-col justify-start w-full h-full px-4 py-2 rounded-md bg-gray-300 text-lg ${
													getDay(week, weekDay) && "hover:opacity-80"
												} ${!getDay(week, weekDay) && "cursor-default"}`}
												onClick={() => showDay(getDay(week, weekDay))}
												disabled={!getDay(week, weekDay)}
											>
												<div>{getDay(week, weekDay)}</div>
												<div className="text-xs text-gray-600">
													{getGregorianDay(week, weekDay)}
												</div>
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
					<div></div>
				</div>
			</div>
		</>
	)
}
