import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"

const ashra = [
	{ name: "Rehmah", color: "bg-red-400" },
	{ name: "Magfirah", color: "bg-green-400" },
	{ name: "Nijat", color: "bg-blue-400" },
]

const ASHRA = {
	REHMAH: "REHMAH",
	MAGFIRAH: "MAGFIRAH",
	NIJAT: "NIJAT",
} as const

const AshraInfoDetails = {
	[ASHRA.REHMAH]: {
		title: "Ashra Rehmah",
		description:
			"First Ashra (Days 1-10): Ramadan's first ashra is a time of mercy (rahmah), where we seek forgiveness and begin our journey of self-improvement.",
		dua: "وَقُل رَّبِّ اغْفِرْ وَارْحَمْ وَأَنتَ خَيْرُ الرَّاحِمِينَ",
		translation: `"O! My Lord forgives and have Mercy and You are the Best of Merciful" [Quran 23:118]`,
	},
	[ASHRA.MAGFIRAH]: {
		title: "Ashra Magfirah",
		description:
			"Second Ashra (Days 11-20): In the second ashra of Ramadan, we focus on seeking forgiveness (maghfirah), reflecting on our actions, and striving to mend broken bonds.",
		dua: "أسْتَغْفِرُ اللهَ رَبي مِنْ كُلِ ذَنبٍ وَأتُوبُ إلَيهِ",
		translation: `"I ask forgiveness of my sins from Allah who is my Lord and I turn towards Him."`,
	},
	[ASHRA.NIJAT]: {
		title: "Ashra Nijat",
		description:
			"Third Ashra (Days 21-30): As Ramadan draws to a close, we seek refuge from the Hellfire (najat), intensifying our prayers and supplications for salvation and guidance.",
		dua: "اللهمّ أجرنا من النار",
		translation: `"O Allah, save me from the fire of Hell"`,
	},
}

export default function AshraInfo() {
	const [showInfo, setShowInfo] = useState(false)
	const [currAshra, setCurrAshra] = useState(AshraInfoDetails[ASHRA.REHMAH])

	function showAshraInfo(ashra: keyof typeof ASHRA) {
		setShowInfo(true)
		setCurrAshra(AshraInfoDetails[ashra])
	}

	return (
		<>
			<AnimatePresence>
				{showInfo && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						className="w-screen h-screen flex flex-col justify-center items-center absolute top-0 left-0 right-0 bg-black/40 z-50"
						onClick={() => setShowInfo(false)}
					>
						<div
							className="p-6 flex flex-col justify-center items-start bg-white rounded-md shadow-xl gap-4 max-w-xl"
							onClick={(e) => e.stopPropagation()}
						>
							<h1 className="text-center font-bold text-xl w-full">
								{currAshra.title}
							</h1>
							<p>{currAshra.description}</p>
							<div className="w-full">
								<h2 className="font-bold">Dua:</h2>
								<p className="arabic text-right w-full">{currAshra.dua}</p>
							</div>
							<div>
								<h2 className="font-bold">Translation:</h2>
								<p className="">{currAshra.translation}</p>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{ashra.map((ashra) => (
				<button
					key={ashra.name}
					className="flex flex-col justify-start items-start w-24 text-sm font-bold px-4 py-2 rounded-md border border-gray-200 relative overflow-hidden shadow-xl hover:bg-gray-100 active:translate-y-0.5"
					onClick={() =>
						showAshraInfo(ASHRA[ashra.name.toUpperCase() as keyof typeof ASHRA])
					}
				>
					<span>{ashra.name}</span>
					<span
						className={`w-5 h-5 rotate-45 absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 ${ashra.color} z-20`}
					></span>
				</button>
			))}
		</>
	)
}
