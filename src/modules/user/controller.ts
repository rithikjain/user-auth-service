import { signupObject, controllerResponse } from "./interface";
import RESPONSE from "../response/responses";

class UserOperations {
    static async echoUser({ user }: signupObject): Promise<controllerResponse> {
        if (!user) {
            return RESPONSE.INCOMPLETE_REQUEST()
        }
        return RESPONSE.SUCCESS_OPERATION(user)
    }
}

export default UserOperations