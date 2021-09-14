const mongoose =require('mongoose');
const cors=require('cors');
const uri=process.env.uri;
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("db connect");
  })
  .catch((error) => console.log(error));