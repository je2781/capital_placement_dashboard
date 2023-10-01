class perInfoForm {
  form: {
    fName: string;
    lName: string;
    email: string;
    phone: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    nationality: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    res: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    idNum: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    dob: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    gender: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
  };

  constructor(form: {
    fName: string;
    lName: string;
    email: string;
    phone: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    nationality: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    res: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    idNum: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    dob: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
    gender: { value: string; hideCheck: {value: string }; internalCheck: {value: string } };
  }) {
    this.form = form;
  }
}

export default perInfoForm;
