const connection = require('./database/storeManager');

module.exports = {
  async getAll() {
    const query = 'SELECT * FROM StoreManager.products;';

    const [rows] = await connection.execute(query);

    return rows;
  },

  async getAllById(products) {
    const query = 'SELECT * FROM StoreManager.products WHERE id IN (?);';
    const queryValues = products.map(({ productId }) => productId);

    const [rows] = await connection.query(query, [queryValues]);

    return rows;
  },

  async getById(id) {
    const query = `SELECT * FROM StoreManager.products
    WHERE id = ?;`;

    const [rows] = await connection.execute(query, [id]);

    return rows;
  },

  async createProduct(name) {
    const query = `INSERT INTO StoreManager.products (name)
    VALUE (?);`;

    const [rows] = await connection.execute(query, [name]);

    return rows.insertId;
  },
};
