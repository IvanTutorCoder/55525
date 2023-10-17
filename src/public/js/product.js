let cartDiv = document.getElementById("cartDiv");
let productsDiv = document.getElementById("productsDiv");

const addToCart = async (productId) => {
	try {
		if (productId) {
			const userFetch = await fetch(`http://localhost:8080/api/active`, {
				method: "GET",
			});
			const userCart = await userFetch.json();

			const cartId = userCart.data.user.cart;

			const resp = await fetch(
				`http://localhost:8080/api/carts/${cartId}/product/${productId}`,
				{
					method: "POST",
				}
			);
			const result = await resp.json();

			if (result.status == "success") {
				const payload = await fetch(
					`http://localhost:8080/api/carts/${cartId}`,
					{
						method: "GET",
					}
				);
			}
		}
	} catch (error) {
		console.log("Error: Al contabilizar el carrito", error.message);
	}
};
