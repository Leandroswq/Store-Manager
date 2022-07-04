const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const productsService = require("../../../services/productsService");
const productsControllers = require("../../../controllers/productsControllers.js");

describe("Testes dos products controllers", async () => {
  const response = {};
  const request = {};
  const resolveMock = "resolvido";

  beforeEach(() => {
    request.body = {};
    request.params = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  afterEach(() => sinon.restore());

  describe("Product controller getAll", async () => {
    it("Testa se o controller retorna o status 200 e os produtos no body response", async () => {
      sinon.stub(productsService, "getAll").resolves(resolveMock);
      await productsControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(resolveMock)).to.be.true;
    });
  });

  describe("Product controller getById", async () => {
    it("Testa se o controller retorna o status 200 e os produtos no body do response", async () => {
      request.params.id = 1;
      const stub = sinon.stub(productsService, "getById").resolves(resolveMock);
      await productsControllers.getById(request, response);

      expect(response.status.calledWith(200)).to.be.true;
      expect(response.json.calledWith(resolveMock)).to.be.true;
      expect(stub.calledWith(request.params.id)).to.be.true;
    });
  });

  describe("Product controller createProduct", async () => {
    it("Testa se o controller retorna o status 201 e os produtos no body do response", async () => {
      const stub = sinon
        .stub(productsService, "createProduct")
        .resolves(resolveMock);
      
      const name = 'blusa';
      request.body = { name }
      await productsControllers.createProduct(request, response)

      expect(response.status.calledWith(201)).to.be.true;
      expect(stub.calledWith(name)).to.be.true;
      expect(response.json.calledWith(resolveMock)).to.be.true;

    });
  });

  describe("Product controller updateProduct", async () => {
    it("Verifica se o controller retorna o status 200 com o produto com os valores atualizado", async () => {
      sinon.stub(productsService, 'updateProduct').resolves(1)
      request.params.id = 1
      request.body.name = "bolas"
      await productsControllers.updateProduct(request, response)

      expect(response.status.calledWith(200)).to.be.true
      expect(response.json.calledWith({id:1, name: "bolas"})).to.be.true
    })
  });
});
