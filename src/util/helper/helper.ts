import { required, length, email } from "../validation";

export const INFO_FORM = {
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  fName: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },

  lName: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 5 })],
  },
  email: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, email],
  },
  phone: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  nationality: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  res: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  idNum: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  dob: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  gender: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  type: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  question: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  choice: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  maxNumOfChoices: {
    value: '',
    valid: false,
    touched: false,
    validators: [required],
  },
  addInfo: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  duration: {
    value: '',
    valid: false,
    touched: false,
    validators: [required],
  },
  time: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
  },
  enableOption: {
    checked: false
  },
  disqualify: {
    checked: false
  },
  hide: {
    checked: false
  },
  internal: {
    checked: false
  },
};
