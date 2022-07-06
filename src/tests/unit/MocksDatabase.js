module.exports = {
  twoProducts: [
    [
      { id: 1, name: "Martelo de Thor" },
      { id: 2, name: "Traje de encolhimento" },
    ],
    [],
  ],

  oneProducts: [[{ id: 1, name: "Martelo de Thor" }], []],

  zeroProducts: [[], []],

  createProduct: [{ insertId: 1 }],

  twoProductsSales: [
    { productId: 1, quantity: 1 },
    { productId: 2, quantity: 5 },
  ],
  oneProductsSales: [{ productId: 1, quantity: 3 }],

  twoProductsSalesCreated: { id: 3, itemsSold: this.twoProductsSales },

  oneSalesWithId: [
    { saleId: 1, productId: 1, quantity: 1, date: "2021-09-09T04:54:29.000Z" },
    { saleId: 1, productId: 2, quantity: 5, date: "2021-09-09T04:54:29.000Z" },
  ],

  twoSalesWithId: [
    { saleId: 1, productId: 1, quantity: 1, date: "2021-09-09T04:54:29.000Z" },
    { saleId: 1, productId: 2, quantity: 5, date: "2021-09-09T04:54:29.000Z" },
    { saleId: 2, productId: 3, quantity: 2, date: "2021-09-09T04:54:29.000Z" },
  ],

  oneSaleswithoutId: [
    { productId: 1, quantity: 1, date: "2021-09-09T04:54:29.000Z" },
    { productId: 2, quantity: 5, date: "2021-09-09T04:54:29.000Z" },
  ],

  twoSaleswithoutId: [
    { productId: 1, quantity: 1, date: "2021-09-09T04:54:29.000Z" },
    { productId: 2, quantity: 5, date: "2021-09-09T04:54:29.000Z" },
    { productId: 3, quantity: 2, date: "2021-09-09T04:54:29.000Z" },
  ],
};
