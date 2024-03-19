import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function RamadanDay() {
	const [note, setNote] = useState("")
	const [selectedDay] = useState({
		title: "Ramadan 01st, 2024",
		date: new Date(),
		verse:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto unde quam nam sequi minima ea deserunt reiciendis necessitatibus facilis. Id ad nesciunt, non quaerat veritatis odio sapiente possimus saepe ex.",
		hadith: "",
		note: "",
	})
	const { date } = useParams()

	useEffect(() => {
		if (typeof window !== "undefined") {
			if (typeof date !== "undefined") {
				const todayNote = localStorage.getItem(date)

				if (todayNote !== "" && todayNote !== null) setNote(todayNote)
			}
		}
	})

	function handleNoteChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
		const { value } = e.target
		setNote(value)
		if (typeof window !== "undefined") {
			if (typeof date !== "undefined") {
				localStorage.setItem(date, value)
			}
		}
	}

	function getRamadanDay() {
		const thisDay = new Date(`${date}-2024`)
		const startDay = new Date("2024-03-10")
		const diffTime = Math.abs(startDay.valueOf() - thisDay.valueOf())
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

		return ordinalSuffixOf(diffDays)
	}

	function ordinalSuffixOf(i: number) {
		let j = i % 10,
			k = i % 100
		if (j === 1 && k !== 11) {
			return i + "st"
		}
		if (j === 2 && k !== 12) {
			return i + "nd"
		}
		if (j === 3 && k !== 13) {
			return i + "rd"
		}
		return i + "th"
	}

	return (
		<main className="w-screen h-full flex flex-col overflow-y-scroll">
			<div
				className="max-w-3xl p-10 mx-auto flex-1 flex flex-col gap-4 font-normal"
				onClick={(e) => {
					e.stopPropagation()
				}}
			>
				<div className="flex gap-4 mb-4">
					<Link
						to={"/"}
						className="flex gap-2 rounded-full hover:bg-gray-200 px-3 py-2"
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
							className="feather feather-arrow-left"
						>
							<line x1="19" y1="12" x2="5" y2="12"></line>
							<polyline points="12 19 5 12 12 5"></polyline>
						</svg>
						Calendar
					</Link>
				</div>
				<h1 className="text-4xl font-bold">
					Ramadan {getRamadanDay()}, 1445 / 2024
				</h1>
				<div className="text-sm text-gray-600 -mt-2">
					{new Date(`${date}-2024`).toLocaleDateString("en-GB", {
						dateStyle: "full",
					})}
				</div>

				<p className="">{selectedDay.verse}</p>
				<p className="">{selectedDay.hadith}</p>

				<div className="">
					<h3 className="text-xl font-bold">Recipe</h3>
					<a
						href="https://www.bbcgoodfood.com/recipes/vegetable-samosas"
						target="_blank"
						rel="noopener noreferer"
					>
						Vegetable Samosa
					</a>
				</div>
				<textarea
					className="w-full rounded-md bg-gray-200 px-3 py-2 focus:outline-none mt-6 min-h-24"
					value={note}
					onChange={handleNoteChange}
					placeholder="Note"
					rows={15}
				>
					{selectedDay.note}
				</textarea>
			</div>
		</main>
	)
}
