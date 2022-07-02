/* eslint-disable max-lines-per-function */
const connection = require('./database/storeManager');

module.exports = {
  async createSaleId() {
    const querySale = 'INSERT INTO StoreManager.sales() VALUES();';
    const [{ insertId }] = await connection.execute(querySale);

    return insertId;
  },
  async createSaleProducts(id, products) {
    // query inspirada no video https://youtu.be/LgLxg2WVrTY?t=724
    const productsQuery = `INSERT INTO StoreManager.sales_products 
    (sale_id, product_Id, quantity) VALUES ? ;`;
    const queryValues = products.map((product) => [
      id,
      product.productId,
      product.quantity,
    ]);
    const [rows] = await connection.query(productsQuery, [queryValues]);

    return rows.affectedRows;
  },
};
