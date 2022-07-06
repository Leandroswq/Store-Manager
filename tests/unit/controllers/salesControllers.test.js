const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const salesController = require("../../../controllers/salesControllers");
const salesService = require("../../../services/salesService");
const productModel = require("../../../models/productsModel");
const productsService = require("../../../services/productsService");

describe("Testes do sales controller", async () => {
  afterEach(sinon.restore);
  const response = {};
  const request = {};

  beforeEach(() => {
    request.body = {};
    request.params = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
    response.sendStatus = sinon.stub().returns();
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
    it("Retorna o status 200 com a venda com do id do parametro", async () => {
      const stub = sinon.stub(salesService, "getById").resolves(1);
      const id = 1;
      request.params = { id };

      await salesController.getById(request, response);

      expect(stub.calledWith(id));
      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(1)).to.be.true;
    });
  });

  describe("Sales controllers createSale", async () => {
    it("Retorna o status 201 e um objeto com o id da venda e os produtos criados", async () => {
      sinon.stub(salesService, "createSale").resolves(1);
      sinon
        .stub(productModel, "getAllById")
        .resolves(mocksDatabase.twoProducts);
      request.body = mocksDatabase.twoProductsSales;

      await salesController.createSale(request, response);

      expect(response.status.calledWith(201)).to.be.true;
      expect(response.json.calledWith(1)).to.be.true;
    });
  });

  describe("Sales controller deleteSale", async () => {
    it("Retorna apenas o status 204 ao deletar uma venda com sucesso", async () => {
      const stub = sinon.stub(salesService, "deleteSale").resolves();
      request.params.id = 5;
      await salesController.deleteSale(request, response);

      expect(stub.called).to.be.true;
      expect(response.sendStatus.calledWith(204)).to.be.true;
    });
  });

  describe("Sales controller updateSaleProducts", async () => {
    it("Retorna o status 200 e a venda com os dados atualizados", async () => {
      const validateProductId = sinon
        .stub(productsService, "validateProductId")
        .resolves();
      const validateProductQuantity = sinon
        .stub(productsService, "validateProductQuantity")
        .resolves();
      const validateProductsExist = sinon
        .stub(productsService, "validateProductsExist")
        .resolves();
      const getById = sinon.stub(salesService, "getById").resolves();
      const updateSaleProducts = sinon
        .stub(salesService, "updateSaleProducts")
        .resolves(1);

      const products = "bolsa";
      const id = 5;
      request.params.id = id;
      request.body = products;

      await salesController.updateSaleProducts(request, response);

      expect(validateProductId.calledWith(products)).to.be.true;
      expect(validateProductQuantity.calledWith(products)).to.be.true;
      expect(validateProductsExist.calledWith(products)).to.be.true;
      expect(getById.calledWith(id)).to.be.true;
      expect(updateSaleProducts.calledWith(id, products)).to.be.true;

      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(1)).to.be.true;
    });
  });
});
