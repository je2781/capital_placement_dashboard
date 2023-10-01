class QuestionForm {    
    id: string;
    form: {type: string; question: string};

    constructor(form: {type: string; question: string}){
        this.id = new Date().toISOString();
        this.form = form;
    }
}

export default QuestionForm;