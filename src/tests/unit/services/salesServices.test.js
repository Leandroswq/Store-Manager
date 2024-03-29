const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");

describe("Testes do sales services", async () => {
  afterEach(sinon.restore);

  describe("Sales service getAll", async () => {
    it("Retorna todos as vendas", async () => {
      sinon.stub(salesModel, "getAll").resolves(1);

      const response = await salesService.getAll();

      expect(response).to.equal(1);
    });
  });

  describe("Sales service getById", async () => {
    it("Retorna uma venda pelo id", async () => {
      const id = 1;
      const stub = sinon.stub(salesModel, "getById").resolves([[]]);

      const response = await salesService.getById(id);

      expect(response).to.have.lengthOf(1);
      expect(stub.calledWith(id)).to.be.true;
    });

    it("Retorna um NotFoundError quando a venda não existir", async () => {
      sinon.stub(salesModel, "getById").resolves([]);

      try {
        await salesService.getById(1);
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("NotFound");
        expect(message).to.equal("Sale not found");
      }
    });
  });

  describe("Sales service createSale", async () => {
    it("Cria uma venda e retorna um objeto com o id e os produtos da venda", async () => {
      sinon.stub(salesModel, "createSaleId").resolves(1);
      sinon.stub(salesModel, "createSaleProducts").resolves(2);
      const sale = {
        id: 1,
        itemsSold: mocksDatabase.twoProductsSales,
      };

      const response = await salesService.createSale(
        mocksDatabase.twoProductsSales
      );

      expect(response).to.deep.equal(sale);
    });
  });

  describe("Sales service deleteSale", async () => {
    it("Deleta uma venda com sucesso", async () => {
      sinon.stub(salesModel, "deleteSale").resolves(1);
      const id = 5;
      const response = await salesService.deleteSale(id);

      expect(response).to.equal(1);
    });

    it("Se o produto não existir retorna um NotFoundError", async () => {
      sinon.stub(salesModel, "deleteSale").resolves(0);
      try {
        await salesService.deleteSale(5);
        expect.fail();
      } catch (err) {
        const { name, message } = err;

        expect(name).to.equal("NotFound");
        expect(message).to.equal("Sale not found");
      }
    });
  });

  describe("Sales service updateSaleProducts", async () => {
    it("Atualiza os produtos de uma venda", async () => {
      const stubDelet = sinon.stub(salesModel, "deleteSaleProducts").resolves();
      const stubCreate = sinon
        .stub(salesModel, "createSaleProducts")
        .resolves();
      
      const id = 5
      const products = mocksDatabase.twoProductsSales
      const response = await salesService.updateSaleProducts(id, products)
      
      expect(stubDelet.calledWith(id)).to.be.true
      expect(stubCreate.calledWith(id, products)).to.be.true
      expect(response).to.have.property("saleId", id);
      expect(response).to.have.property("itemsUpdated", products);

    });
  });
});
