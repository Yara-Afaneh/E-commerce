import multer from 'multer'

export const fileType={
    image:['image/png','image/jpeg','image/webp','image/jpg'],
    pdf:['application/pdf'],
    excel:['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
}
function fileUpload(customeType=[]){
    const storage = multer.diskStorage({})
    function fileFiltter(req,file,cb){
        if (customeType.includes(file.mimeType)){
            cb(null,true);}
            else{
               cb('invalid file',false);
            }
    }

   
      const upload = multer({fileFiltter,storage})

      return upload;
}

export default fileUpload;

  
  