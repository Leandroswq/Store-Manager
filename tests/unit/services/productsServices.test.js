const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");

describe("Testes dos products services", async () => {
  after(sinon.restore);

  describe("Product service getAll", async () => {
    afterEach(() => productsModel.getAll.restore());
    it("Retorna todos os produtos do banco de dados", async () => {
      sinon
        .stub(productsModel, "getAll")
        .resolves(mocksDatabase.twoProducts[0]);
      const products = await productsService.getAll();

      expect(products).to.be.lengthOf(2);
    });

    it("Caso o banco de dados esteja vazio, retorna o erro 'NotFound' com a mensagem 'Product not found'", async () => {
      sinon.stub(productsModel, "getAll").resolves([]);
      try {
        await productsService.getAll();
        expect.fail()
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("NotFound");
        expect(message).to.equal("Product not found");
      }
    });
  });
});
