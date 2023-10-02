class AdditionalQuestionForm {
  form: {
    perType: string | undefined;
    perQuestion?: string;
    perChoice?: string | string[];
    perDuration?: string;
    perTime?: string;
    perAddInfo?: string;
    perEnableOption?: string;
    perDisqualify?: boolean;
    perMaxNumOfChoices?: string;
    proType?: string;
    proQuestion?: string;
    proChoice?: string | string[];
    proDuration?: string;
    proTime?: string;
    proAddInfo?: string;
    proEnableOption?: string;
    proDisqualify?: boolean;
    proMaxNumOfChoices?: string;
    custType?: string;
    custQuestion?: string;
    custChoice?: string | string[];
    custDuration?: string;
    custTime?: string;
    custAddInfo?: string;
    custEnableOption?: string;
    custDisqualify?: boolean;
    custMaxNumOfChoices?: string;
    custOther?: boolean;
    proOther?: boolean;
    perOther?: boolean;
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
    perDisqualify?: boolean;
    perMaxNumOfChoices?: string;
    proType?: string;
    proQuestion?: string;
    proChoice?: string | string[];
    proDuration?: string;
    proTime?: string;
    proAddInfo?: string;
    proEnableOption?: string;
    proDisqualify?: boolean;
    proMaxNumOfChoices?: string;
    custType?: string;
    custQuestion?: string;
    custChoice?: string | string[];
    custDuration?: string;
    custTime?: string;
    custAddInfo?: string;
    custEnableOption?: string;
    custDisqualify?: boolean;
    custMaxNumOfChoices?: string;
    custOther?: boolean;
    proOther?: boolean;
    perOther?: boolean;
}, id?: string) {
    this.id = id ? id : new Date().toISOString() + Math.random().toString();
    this.form = form;
  }
}

export default AdditionalQuestionForm;
