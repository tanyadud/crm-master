import localizeFilter from "@/filters/localize.filter";

export default {
  'logout': localizeFilter('Message_LogOut'),
  'login': localizeFilter('Message_LogIn'),
  'auth/user-not-found' : localizeFilter('Message_UserDoesntExist'),
  'auth/wrong-password' : localizeFilter('Message_IncorrectPassword'),
  'auth/email-already-in-use' : localizeFilter('Message_UserAlreadyExist'),
}
