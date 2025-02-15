import { Router } from "express"
import { registerAuth, loginAuth, familyLogin } from "../utils/auth"

const router = Router()

router.post("/register", registerAuth);

router.post("/login", loginAuth);

router.post("/family-login", familyLogin);

export default router;