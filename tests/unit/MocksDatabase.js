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
  oneProductsSales: [
    { productId: 1, quantity: 3 },
  ],
};
