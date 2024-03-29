const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const connection = require("../../../models/database/storeManager");
const productModel = require("../../../models/productsModel");

describe("Testes dos products models", () => {
  afterEach(sinon.restore);

  describe("Product model getAll, retorna todos os produtos do banco de dados", async () => {
    it("Retorna 2 produtos com uma base de dados com 2 produtos", async () => {
      const stub = sinon
        .stub(connection, "execute")
        .resolves(mocksDatabase.twoProducts);
      const products = await productModel.getAll();
      expect(stub.args[0][0]).to.be.a("string");
      expect(stub.args[0][1]).to.be.a("undefined");
      expect(products).to.have.lengthOf(2);
    });

    it("Retorna 1 produto com uma base de dados com 1 produto", async () => {
      const stub = sinon
        .stub(connection, "execute")
        .resolves(mocksDatabase.oneProducts);

      const products = await productModel.getAll();
      expect(stub.args[0][0]).to.be.a("string");
      expect(stub.args[0][1]).to.be.a("undefined");
      expect(products).to.have.lengthOf(1);
    });
  });

  describe("Product model getAllById retorna todos os produtos com os ids especificados", async () => {
    it("Retorna todos os produtos com os ids iguais aos dos produtos passados", async () => {
      const stub = sinon
        .stub(connection, "query")
        .resolves(mocksDatabase.twoProducts);

      const products = await productModel.getAllById(mocksDatabase.twoProducts);

      expect(stub.args[0][0]).to.be.a("string");
      expect(stub.args[0][1]).to.deep.a("array");
      expect(products).to.have.lengthOf(2);
    });
  });

  describe("Product model getById, retorna apenas o produto que tenha o id requisitado", async () => {
    afterEach(async () => {
      connection.execute.restore();
    });

    it("Retorna o produto com id 1", async () => {
      const stub = sinon
        .stub(connection, "execute")
        .resolves(mocksDatabase.oneProducts);

      const product = await productModel.getById(1);

      expect(stub.args[0][0]).to.be.a("string");
      expect(stub.args[0][1]).to.be.a("array");
      expect(product).to.have.lengthOf(1);
      expect(product[0].id).to.have.equal(1);
    });
  });

  describe("Product model createProduct, adiciona um novo item no banco de dados", async () => {
    afterEach(async () => {
      connection.execute.restore();
    });

    it("retorna o id do produto criado", async () => {
      const stub = sinon
        .stub(connection, "execute")
        .resolves(mocksDatabase.createProduct);
      const response = await productModel.createProduct("bolsa");

      expect(stub.args[0][0]).to.be.a("string");
      expect(stub.args[0][1]).to.be.a("array");
      expect(response).to.equal(1);
    });
  });

  describe("Product model updateProduct", async () => {
    it("Atualiza um produto pelo id", async () => {
      const stub = sinon
        .stub(connection, "execute")
        .resolves([{ changedRows: 1 }]);
      const id = 2;
      const name = "bola";
      const response = await productModel.updateProduct(id, name);

      expect(response).to.equal(1);
      expect(stub.args[0][0]).to.a("string");
      expect(stub.args[0][1]).to.a("array");
    });
  });

  describe("Product model deleteProduct", async () => {
    it("Deleta um produto pelo id", async () => {
      const stub = sinon
        .stub(connection, "execute")
        .resolves([{ affectedRows: 1 }]);
      const id = 2;
      const response = await productModel.deleteProduct(id);

      expect(response).to.equal(1);
      expect(stub.args[0][0]).to.a("string");
      expect(stub.args[0][1]).to.a("array");
    });

    describe("Product model searchProductsByName", async () => {
      it("Retorna os produtos que tenha no name a string passada como parametro", async () => {
        const stub = sinon.stub(connection, "execute").resolves([1]);
        const name = "bolsa";
        const response = await productModel.searchProductsByName(name);

        expect(response).to.equal(1);
        expect(stub.args[0][0]).to.a("string");
        expect(stub.args[0][1]).to.a("array");
      })
    });
  });
});
