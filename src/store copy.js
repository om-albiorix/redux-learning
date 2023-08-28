import { combineReducers, createStore } from "redux";

const intialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const intialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

const accountreducer = (state = intialState, action) => {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: action.payload + state.balance };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    default:
      return state;
  }
};

const customerReducer = (state = intialStateCustomer, action) => {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return { ...state, fullName: action.payload };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  account: accountreducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

const deposit = (amount) => {
  return {
    type: "account/deposit",
    payload: amount,
  };
};

const withdraw = (amount) => {
  return {
    type: "account/withdraw",
    payload: amount,
  };
};

const requestLoan = (amount, purpose) => {
  return {
    type: "account/requestLoan",
    payload: { amount: amount, purpose: purpose },
  };
};

const payLoan = () => {
  return {
    type: "account/payLoan",
  };
};

store.dispatch(deposit(500));
store.dispatch(withdraw(300));
console.log(store.getState());
store.dispatch(requestLoan(5000, "for a expense"));
console.log(store.getState());
store.dispatch(payLoan());

console.log(store.getState());

const createCustomer = (fullName, nationalID) => {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      nationalID,
      createdAt: new Date().toISOString(),
    },
  };
};

const updateName = (fullName) => {
  return {
    type: "account/updateName",
    payload: fullName,
  };
};

store.dispatch(createCustomer("Om Solanki", "243434"));
store.dispatch(updateName("Om Shah"));
console.log(store.getState());
