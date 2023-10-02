class AdditionalQuestionForm {
  form: {
    perType: string | undefined;
    perQuestion?: string;
    perChoice?: string | string[];
    perDuration?: string;
    perTime?: string;
    perAddInfo?: string;
    perEnableOption?: string;
    perDisqualify?: string;
    perMaxNumOfChoices?: string;
    proType?: string;
    proQuestion?: string;
    proChoice?: string | string[];
    proDuration?: string;
    proTime?: string;
    proAddInfo?: string;
    proEnableOption?: string;
    proDisqualify?: string;
    proMaxNumOfChoices?: string;
    custType?: string;
    custQuestion?: string;
    custChoice?: string | string[];
    custDuration?: string;
    custTime?: string;
    custAddInfo?: string;
    custEnableOption?: string;
    custDisqualify?: string;
    custMaxNumOfChoices?: string;
    custOther?: any;
    proOther?: any;
    perOther?: any;
  };
  id: string;

  constructor(form: {
    perType: string | undefined;
    perQuestion?: string;
    perChoice?: string | string[];
    perDuration?: string;
    perTime?: string;
    perAddInfo?: string;
    perEnableOption?: string;
    perDisqualify?: string;
    perMaxNumOfChoices?: string;
    proType?: string;
    proQuestion?: string;
    proChoice?: string | string[];
    proDuration?: string;
    proTime?: string;
    proAddInfo?: string;
    proEnableOption?: string;
    proDisqualify?: string;
    proMaxNumOfChoices?: string;
    custType?: string;
    custQuestion?: string;
    custChoice?: string | string[];
    custDuration?: string;
    custTime?: string;
    custAddInfo?: string;
    custEnableOption?: string;
    custDisqualify?: string;
    custMaxNumOfChoices?: string;
    custOther?: any;
    proOther?: any;
    perOther?: any;
}, id?: string) {
    this.id = id ? id : new Date().toISOString() + Math.random().toString()!;
    this.form = form;
  }
}

export default AdditionalQuestionForm;
