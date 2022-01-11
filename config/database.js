module.exports = {
    development: {
      username: "root",
      password: "",
      database: "desenv.vam",
      host: "127.0.0.1",
      dialect: "mysql",
      timezone: "-04:00",
      define: {
        charset: "utf8mb4",
        dialectOptions: {
          collate: "utf8mb4_general_ci"
        }
      }
    },
    production: {
      username: "",
      password: "",
      database: "",
      host: "",
      dialect: "mysql",
      timezone: "-04:00",
      define: {
        charset: "utf8mb4",
        dialectOptions: {
          collate: "utf8mb4_general_ci"
        }
      }
    }
  }
  