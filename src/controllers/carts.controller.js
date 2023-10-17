import { CartsService } from "../services/carts.service.js";
import mongoose from "mongoose";
import nodemailer from "nodemailer";
import { config } from "../config/config.js";

export class CartsController {
	static createCart = async (req, res) => {
		try {
			const cartCreated = await CartsService.createCart();
			res.json({ status: "success", data: cartCreated });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	};

	static get = async (req, res) => {
		try {
			const cartId = req.params.cid;
			const getCart = await CartsService.get(cartId);
			res.json({ status: "success", data: getCart });
		} catch (error) {
			throw new Error(`Error al visualizar el carrito ${error.message}`);
		}
	};

	static getCartById = async (req, res) => {
		try {
			const { id } = req.params;
			const cartById = await CartsService.getCartById(id);
			res.json({ status: "success", data: cartById });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	};

	static async renderCart(req, res) {
		try {
			const { id } = req.params;

			var cid = mongoose.Types.ObjectId.isValid(id);

			const cartById = await CartsService.getCartById(id);

			res.render("carts", { cart: cartById });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	}

	static addProduct = async (req, res) => {
		try {
			const { cid, pid } = req.params;
			const addProductCart = await CartsService.addProduct(cid, pid);
			res.json({ status: "success", data: addProductCart });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	};

	static purchase = async (req, res) => {
		try {
			const { cid } = req.params;
			const cartPurchase = await CartsService.purchase(cid);

			const usuario = req.user;
			if (!usuario) {
				throw new Error("Usuario no definido");
			}

			// Envío del correo electrónico con el ticket (texto)
			const transporter = nodemailer.createTransport({
				service: "Gmail",
				auth: {
					user: config.gmail.marketingEmail,
					pass: config.gmail.password,
				},
				tls: {
					rejectUnauthorized: false,
				},
			});

			const mailOptions = {
				from: config.gmail.marketingEmail,
				to: usuario.email,
				subject: "Ticket de compra",
				text: `Detalles del ticket de compra:\n\nCodigo de tu compra: ${cartPurchase.ticket.code}\nFecha de compra: ${cartPurchase.ticket.purchase_datetime}\nTotal: $ ${cartPurchase.ticket.amount}`,
			};

			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					console.error(
						"Error al enviar el correo electrónico: ",
						error.message
					);
				} else {
					console.log("Correo electrónico enviado con éxito: ", info.response);
				}
			});

			res.json({ status: "success", data: cartPurchase });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	};

	static deleteCart = async (req, res) => {
		try {
			const { cid } = req.params;
			const cartDelete = await CartsService.deleteCart(cid);
			res.json({ status: "success", data: cartDelete });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	};

	static deleteProduct = async (req, res) => {
		try {
			const { cid, pid } = req.params;
			const productDelete = await CartsService.deleteProduct(cid, pid);
			res.json({ status: "success", data: productDelete });
		} catch (error) {
			res.json({ status: "error", message: error.message });
		}
	};
}
