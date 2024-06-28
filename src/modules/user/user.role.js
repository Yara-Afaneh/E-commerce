import { roles } from "../../middleware/auth.js";



export const endPoints={
    getall:[roles.Admin],
    getdata:[roles.Admin,roles.User],
   

   
}