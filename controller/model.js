try {
    require('dotenv').config();
} catch (error) {
    console.log('.env module not needed');
}

const mongoose = require('mongoose');

//Set up default mongoose connection
if (!process.env.MONGO_DB_URL) {
    console.log('MONGO URL NOT SPECIFIED IN .env file')
    process.exit();
}

const mongoDB = process.env.MONGO_DB_URL;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);
//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('database connected'));

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    number: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    seller: { type: Boolean, default: false },
    data: { type: Object, default: {} }
});
const ProductSchema = new Schema({
    type: { type: String, default: 'all' },
    name: { type: String, required: true },
    images: { type: Array },
    cost: { value: { type: Number, required: true }, currency: { type: String, required: true, default: 'INR' } },
    amount: { type: Number, default: 1, required: true }
});

const UserModel = mongoose.model('users', UserSchema);
const ProductModel = mongoose.model('products', ProductSchema);

// ProductModel.findOne({}).then(pd => {
//     pd.get()
// })

module.exports = { UserModel, ProductModel };
