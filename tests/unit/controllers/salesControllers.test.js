const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const salesController = require("../../../controllers/salesControllers");
const salesService = require("../../../services/salesService");

describe("Testes do sales controller", async () => {
  afterEach(sinon.restore);
  const response = {};
  const request = {};

  beforeEach(() => {
    request.body = {};
    request.params = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  describe("Sales controler getAll", async () => {
    it("Retorna o status 200 com todos as vendas", async () => {
      sinon.stub(salesService, "getAll").resolves(1);

      await salesController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(1)).to.be.true;
    });
  });

  describe("Sales controllers createSale", async () => {
    it("Retorna o status 201 e um objeto com o id da venda e os produtos criados", async () => {
      sinon
        .stub(salesService, "createSale")
        .resolves(mocksDatabase.twoProductsSalesCreated);

      request.body = mocksDatabase.twoProductsSales;

      await salesController.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.true;
      expect(response.json.calledWith(mocksDatabase.twoProductsSalesCreated)).to
        .be.true;
    });
  });
});
