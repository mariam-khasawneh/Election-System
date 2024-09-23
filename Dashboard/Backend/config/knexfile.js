module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "localhost",
      user: "postgres",
      // password: "2128", //Mohammad
      // password: "admin12345", // wabarneh
      password: "0000",
      database: "Elections",
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
