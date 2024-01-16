import database from "../config/database.js";
class Query {
  async getAll(table) {
    const query = `SELECT * FROM ${table}`;
    const [result] = await database.execute(query);
    return result;
  }

  async getOneByField(table, field, value) {
    const query = `SELECT * FROM ${table} WHERE ${field} = ?`;
    const [result] = await database.execute(query, [value]);
    return result;
  }

  async create(table, data) {
    const query = `INSERT INTO ${table} (${Object.keys(data).join(", ")}) VALUES (${Object.keys(data)
      .map(() => "?")
      .join(", ")})`;
    const [result] = await database.execute(query, Object.values(data));
    return result;
  }

  async getAllProducts(table1, table2, field1, field2) {
    const query = `SELECT ${table1}.*, ${table2}.label AS category FROM ${table1} INNER JOIN ${table2} ON ${table1}.${field1} = ${table2}.${field2}`;
    const [result] = await database.execute(query);
    return result;
  }
}

export default new Query();
