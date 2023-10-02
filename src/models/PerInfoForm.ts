import AdditionalQuestionForm from "./addQuestionForm";

class PerInfoForm {
  form: {
    fName: { hideCheck: boolean; internalCheck: boolean; value?: string;  };
    lName: { hideCheck: boolean; internalCheck: boolean; value?: string; };
    email: { hideCheck: boolean; internalCheck: boolean; value?: string;  };
    phone: {hideCheck: boolean; internalCheck: boolean;  value?: string;  };
    nationality: {hideCheck: boolean; internalCheck: boolean; value?: string; };
    res: { hideCheck: boolean; internalCheck: boolean; value?: string;  };
    idNum: {hideCheck: boolean; internalCheck: boolean; value?: string; };
    dob: { hideCheck: boolean; internalCheck: boolean; value?: string;  };
    gender: { hideCheck: boolean; internalCheck: boolean; value?: string; };
    persQuestions: AdditionalQuestionForm[]
  };

  constructor(form: {
    fName: { hideCheck: boolean; internalCheck: boolean; value?: string;  };
    lName: { hideCheck: boolean; internalCheck: boolean; value?: string; };
    email: { hideCheck: boolean; internalCheck: boolean; value?: string;  };
    phone: {hideCheck: boolean; internalCheck: boolean;  value?: string;  };
    nationality: {hideCheck: boolean; internalCheck: boolean; value?: string; };
    res: { hideCheck: boolean; internalCheck: boolean; value?: string;  };
    idNum: {hideCheck: boolean; internalCheck: boolean; value?: string; };
    dob: { hideCheck: boolean; internalCheck: boolean; value?: string;  };
    gender: { hideCheck: boolean; internalCheck: boolean; value?: string; };
    persQuestions: AdditionalQuestionForm[]
  }) {
    this.form = form;
  }
}

export default PerInfoForm;
