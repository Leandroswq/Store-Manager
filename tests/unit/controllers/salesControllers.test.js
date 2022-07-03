const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const salesController = require("../../../controllers/salesControllers");
const salesService = require("../../../services/salesService");
const productModel = require("../../../models/productsModel")

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

  describe("Sales controler getById", async () => {
    it('Retorna o status 200 com a venda com do id do parametro', async () => {
      const stub = sinon.stub(salesService, "getById").resolves(1);
      const id = 1;
      request.params = {id}

      await salesController.getById(request, response)

      expect(stub.calledWith(id))
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(1)).to.be.true;
    })
  })

  describe("Sales controllers createSale", async () => {
    it("Retorna o status 201 e um objeto com o id da venda e os produtos criados", async () => {
      sinon.stub(salesService, "createSale").resolves(1);
      sinon.stub(productModel, "getAllById").resolves(mocksDatabase.twoProducts)
      request.body = mocksDatabase.twoProductsSales;

      await salesController.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.true;
      expect(response.json.calledWith(1)).to
        .be.true;
    });
  });
});
