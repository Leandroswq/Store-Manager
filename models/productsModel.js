const connection = require('./database/storeManager');

module.exports = {
  async getAll() {
    const query = 'SELECT * FROM StoreManager.products;';

    const [rows] = await connection.execute(query);

    return rows;
  },

  async getById(id) {
    const query = `SELECT * FROM StoreManager.products
    WHERE id = ?;`;

    const [rows] = await connection.execute(query, [id]);

    return rows;
  },
};