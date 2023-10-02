import axios from "axios";
import PerInfoForm from "../models/PerInfoForm";
import ProForm from "../models/ProForm";
import AdditionalQuestionForm from "../models/addQuestionForm";

let BASE_URL =
  "http://127.0.0.1:4010/api/907.0940325025746/programs/quis/application-form";

export async function getApplicationForm() : Promise<[PerInfoForm, ProForm,  AdditionalQuestionForm[], string]>{
    const config = {
        method: 'get',
        url: BASE_URL
    };
  
    const response = await axios(config);

  const perInfoObj = response.data.data.attributes.personalInformation;
  const proObj = response.data.data.attributes.profile;
  const questionsArr = response.data.data.attributes.customisedQuestions;
  const coverImage = response.data.data.attributes.coverImage;


  return [new PerInfoForm({
    fName: {
      hideCheck: perInfoObj.firstName.show,
      internalCheck: perInfoObj.firstName.internalUse,
    },
    lName: {
      hideCheck: perInfoObj.lastName.show,
      internalCheck: perInfoObj.lastName.internalUse,
    },
    email: {
      hideCheck: perInfoObj.emailId.show,
      internalCheck: perInfoObj.emailId.internalUse,
    },
    phone: {
      hideCheck: perInfoObj.phoneNumber.show,
      internalCheck: perInfoObj.phoneNumber.internalUse,
    },
    nationality: {
      hideCheck: perInfoObj.emailId.show,
      internalCheck: perInfoObj.emailId.internalUse,
    },
    res: {
      hideCheck: perInfoObj.currentResidence.show,
      internalCheck: perInfoObj.currentResidence.internalUse,
    },
    idNum: {
      hideCheck: perInfoObj.idNumber.show,
      internalCheck: perInfoObj.idNumber.internalUse,
    },
    dob: {
      hideCheck: perInfoObj.dateOfBirth.show,
      internalCheck: perInfoObj.dateOfBirth.internalUse,
    },
    gender: {
      hideCheck: perInfoObj.gender.show,
      internalCheck: perInfoObj.gender.internalUse,
    },
    persQuestions: perInfoObj.personalQuestions.map((item: any) => new AdditionalQuestionForm({
        perType: item.type,
        perChoice: (item.choices as string[]).map((choice: string) => choice),
        perQuestion: item.question,
        perMaxNumOfChoices: item.maxChoice.toString(),
        perDisqualify: item.disqualify,
        perOther: item.other
        
    }, item.id))
  }),
  new ProForm({
    education: {hideCheck: proObj.education.show, mandatoryCheck: proObj.education.mandatory},
    exp: {hideCheck: proObj.experience.show, mandatoryCheck: proObj.experience.mandatory},
    resume: {hideCheck: proObj.resume.show, mandatoryCheck: proObj.resume.mandatory},
    proQuestions: proObj.profileQuestions.map((item: any) => new AdditionalQuestionForm({
        perType: undefined,
        proType: item.type,
        proChoice: (item.choices as string[]).map((choice) => choice),
        proQuestion: item.question,
        proMaxNumOfChoices: item.maxChoice.toString(),
        proDisqualify: item.disqualify,
        proOther: item.other
        
    }, item.id))
  }),
  questionsArr.map((item: any) => new AdditionalQuestionForm({
    perType: undefined,
    custQuestion: item.question,
    custChoice: (item.choices as string[]).map((choice: string) => choice),
    custType: item.type,
    custDisqualify: item.disqualify,
    custMaxNumOfChoices: item.maxChoice.toString(),
    custOther: item.other
}, item.id)),
coverImage
];
}

export async function postApplicationForm(multiformData: FormData){
    BASE_URL = "http://127.0.0.1:4010/api/101.17561234111884/programs/dolores/application-form";
    
    const response = await axios.put(BASE_URL, multiformData, {
        headers:{
            "Content-Type": "application/json",
        
        },

    });

  console.log(response.data.data);

  
}


