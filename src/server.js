const app = require('./app');
const {connectToDatabase} = require('./config/dbconfig');

//connection and listeneres
async function startServer() {
    try {
        await connectToDatabase();
        app.listen(process.env.PORT || 3000, () => console.log("Sever is Open! and connected to databse.🚀"));
    } catch (error) {
        throw new Error("Error starting server:", error);
    }
}

startServer();
