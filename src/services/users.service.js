import { usersDao } from "../daos/factory.js";

export class UsersService {
	static async get() {
		return usersDao.get();
	}

	static async getUserByEmail(email) {
		return usersDao.getUserByEmail(email);
	}

	static async getUserById(userId) {
		return usersDao.getUserById(userId);
	}

	static async saveUser(userInfo) {
		return usersDao.saveUser(userInfo);
	}

	static async updateUser(userId, newInfo) {
		return usersDao.updateUser(userId, newInfo);
	}

	static async delete() {
		return usersDao.delete();
	}

	static async deleteUser(userId) {
		return usersDao.deleteUser(userId);
	}
}
