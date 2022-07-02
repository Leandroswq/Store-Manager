const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const connection = require("../../../models/database/storeManager");
const salesModel = require("../../../models/salesModel");

describe("Testes dos services models", async () => {
  afterEach(sinon.restore);

  describe("Service model createSaleId", async () => {
    it("Adiciona uma venda no banco de dados e retorna o id da venda", async () => {
      sinon.stub(connection, "execute").resolves([{ insertId: 1 }]);

      const id = await salesModel.createSaleId();

      expect(id).to.equal(1);
    });
  });

  describe("Service model createSaleProducts", async () => {
    it("Adiciona os produtos da venda ao banco de dados", async () => {
      sinon.stub(connection, "execute").resolves([{ affectedRows: 2 }]);

      const response = await salesModel.createSaleProducts(
        2,
        mocksDatabase.twoProductsSales
      );

      expect(response).to.equal(2);
    });
  });
});
