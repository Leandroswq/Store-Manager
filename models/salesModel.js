/* eslint-disable max-lines-per-function */
const connection = require('./database/storeManager');

module.exports = {
  async getAll() {
    const query = `SELECT sa.id AS saleId, sa.${'`date`'},
    sa_pro.product_id AS productId, sa_pro.quantity
    FROM StoreManager.sales AS sa
    INNER JOIN StoreManager.sales_products AS sa_pro
    ON sa.id = sa_pro.sale_id
    ORDER BY saleId ASC;`;

    const [rows] = await connection.execute(query);

    return rows;
  },

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
