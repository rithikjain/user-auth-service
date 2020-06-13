import { signupParams, controllerResponse } from "./interface";
import Respond from "../utils/response";

class UserOperations {
    static async echoUser(user: signupParams): Promise<controllerResponse> {
        return Respond.Success(200, "User Echoed", user)
    }
}

export default UserOperations