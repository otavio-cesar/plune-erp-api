module.exports = {
  username: 'tdngfvvvptrkrw',
  password: 'fbd87577787e387c4f8efab137972a9072914a1358b27d89f1d49e80f49926d9',
  database: 'deloql8a2nb4fb',
  host: 'ec2-18-204-101-137.compute-1.amazonaws.com',
  dialect: 'postgres',
  define: {
    timestamps: false,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}