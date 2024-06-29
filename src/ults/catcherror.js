export const asyncHandlar=(fun)=>{
    return async(req,res,next)=>{
        try{
            return await fun(req,res,next)
        }catch(err){
            return res.status(500).json({message: err.message})
        }
    }
}