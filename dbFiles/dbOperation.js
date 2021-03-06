/** @format */

const config = require("./dbconfig.js");
const sql = require("mssql");

const getCustomer = async () => {
  try {
    let pool = await sql.connect(config);
    let customers = pool.request().query("SELECT * from Customers");
    console.log(customers);
    return customers;
  } catch (error) {
    console.log(error);
  }
};

const loginCustomer = async (FirstName, LastName) => {
  try {
    let pool = await sql.connect(config);
    let customer = await pool
      .request()
      .query(
        `SELECT Id FROM Customers WHERE FirstName LIKE '${FirstName}' AND LastName LIKE '${LastName}'`
      );
    return customer;
  } catch (error) {
    console.log(error);
  }
};

const getMyOrders = async (CustomerId) => {
  try {
    let pool = await sql.connect(config);
    let orders = await pool
      .request()
      .query(
        `SELECT Orders.Id, Orders.Price, Orders.Amount, Orders.ShippingAddress, Products.Name, Products.Size FROM Orders INNER JOIN Products ON Orders.ProductId=Products.Id WHERE CustomerId = 1`
      );
    return orders;
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async () => {
  try {
    let pool = await sql.connect(config);
    let products = pool.request().query("SELECT * from Products");
    return products;
  } catch (error) {
    return error;
  }
};

const getProductId = async (id) => {
  try {
    let pool = await sql.connect(config);
    let product = pool
      .request()
      .query(`SELECT * FROM Products WHERE Id = '${id}'`);
    return product;
  } catch (error) {
    return error;
  }
};

const getOrder = async () => {
  try {
    let pool = await sql.connect(config);
    let orders = pool.request().query("SELECT * from Orders");
    return orders;
  } catch (error) {
    return error;
  }
};

const createCustomer = async (Customer) => {
  try {
    let pool = await sql.connect(config);
    let customers = pool.request()
      .query(`INSERT INTO Customers (FirstName, LastName, Address) VALUES
        ('${Customer.FirstName}', '${Customer.LastName}', '${Customer.Address}')`);
    console.log(customers);
    return customers;
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async (Product) => {
  try {
    let pool = await sql.connect(config);
    let products = pool
      .request()
      .query(
        `INSERT INTO Products VALUES ('${Product.Name}', '${Product.Size}', '${Product.Price}')`
      );
    return products;
  } catch (error) {
    return error;
  }
};

const deleteProduct = async (ProdId) => {
  try {
    let pool = await sql.connect(config);
    let products = pool
      .request()
      .query(`DELETE FROM Products WHERE Id = ${ProdId}`);
    return products;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const deleteOrder = async (Id) => {
  try {
    let pool = await sql.connect(config);
    let orders = pool.request().query(`DELETE FROM Orders WHERE Id = ${Id}`);
    return orders;
  } catch (error) {
    console.log(error);
    return error;
  }
};

const createOrder = async (Order) => {
  try {
    console.log(Order);
    let pool = await sql.connect(config);
    let orders = pool
      .request()
      .query(
        `INSERT INTO Orders VALUES ('${Order.ProductId}', '${Order.CustomerId}', '${Order.Amount}', '${Order.ShippingAddress}', '${Order.Price}' )`
      );
    return orders;
  } catch (error) {
    return error;
  }
};

const getMyShippingAddresses = async (CustomerId) => {
  try {
    let pool = await sql.connect(config);
    let shippingAddresses = pool
      .request()
      .query(
        `SELECT DISTINCT ShippingAddress FROM Orders WHERE CustomerId = '${CustomerId}'`
      );
    return shippingAddresses;
  } catch (error) {
    return error;
  }
};

const updateOrder = async (Order) => {
  try {
    let pool = await sql.connect(config);
    let orders = pool
      .request()
      .query(
        `UPDATE Orders SET ProductId = '${Order.ProductId}', Amount = '${Order.Amount}', ShippingAddress = '${Order.ShippingAddress}' WHERE Id = '${Order.Id}';`
      );
    return orders;
  } catch (error) {
    return error;
  }
};

const updateProduct = async (Prod) => {
  try {
    let pool = await sql.connect(config);
    let orders = pool
      .request()
      .query(
        `UPDATE Products SET Size = '${Prod.Size}', Name = '${Prod.Name}', Price = '${Prod.Price}' WHERE Id = '${Prod.Id}';`
      );
    return orders;
  } catch (error) {
    return error;
  }
};

const getProfitTotal = async() => {
  try {
    let pool = await sql.connect(config);
    let profit = pool
      .request()
      .query(
        `SELECT SUM(Price) AS Total FROM Orders;`
      );
      return profit;
  } catch (error) {
    return error;
  }
}

const getProfitRange = async(Dates) => {
  console.log(Dates)
  try {
    let pool = await sql.connect(config);
    let range = pool
    .request()
    .query(
      `SELECT SUM(Price) as Total FROM Orders WHERE Date BETWEEN '${Dates.Start}' AND '${Dates.End}'`
    );
    return range;
  } catch (error) {
    return error;
  }
}

module.exports = {
  getProfitRange,
  getProfitTotal,
  getProductId,
  updateProduct,
  getCustomer,
  createCustomer,
  getProduct,
  createProduct,
  createOrder,
  getOrder,
  deleteProduct,
  loginCustomer,
  getMyOrders,
  deleteOrder,
  updateOrder,
  getMyShippingAddresses,
};
