const isLogin = localStorage.getItem("account") ? true : false;
const account_id = localStorage.getItem("account") || "";

const initialState = Object.freeze({
  isLogin: isLogin,
  account_id: account_id,
  account_detail: null,
});

/*
state/auth = {
  isLogin: Boolean,
  account_id: String,
  account_detail: {
   firstname: String,
   lastname: String,
   email: String,
  }
}
*/

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LOGIN": {
      const { _id, firstname, lastname, email } = payload;
      const account_detail = {
        firstname,
        lastname,
        email,
      };
      const isLogin = true;
      const account_id = _id;
      return { isLogin, account_id, account_detail };
    }
    case "ADD_ACCOUNT_DETAIL": {
      const { firstname, lastname, email } = payload;
      const account_detail = {
        firstname,
        lastname,
        email,
      };
      return { ...state, account_detail };
    }
    case "LOGOUT": {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export default reducer;
