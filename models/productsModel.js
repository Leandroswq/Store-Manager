const connection = require('./database/storeManager');

module.exports = {
  async  getAll() {
    const query = 'SELECT * FROM StoreManager.products;';

    const [rows] = await connection.execute(query);

    return rows;
  },
};