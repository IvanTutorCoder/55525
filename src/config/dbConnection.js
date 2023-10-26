import mongoose from "mongoose";
import { config } from "./config.js";
import { CustomError } from "../services/error/customError.service.js";
import { EError } from "../enums/EError.js";

export const connectDB = async () => {
	try {
		await mongoose.connect(config.mongo.url);
		console.log("base de datos conectada");
	} catch (error) {
		const errorMessage = `Hubo un error al conectar la base de datos: ${error.message}`;
		CustomError.createError({
			name: "Error en la conxion de la base de datos",
			cause: errorMessage,
			message: "Hubo un error en la conexión",
			errorCode: EError.DATABASE_ERROR,
		});
	}
};
