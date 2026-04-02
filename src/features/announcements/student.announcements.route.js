const express = require("express");
const prisma = require("../../prisma");
const { requireAuth } = require("../../middleware/auth");

const router = express.Router();


// GET /announcements/my-feed
router.get("/my-feed", requireAuth, async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: req.user.id },
			select: {
				id: true,
				year: true,
				role: true,
			},
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		const yearFilter = {};

		if (user.year === "1") yearFilter.firstYear = true;
		if (user.year === "2") yearFilter.secondYear = true;
		if (user.year === "3") yearFilter.thirdYear = true;
		if (user.year === "4") yearFilter.fourthYear = true;

		const announcements = await prisma.announcement.findMany({
			where: {
				OR: [{ everyone: true }, yearFilter],
			},
			orderBy: { createdAt: "desc" },
			include: {
				author: {
					select: {
						id: true,
						firstName: true,
						lastName: true,
						name: true,
						email: true,
						role: true,
					},
				},
			},
		});

		return res.json({ announcements });
	} catch (e) {
		return res.status(500).json({
			message: "Server error",
			error: String(e),
		});
	}
});

module.exports = router;