class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // this is come from mongoos
    this.queryString = queryString; // this is come from router
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludFields = ['page', 'sort', 'limit', 'fields']; // through this we are deleting same name fields from query object

    excludFields.forEach((el) => delete queryObj[el]); // delete excluded fields from req.query object
    // (1B) ADVAMCED FILTERING
    let queryStr = JSON.stringify(queryObj); //JSON.stringfy() it converts javascript obj to json string / string object
    queryStr = queryStr.replace(/\bgt|gte|lte|lt\b/g, (match) => `$${match}`);
    this.query = this.query.find(JSON.parse(queryStr)); // JSON.parse() it converts JSON string to javascript obj

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fieldsStr = this.queryString.fields.split(',').join(' '); // convert object to string through split().join()
      this.query = this.query.select(fieldsStr); // select fields from query object
    } else {
      this.query = this.query.select('-__v'); // due negative we are removing __v property from client response
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}
module.exports = APIFeatures;
