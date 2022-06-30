const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const connection = require("../../../models/database/storeManager");
const productModel = require("../../../models/productsModel");

describe("Testes dos products models", () => {
  after(sinon.restore);

  describe("Product model getAll, retorna todos os produtos do banco de dados", async () => {
    afterEach(() => {
      connection.execute.restore();
    });

    it("Retorna 2 produtos com uma base de dados com 2 produtos", async () => {
      sinon.stub(connection, "execute").resolves(mocksDatabase.twoProducts);
      const products = await productModel.getAll();

      expect(products).to.have.lengthOf(2);
    });

    it("Retorna 1 produto com uma base de dados com 1 produto", async () => {
      sinon.stub(connection, "execute").resolves(mocksDatabase.oneProducts);

      const products = await productModel.getAll();

      expect(products).to.have.lengthOf(1);
    });
  });

  describe("Product model getById, retorna apenas o produto que tenha o id requisitado", async () => {
    afterEach(async () => {
      connection.execute.restore();
    });

    it("Retorna o produto com id 1", async () => {
      sinon.stub(connection, "execute").resolves(mocksDatabase.oneProducts);

      const product = await productModel.getById(1);

      expect(product).to.have.lengthOf(1);
      expect(product[0].id).to.have.equal(1);
    });
  });

  describe("Product model createProduct, adiciona um novo item no banco de dados", async () => {
    afterEach(async () => {
      connection.execute.restore();
    });

    it("retorna o id do produto criado", async () => {
      sinon.stub(connection, "execute").resolves(mocksDatabase.createProduct);
      const response = await productModel.createProduct('bolsa')

      expect(response).to.equal(1)
    })

  });
});
