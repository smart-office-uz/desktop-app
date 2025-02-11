import UserService from "@/core/services/user.service";

export async function getCurrentUserStaffId() {
  const userService = new UserService();

  return await userService.getUserStaffId();
}
