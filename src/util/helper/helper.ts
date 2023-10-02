import { required, length, email } from "../validation";

export const INFO_FORM = {
  image: {
    value: "",
    valid: false,
    touched: false,
    validators: [required]
  },
  personalQuestions: [],
  customisedQuestions: [],
  profileQuestions: [],
  fName: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 4 })],
    hide: false,
    internal: false,
  },

  lName: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 3 })],
    hide: false,
    internal: false,
  },
  email: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, email],
    hide: false,
    internal: false,
  },
  phone: {
    value: "",
    valid: false,
    touched: false,
    validators: [required, length({ min: 8 })],
    hide: false,
    internal: false,
  },
  nationality: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
    hide: false,
    internal: false,
  },
  res: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
    hide: false,
    internal: false,
  },
  idNum: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
    hide: false,
    internal: false,
  },
  dob: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
    hide: false,
    internal: false,
  },
  gender: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
    hide: false,
    internal: false,
  },
  education: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
    hide: false,
    mandatory: false,
  },
  experience: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
    hide: false,
    mandatory: false,
  },
  resume: {
    value: "",
    valid: false,
    touched: false,
    validators: [required],
    hide: false,
    mandatory: false,
  },
  
  //
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
  //////
  enableOption: {
    checked: false,
    validators: [required],

  },
  disqualify: {
    checked: false,
    validators: [required],

  },
};
