const bcrypt = require('bcrypt')
const databaseConfig = require('../../../config/db.cofig');
const userModel = require('../../../modules/user/user.model');
const authModel = require('../../../modules/auth/auth.model');
const admins = require('./admin');

async function seedAdmins() {
    try {
        // Wait for the database connection to be established
        await databaseConfig.dbconnection();

        console.log('****** SEEDING ADMINS *******');

        for (const admin of admins) {
            const hashPw = await bcrypt.hash(admin.password, 16);
            //creating authdoc
            const auth = new authModel({
                _id: admin.email,
                password: hashPw
            });
            // save the auth doc
            const savedAuth = await auth.save();

            //creating userdoc
            const user = new userModel({
                authId: savedAuth._id,
                name: admin.name,
                type: admin.type
            });

            //save the userDoc
            const result = await user.save();
            if (result) {
                console.log('Added Admin userId = ', result._id);
            }
        }
        console.log('****** ADMINS SEEDED SUCCESSFULLY *******');
        process.exit(0); // exit the process
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
}

seedAdmins();
