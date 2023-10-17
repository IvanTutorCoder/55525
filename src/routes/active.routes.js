import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	try {
		// console.log(req.user);
		const user = { user: req.user };
		res.json({ status: "success", data: user });
	} catch (error) {
		console.log(error);
	}
});

export { router as activeRouter };
