const connection = require('./database/storeManager');

module.exports = {
  async getAll() {
    const query = 'SELECT * FROM products;';

    const [rows] = await connection.execute(query);

    return rows;
  },

  async getById(id) {
    const query = `SELECT * FROM products
    WHERE id = ?;`;

    const [rows] = await connection.execute(query, [id]);

    return rows;
  },

  async createProduct(name) {
    const query = `INSERT INTO products (name)
    VALUE (?);`;

    const [rows] = await connection.execute(query, [name]);

    return rows.insertId;
  },
};