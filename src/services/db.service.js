import { Op } from "sequelize";

const modelsImport = async () => {
  const user = await import("../database/models/user.model.js");
  return { User: user.default };
};

const models = await modelsImport();

const OPERATORS = [
  "$contains",
  "$and",
  "$or",
  "$like",
  "$in",
  "$eq",
  "$gt",
  "$lt",
  "$gte",
  "$lte",
  "$any",
  "$between",
];

/**
 * @description: Global functions used for database operations.
 * Here we define generic functions that can be used for common CRUD operations with Sequelize models.
 */

/**
 * @description: Create a new record in the database.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object} data - Data of the record to create.
 * @returns The created object.
 */
const create = async (model, data) => {
  const result = await model.create(data);
  return result;
};

/**
 * @description: Create multiple records in the database.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object[]} data - List of data for the records to create.
 * @param {Object} options - Other options to pass to Sequelize.
 * @returns The list of created objects.
 */
const createMany = async (model, data, options = { validate: true }) => {
  const results = await model.bulkCreate(data, options);
  return results;
};

/**
 * @description: Retrieves the first object that matches the query.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object} query - Filters to apply to the query.
 * @param {Object} options - Other options to pass to Sequelize.
 * @returns The found object.
 */
const findOne = async (model, query, options = {}) => {
  query = queryBuilderParser(query);
  if (options && options.select && options.select.length) {
    options.attributes = options.select;
    delete options.select;
  }
  if (options && options.include && options.include.length) {
    const include = [];
    options.include.forEach((i) => {
      i.model = models[i.model];
      if (i.query) {
        i.where = queryBuilderParser(i.query);
      }
      include.push(i);
    });
    options.include = include;
  }
  return await model.findOne({
    where: query,
    ...options,
  });
};

/**
 * @description: Retrieves an object by its primary key.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {any} pk - The primary key value.
 * @returns The found object.
 */
const findByPk = async (model, pk) => {
  return model.findByPk(pk);
};

/**
 * @description: Pagination function for database queries.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model for the query.
 * @param {Object} query - Filtering options for the query.
 * @param {Object} options - Additional options for the query.
 * @returns {Object} - Object containing paginated data and pagination information.
 */
const paginate = async (model, query, options = {}) => {
  query = queryBuilderParser(query);
  if (options && options.select && options.select.length) {
    options.attributes = options.select;
    delete options.select;
  }
  if (options && options.sort) {
    options.order = sortParser(options.sort);
    delete options.sort;
  }
  if (options && options.include && options.include.length) {
    const include = [];
    options.include.forEach((i) => {
      i.model = models[i.model];
      if (i.query) {
        i.where = queryBuilderParser(i.query);
      }
      include.push(i);
    });
    options.include = include;
  }
  options = {
    where: query,
    ...options,
  };
  const result = await model.paginate(options);
  const data = {
    data: result.docs,
    paginator: {
      itemCount: result.total,
      perPage: options.paginate || 25,
      pageCount: result.pages,
      currentPage: options.page || 1,
    },
  };
  return data;
};

/**
 * @description: Retrieves the list of all objects that match the given filters, along with the total count of matching elements.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object} query - Filters to apply to the query.
 * @param {Object} options - Other options to pass to Sequelize.
 * @returns An object containing the list of found objects and its count.
 */
const findAndCountAll = async (model, query, options) => {
  query = queryBuilderParser(query);
  if (options && options.select && options.select.length) {
    options.attributes = options.select;
    delete options.select;
  }
  if (options && options.sort) {
    options.order = sortParser(options.sort);
    delete options.sort;
  }
  if (options && options.include && options.include.length) {
    const include = [];
    options.include.forEach((i) => {
      i.model = models[i.model];
      if (i.query) {
        i.where = queryBuilderParser(i.query);
      }
      include.push(i);
    });
    options.include = include;
  }
  options = {
    where: query,
    ...options,
  };
  return model.findAndCountAll(options);
};

/**
 * @description: Retrieves the list of all objects that match the given filters.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object} query - Filters to apply to the query.
 * @param {Object} options - Other options to pass to Sequelize.
 * @returns The list of found objects.
 */
const findAll = async (model, query, options) => {
  query = queryBuilderParser(query);
  if (options && options.select && options.select.length) {
    options.attributes = options.select;
    delete options.select;
  }
  if (options && options.sort) {
    options.order = sortParser(options.sort);
    delete options.sort;
  }
  if (options && options.include && options.include.length) {
    const include = [];
    options.include.forEach((i) => {
      i.model = models[i.model];
      if (i.query) {
        i.where = queryBuilderParser(i.query);
      }
      include.push(i);
    });
    options.include = include;
  }
  options = {
    where: query,
    ...options,
  };
  return model.findAll(options);
};

/**
 * @description: Updates the objects that match the given filters.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object} query - Filters to apply to the query.
 * @param {Object} data - Data to modify.
 * @returns The updated objects.
 */
const update = async (model, query, data) => {
  query = queryBuilderParser(query);
  await model.update(data, { where: query, individualHooks: true });
  const results = await model.findAll({ where: query });
  return results;
};

/**
 * @description: Update a row if it exists, and create a new one otherwise.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object} data - Data to modify.
 * @param {Object} options - Filters.
 * @returns The updated objects.
 */
const upsert = async (model, data, options = {}) => model.upsert(data, options);

/**
 * @description: Counts the number of entries in a table.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object} options - Filters.
 * @returns The number of entries.
 */
const count = async (model, options = {}) => model.count(options);

/**
 * @description: Deletes multiple objects from the database if they match the given filters.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {Object} query - Filters to apply to the query.
 * @returns The deleted objects.
 */
const destroy = async (model, query, options) => {
  query = queryBuilderParser(query);
  const findOptions = {};
  const destroyOptions = {};

  // Handling tables with paranoid option
  if (options && options.force) {
    findOptions.paranoid = false;
    destroyOptions.force = true;
    delete options.force;
  }

  // Retrieve objects before deletion
  const results = await model.findAll({ where: query, ...findOptions });
  await model.destroy({ where: query, ...destroyOptions });
  return results;
};

/**
 * @description: Deletes an object from the database by its primary key.
 *
 * @param {import("sequelize").ModelCtor} model - The Sequelize model to use.
 * @param {any} pk - The primary key value.
 * @param {Object} options - Other options to pass to Sequelize.
 * @returns The deleted object.
 */
const deleteByPk = async (model, pk, options = {}) => {
  await model.destroy({
    where: { [model.primaryKeyField]: pk },
    ...options,
  });
  const result = await findOne(
    model,
    { [model.primaryKeyField]: pk },
    { paranoid: false }
  );
  return result;
};

/**
 * @description: Builds filters compatible with Sequelize.
 *
 * @param {Object} data - Filters data.
 * @returns {Object} - Query object for Sequelize.
 */
const queryBuilderParser = (data) => {
  if (data) {
    Object.entries(data).forEach(([key]) => {
      if (typeof data[key] === "object") {
        queryBuilderParser(data[key]);
      }
      if (OPERATORS.includes(key)) {
        const opKey = key.replace("$", "");
        data[Op[opKey]] = data[key];
        delete data[key];
      } else if (key === "$ne") {
        data[Op.not] = data[key];
        delete data[key];
      } else if (key === "$nin") {
        data[Op.notIn] = data[key];
        delete data[key];
      }
    });
  }

  return data;
};

/**
 * @description: Builds sort parameters for Sequelize.
 *
 * @param {Object} input - Sort parameters.
 * @returns {Object} - Query object for sorting in Sequelize.
 */
const sortParser = (input) => {
  const newSortedObject = [];
  if (input) {
    Object.entries(input).forEach(([key, value]) => {
      if (value === 1) {
        newSortedObject.push([key, "ASC"]);
      } else if (value === -1) {
        newSortedObject.push([key, "DESC"]);
      }
    });
  }
  return newSortedObject;
};

const dbService = {
  create,
  createMany,
  paginate,
  findOne,
  findByPk,
  findAll,
  findAndCountAll,
  update,
  upsert,
  count,
  destroy,
  deleteByPk,
};

export default dbService;
