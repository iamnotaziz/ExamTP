const mongoose =require ('mongoose');

const database = async ()=> {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('database connected');
    
    }catch(error){
        console.log(error.message);
        
    }
}

module.exports = {database};