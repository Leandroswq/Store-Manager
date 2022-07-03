const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const salesModel = require("../../../models/salesModel");
const salesService = require("../../../services/salesService");

describe("Testes do sales services", async () => {
  afterEach(sinon.restore);

  describe("ales service getAll", async () => {
    it("Retorna todos as vendas", async () => {
      sinon.stub(salesModel, 'getAll').resolves(1)

      const response = await salesService.getAll()
      
      expect(response).to.equal(1)
    })
  })

  describe("Sales service createSale", async () => {
    it("Cria uma venda e retorna um objeto com o id e os produtos da venda", async() => {
          sinon.stub(salesModel, "createSaleId").resolves(1);
    sinon.stub(salesModel, "createSaleProducts").resolves(2);
    const sale = {
      id: 1,
      itemsSold: mocksDatabase.twoProductsSales,
    };

      const response = await salesService.createSale(mocksDatabase.twoProductsSales)
      
      expect(response).to.deep.equal(sale)
    })


  });
});
