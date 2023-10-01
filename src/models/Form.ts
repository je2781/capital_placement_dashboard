class Form {
  id: string;
  form: {
    type: string | undefined;
    question?: string;
    choice?: string;
    duration?: string;
    time?: string;
    addInfo?: string;
    enableOption?: string;
    disqualify?: string;
    maxNumOfChoices?: string;
  };

  constructor(form: {
    type: string | undefined;
    question?: string;
    choice?: string;
    duration?: string;
    time?: string;
    addInfo?: string;
    enableOption?: string;
    disqualify?: string;
    maxNumOfChoices?: string;

  }) {
    this.id = new Date().toISOString();
    this.form = form;
  }
}

export default Form;
