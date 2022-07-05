const { expect } = require("chai");
const sinon = require("sinon");
const mocksDatabase = require("../MocksDatabase");

const productsService = require("../../../services/productsService");
const productsModel = require("../../../models/productsModel");

describe("Testes dos products services", async () => {
  afterEach(sinon.restore);

  describe("Product service nameValidation", () => {
    it("Retorna um erro 'BadRequest' quando o name for vazio", async () => {
      try {
        await productsService.nameValidation("");
      } catch (err) {
        const { name, message } = err;
        expect(name).to.be.equal("BadRequest");
        expect(message).to.be.equal('"name" is required');
      }
      try {
        await productsService.nameValidation();
      } catch (err) {
        const { name, message } = err;
        expect(name).to.be.equal("BadRequest");
        expect(message).to.be.equal('"name" is required');
      }
    });

    it("Retorna true se o name estiver correto", async () => {
      const response = await productsService.nameValidation("lanterna");

      expect(response).to.be.true;
    });

    it("Retorna um erro 'UnprocessableEntity' quando o name for vazio", async () => {
      try {
        await productsService.nameValidation("bota");
      } catch (err) {
        const { name, message } = err;
        expect(name).to.be.equal("UnprocessableEntity");
        expect(message).to.be.equal(
          '"name" length must be at least 5 characters long'
        );
      }
    });
  });

  describe("Product service validateProductId", async () => {
    it("Validação com os ids corretos", async () => {
      const response = await productsService.validateProductId(
        mocksDatabase.twoProductsSales
      );
      expect(response).to.be.true;
    });
    it("Validação com os ids incorretos", async () => {
      try {
        const response = await productsService.validateProductId([
          { quantity: 1 },
          { productId: 2, quantity: 5 },
        ]);
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("BadRequest");
        expect(message).to.equal('"productId" is required');
      }
    });
  });

  describe("Product service validateProductQuantity", async () => {
    it("Valida com as quantidades corretas", async () => {
      const response = await productsService.validateProductQuantity(
        mocksDatabase.twoProductsSales
      );

      expect(response).to.be.true;
    });

    it("Valida com o produto sem o campo quantity", async () => {
      try {
        await productsService.validateProductQuantity([{ productId: 1 }]);
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("BadRequest");
        expect(message).to.equal('"quantity" is required');
      }
    });

    it("Valida com o produto com o campo quantity = 0", async () => {
      try {
        await productsService.validateProductQuantity([
          { productId: 1, quantity: 0 },
        ]);
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("UnprocessableEntity");
        expect(message).to.equal(
          '"quantity" must be greater than or equal to 1'
        );
      }
    });

    it("Valida com o produto com o campo quantity < 0", async () => {
      try {
        await productsService.validateProductQuantity([
          { productId: 1, quantity: -5 },
        ]);
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("UnprocessableEntity");
        expect(message).to.equal(
          '"quantity" must be greater than or equal to 1'
        );
      }
    });
  });

  describe("Product service validateProductsExist", async () => {
    it("Todos os produtos existem no banco de dados", async () => {
      sinon
        .stub(productsModel, "getAllById")
        .resolves(mocksDatabase.twoProducts);

      const response = await productsService.validateProductsExist(
        mocksDatabase.twoProducts
      );

      expect(response).to.be.true;
    });

    it("Produto com id não existente no banco de dados", async () => {
      sinon
        .stub(productsModel, "getAllById")
        .resolves(mocksDatabase.oneProductsSales);
      try {
        await productsService.validateProductsExist(mocksDatabase.twoProducts);
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("NotFound");
        expect(message).to.equal("Product not found");
      }
    });
  });

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
        expect.fail();
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("NotFound");
        expect(message).to.equal("Product not found");
      }
    });
  });

  describe("Product Service getById", async () => {
    afterEach(() => productsModel.getById.restore());

    if (
      ("Verifica se o model é chamado com o argumento correto",
      async () => {
        const stub = sinon
          .stub(productsModel, "getById")
          .resolves(mocksDatabase.oneProducts[0]);

        await productsService.getById(1);

        expect(stub.arguments[0]).to.include(1);
      })
    )
      it("Retorna apenas o produto desejado", async () => {
        sinon
          .stub(productsModel, "getById")
          .resolves(mocksDatabase.oneProducts[0]);
        const products = await productsService.getById();

        expect(products).to.haveOwnProperty("id", 1);
      });

    it("Caso o produto desejado não exista retorne o erro 'NotFound' com a mensagem 'Product not found'", async () => {
      sinon.stub(productsModel, "getById").resolves([]);
      try {
        await productsService.getById();
        expect.fail();
      } catch (err) {
        const { name, message } = err;
        expect(name).to.equal("NotFound");
        expect(message).to.equal("Product not found");
      }
    });
  });

  describe("Product service createProduct", async () => {
    afterEach(() => productsModel.createProduct.restore());

    it("Verifica se o service retorna um objeto com o produto e o id dele", async () => {
      const stub = sinon.stub(productsModel, "createProduct").resolves(1);
      const productName = "bolsa";

      const product = await productsService.createProduct(productName);

      expect(stub.args[0][0]).to.be.equal(productName);
      expect(product).to.deep.equal({ id: 1, name: "bolsa" });
    });
  });

  describe("Product service updateProduct", async () => {
    it("Verifica se o service retorna a quantidade de linhas atualizadas", async () => {
      sinon.stub(productsModel, "updateProduct").resolves(1);

      const id = 2;
      const name = "bola";
      const response = await productsService.updateProduct(id, name);

      expect(response).to.equal(1);
    });

    it("Verifica se o service retorna um 'NotFoundError' caso o produto a ser atualizado não exista", async () => {
      sinon.stub(productsModel, "updateProduct").resolves(0);
      const id = 2;
      const name = "bola";
      try {
        await productsService.updateProduct(id, name);
        expect.fail();
      } catch (err) {
        const { name, message } = err;

        expect(name).to.equal("NotFound");
        expect(message).to.equal("Product not found");
      }
    });
  });
  
  describe("Product service deleteProduct", async () => {
    it("Verifica se deleta um produto com sucesso", async () => {
      sinon.stub(productsModel, "deleteProduct").resolves(1);
      const response = await productsService.deleteProduct(1);

      expect(response).to.equal(1);
    });

    it("Verifica se retorna um 'NotFoundError' caso o produto não exista", async () => {
      sinon.stub(productsModel, "deleteProduct").resolves(0);
      try {
        await productsService.deleteProduct(1);
        expect.fail();
      } catch (err) {
        const { name, message } = err;

        expect(name).to.equal("NotFound");
        expect(message).to.equal("Product not found");
      }
    });
  });

});
