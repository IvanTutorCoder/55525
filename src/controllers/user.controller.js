import { UserGetDto } from "../daos/dto/user.dto.js";
import { UsersService } from "../services/users.service.js";

export class UserController {
	static get = async (req, res) => {
		try {
			const users = await UsersService.get();
			const newUsers = users.map((user) => new UserGetDto(user));
			res.json({ status: "success", data: newUsers });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	};
}
