import { productsDao } from "../daos/factory.js";

export class ProductsService {
	static async getProducts() {
		return productsDao.getProducts();
	}

	static async getProductById(id) {
		return productsDao.getProductById(id);
	}

	static async createProduct(productInfo) {
		return productsDao.createProduct(productInfo);
	}

	static async updateProduct(id, product) {
		return productsDao.updateProduct(id, product);
	}

	static async deleteProduct(id) {
		return productsDao.deleteProduct(id);
	}
}
