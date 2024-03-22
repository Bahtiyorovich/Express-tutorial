import mongoose from 'mongoose';
const uri = 'mongodb+srv://sherzodjon0317:zLl4mQMcXNU1pfHB@cluster0.aknmiiu.mongodb.net/'

mongoose.connect(uri, 
  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
  })
  .then(() => console.log('Connected Successfully'))
  .catch((err) => console.log(err))