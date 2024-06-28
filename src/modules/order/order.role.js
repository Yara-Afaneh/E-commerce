import { roles } from "../../middleware/auth.js";



export const endPoints={
    create:[roles.User],
    all:[roles.User],
    getUserorders:[roles.Admin],
    changeStatus:[roles.Admin]

   
}