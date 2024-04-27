
import categoriesRouter from "./modules/categories/categories.router.js"
import ProductsRouter from "./modules/products/products.router.js"
import AuthRouter from "./modules/auth/auth.router.js"
import userRouter from "./modules/user/user.router.js"
import connectDB from "../DB/connection.js"



const initApp=(app,express)=>{
    connectDB();
    app.use(express.json());
    app.get('/',(req,res)=>{
        return res.status(200).json({message:"welcome"});
    })
    app.use('/categories',categoriesRouter);
    app.use('/products',ProductsRouter);
    app.use('/auth',AuthRouter);
    app.use('/user',userRouter);
    app.get('*',(req,res)=>{
        return res.status(404).json({message:"page not found"});

    }); 

}
export default initApp;