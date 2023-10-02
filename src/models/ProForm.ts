import AdditionalQuestionForm from "./addQuestionForm";

class ProForm {
  form: {
    education: { hideCheck: boolean; mandatoryCheck: boolean; value?: string;  };
    exp: { hideCheck: boolean; mandatoryCheck: boolean; value?: string; };
    resume: { hideCheck: boolean; mandatoryCheck: boolean; value?: string;  };
    proQuestions: AdditionalQuestionForm[]
  };

  constructor(form: {
    education: { hideCheck: boolean; mandatoryCheck: boolean; value?: string;  };
    exp: { hideCheck: boolean; mandatoryCheck: boolean; value?: string; };
    resume: { hideCheck: boolean; mandatoryCheck: boolean; value?: string;  };
    proQuestions: AdditionalQuestionForm[]
  }) {
    this.form = form;
  }
}

export default ProForm;
