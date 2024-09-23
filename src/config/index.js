const { connect } = require ("mongoose");

module.exports.connectDB = async () => {
    console.log('Base de datos concetada')
    return await connect('mongodb+srv://cmvillarroelc:Mqn86GUCsxvznkgK@cluster0.mgf8b.mongodb.net/c70125?retryWrites=true&w=majority&appName=Cluster0')
}