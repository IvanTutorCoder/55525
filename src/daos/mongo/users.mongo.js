import { UserModel } from "../models/users.model.js";

export class UserMongo {
	constructor() {
		this.model = UserModel;
	}

	async get() {
		try {
			const user = await this.model.find();
			return user;
		} catch (error) {
			throw new Error("No se pudieron obtener los Usuarios");
		}
	}

	async getUserByEmail(emailUser) {
		try {
			const user = await this.model.findOne({ email: emailUser });
			return user;
		} catch (error) {
			throw error;
		}
	}

	async getUserById(userId) {
		try {
			const user = await this.model.findById(userId);
			if (!user) {
				throw new Error("El usuario no existe");
			}
			return JSON.parse(JSON.stringify(user));
		} catch (error) {
			throw error;
		}
	}

	async saveUser(user) {
		try {
			const userCreated = await this.model.create(user);
			return userCreated;
		} catch (error) {
			throw error;
		}
	}
}
