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

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  });

  after(() => sinon.restore());

  describe("Product controller getAll", async () => {
    it("Testa se a resposta retorna o status 200 e os produtos no body", async () => {
      sinon.stub(productsService, "getAll").resolves(resolveMock);
      await productsControllers.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.true;
    });
  });
});
