import { roles } from "../../middleware/auth.js";



export const endPoints={
    create:[roles.Admin],
    get:[roles.Admin, roles.User],
    getactive:[roles.User],
    delete:[roles.Admin]
}