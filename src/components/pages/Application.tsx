import { useState, useContext, useEffect } from "react";

import { Strings } from "../../constants/Strings";
import { generateBase64FromImage } from "../../util/image";
import { INFO_FORM } from "../../util/helper/helper";

import ImageUploadForm from "../ApplicationForm/ImageUploadForm";
import Input from "../ui/Input";
import Button from "../ui/Button";
import PersonalInfoForm from "../ApplicationForm/PersonalInfoForm";
import QuestionsForm from "../QuestionsForm";
import SavedQuestion from "../SavedQuestion";
import { FormContext } from "../../store/form-context";
import MQForm from "../MultipleQuestions/MQForm";
import VideoQForm from "../VideoQuestion/VideoQuestionForm";
import Form from "../../models/addQuestionForm";
import ProfileForm from "../ApplicationForm/ProfileForm";
import { getApplicationForm, postApplicationForm } from "../../util/http";
import AdditionalQuestionForm from "../../models/addQuestionForm";
import CustomisedQuestionsForm from "../ApplicationForm/CustomisedQuestionsForm";

const initialState = {
  form: INFO_FORM,
  imagePreview: null,
  formIsValid: false,
};

export default function Application() {

  const [formData, setFormData] = useState<typeof initialState>(initialState);
  const [openProfileQuestionsForm, setOpenProfileQuestionsForm] = useState<
    boolean
  >(false);
  const [openPerInfoQuestionsForm, setOpenPerInfoQuestionsForm] = useState<
    boolean
  >(false);
  const [
    openPerInfoSavedQuestionsForm,
    setOpenPerInfoSavedQuestionsForm,
  ] = useState<boolean>(false);
  const [
    openProfileSavedQuestionsForm,
    setOpenProfileSavedQuestionsForm,
  ] = useState<boolean>(false);

  const formCtx = useContext(FormContext);

  //retrieving mockdate from prism mock server
  useEffect(() => {
    async function getAppData() {
      const [
        personalInfoForm,
        profileForm,
        customisedQuestionsArr,
        coverImage,
      ] = await getApplicationForm();
      console.log(personalInfoForm);
      setFormData((prevState: any) => ({
        ...prevState,
        imagePreview: coverImage,
        form: {
          ...prevState.form,
          fName: {
            ...prevState.form.fName,
            hide: personalInfoForm.form.fName.hideCheck,
            internal: personalInfoForm.form.fName.internalCheck,
            value: '',
          },
          lName: {
            ...prevState.form.lName,
            hide: personalInfoForm.form.lName.hideCheck,
            internal: personalInfoForm.form.lName.internalCheck,
            value: ''
          },
          email: {
            ...prevState.form.email,
            hide: personalInfoForm.form.email.hideCheck,
            internal: personalInfoForm.form.email.internalCheck,
            value: ''

          },
          phone: {
            ...prevState.form.phone,
            hide: personalInfoForm.form.phone.hideCheck,
            internal: personalInfoForm.form.phone.internalCheck,
            value: ''

          },
          nationality: {
            ...prevState.form.nationaity,
            hide: personalInfoForm.form.nationality.hideCheck,
            internal: personalInfoForm.form.nationality.internalCheck,
            value: ''

          },
          res: {
            ...prevState.form.res,
            hide: personalInfoForm.form.res.hideCheck,
            internal: personalInfoForm.form.res.internalCheck,
            value: ''

          },
          idNum: {
            ...prevState.form.idNum,
            hide: personalInfoForm.form.idNum.hideCheck,
            internal: personalInfoForm.form.idNum.internalCheck,
            value: ''

          },
          dob: {
            ...prevState.form.dob,
            hide: personalInfoForm.form.dob.hideCheck,
            internal: personalInfoForm.form.dob.internalCheck,
            value: ''

          },
          gender: {
            ...prevState.form.gender,
            hide: personalInfoForm.form.gender.hideCheck,
            internal: personalInfoForm.form.gender.internalCheck,
            value: ''

          },
          education: {
            ...prevState.form.education,
            hide: profileForm.form.education.hideCheck,
            mandatory: profileForm.form.education.mandatoryCheck,
            value: ''

          },
          experience: {
            ...prevState.form.experience,
            hide: profileForm.form.exp.hideCheck,
            mandatory: profileForm.form.exp.mandatoryCheck,
            value: ''

          },
          resume: {
            ...prevState.form.resume,
            hide: profileForm.form.resume.hideCheck,
            mandatory: profileForm.form.resume.mandatoryCheck,
            value: ''

          },
          personalQuestions: personalInfoForm.form.persQuestions,
          profileQuestions: profileForm.form.proQuestions,
          customisedQuestions: customisedQuestionsArr,
        },
      }));

      const updatedAdditionalQuestionArray = [
        ...personalInfoForm.form.persQuestions,
        ...profileForm.form.proQuestions,
      ];

      formCtx.updateGeneralForms(updatedAdditionalQuestionArray);
    }

    getAppData();
  }, []);

  function handleClick(form: string) {
    if (form === "profile") {
      setOpenProfileQuestionsForm(true);
    } else {
      setOpenPerInfoQuestionsForm(true);
    }
  }

  async function handleAction(input: {
    input: string;
    form: string;
    state: string;
    formId?: string;
  }) {
    //saving questions/choices in global store
    switch (input.input) {
      case "choice":
        if (input.state === "save") {
          if (input.form === "perInfo") {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perChoice: formData.form.choice.value,
                perQuestion: formData.form.question.value,
                perMaxNumOfChoices: formCtx.forms.maxNumOfChoices.toString(),
              })
            );
          } else {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: undefined,
                proType: formData.form.type.value,
                proChoice: formData.form.choice.value,
                proQuestion: formData.form.question.value,
                proMaxNumOfChoices: formCtx.forms.maxNumOfChoices.toString(),
              })
            );
          }
        }

        if (input.state === "edit") {
          if (input.form === "perInfo") {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perChoice: formData.form.choice.value,
                perQuestion: formData.form.question.value,
                perMaxNumOfChoices: formCtx.forms.maxNumOfChoices.toString(),
              }),
              input.formId!
            );
          } else {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: undefined,
                proType: formData.form.type.value,
                proChoice: formData.form.choice.value,
                proQuestion: formData.form.question.value,
                proMaxNumOfChoices: formCtx.forms.maxNumOfChoices.toString(),
              }),
              input.formId!
            );
          }
        }

        //clearing .input values of input fields
        setFormData((prevValue: any) => {
          const updatedForm = {
            ...prevValue.form,
            choice: {
              ...prevValue.form.choice,
              value: "",
            },
            question: {
              ...prevValue.form.question,
              value: "",
            },
            type: {
              ...prevValue.form.type,
              value: "",
            },
            maxNumOfChoices: {
              ...prevValue.form.maxNumOfChoices,
              value: "",
            },
          };
          return {
            ...prevValue,
            form: updatedForm,
          };
        });
        break;
      case "dropdown":
        if (input.state === "save") {
          if (input.form === "perInfo") {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perChoice: formData.form.choice.value,
                perQuestion: formData.form.question.value,
              })
            );
          } else {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: undefined,
                proType: formData.form.type.value,
                proChoice: formData.form.choice.value,
                proQuestion: formData.form.question.value,
              })
            );
          }
        }

        if (input.state === "edit") {
          if (input.form === "perInfo") {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perChoice: formData.form.choice.value,
                perQuestion: formData.form.question.value,
              }),
              input.formId!
            );
          } else {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: undefined,
                proType: formData.form.type.value,
                proChoice: formData.form.choice.value,
                proQuestion: formData.form.question.value,
              }),
              input.formId!
            );
          }
        }

        //clearing input values of input fields
        setFormData((prevValue: any) => {
          const updatedForm = {
            ...prevValue.form,
            choice: {
              ...prevValue.form.choice,
              value: "",
            },
            question: {
              ...prevValue.form.question,
              value: "",
            },
            type: {
              ...prevValue.form.type,
              value: "",
            },
          };
          return {
            ...prevValue,
            form: updatedForm,
          };
        });
        break;
      case "yes/no":
        if (input.state === "save") {
          if (input.form === "perInfo") {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perQuestion: formData.form.question.value,
              })
            );
          } else {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: undefined,
                proType: formData.form.type.value,
                proQuestion: formData.form.question.value,
              })
            );
          }
        }

        if (input.state === "edit") {
          if (input.form === "perInfo") {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perQuestion: formData.form.question.value,
              }),
              input.formId!
            );
          } else {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: undefined,
                proType: formData.form.type.value,
                proQuestion: formData.form.question.value,
              }),
              input.formId!
            );
          }
        }

        //clearing input values of input fields
        setFormData((prevValue: any) => {
          const updatedForm = {
            ...prevValue.form,
            question: {
              ...prevValue.form.question,
              value: "",
            },
            type: {
              ...prevValue.form.type,
              value: "",
            },
          };
          return {
            ...prevValue,
            form: updatedForm,
          };
        });
        break;

      case "video":
        if (input.state === "save") {
          if (input.form === "perInfo") {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perQuestion: formData.form.question.value,
                perDuration: formData.form.duration.value,
                perTime: formData.form.time.value,
                perAddInfo: formData.form.addInfo.value,
              })
            );
          } else {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                proType: formData.form.type.value,
                proQuestion: formData.form.question.value,
                proDuration: formData.form.duration.value,
                proTime: formData.form.time.value,
                proAddInfo: formData.form.addInfo.value,
              })
            );
          }
        }

        if (input.state === "edit") {
          if (input.form === "perInfo") {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perQuestion: formData.form.question.value,
                perDuration: formData.form.duration.value,
                perTime: formData.form.time.value,
                perAddInfo: formData.form.addInfo.value,
              }),
              input.formId!
            );
          } else {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                proType: formData.form.type.value,
                proQuestion: formData.form.question.value,
                proDuration: formData.form.duration.value,
                proTime: formData.form.time.value,
                proAddInfo: formData.form.addInfo.value,
              }),
              input.formId!
            );
          }
        }
        //clearing input values of input fields
        setFormData((prevValue: any) => {
          const updatedForm = {
            ...prevValue.form,
            addInfo: {
              ...prevValue.form.addInfo,
              value: "",
            },
            question: {
              ...prevValue.form.question,
              value: "",
            },
            type: {
              ...prevValue.form.type,
              value: "",
            },
            duration: {
              ...prevValue.form.duration,
              value: "",
            },
            time: {
              ...prevValue.form.time,
              value: "",
            },
          };
          return {
            ...prevValue,
            form: updatedForm,
          };
        });
        break;
      default:
        const questionsformData = {
          type: formData.form.type.value,
          question: formData.form.question.value,
        };

        if (input.state === "save") {
          if (input.form === "perInfo") {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perQuestion: formData.form.question.value,
              })
            );
          } else {
            formCtx.addForm(
              new AdditionalQuestionForm({
                perType: undefined,
                proType: formData.form.type.value,
                proQuestion: formData.form.question.value,
              })
            );
          }
        }

        if (input.state === "edit") {
          if (input.form === "perInfo") {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: formData.form.type.value,
                perQuestion: formData.form.question.value,
              }),
              input.formId!
            );
          } else {
            formCtx.editForm(
              new AdditionalQuestionForm({
                perType: undefined,
                proType: formData.form.type.value,
                proQuestion: formData.form.question.value,
              }),
              input.formId!
            );
          }
        }

        //clearing input values of input fields
        setFormData((prevValue: any) => {
          const updatedForm = {
            ...prevValue.form,
            question: {
              ...prevValue.form.question,
              value: "",
            },
            type: {
              ...prevValue.form.type,
              value: "",
            },
          };
          return {
            ...prevValue,
            form: updatedForm,
          };
        });
        break;
    }

    if (input.state === "edit") {
      //putting app data into server
      const formD = new FormData();
      formD.append("image", formData.imagePreview!);
      formD.append(
        "firstName",
        JSON.stringify({
          value: formData.form.fName.value,
          internal: formData.form.fName.internal,
          show: formData.form.fName.hide,
        })
      );
      formD.append(
        "lastName",
        JSON.stringify({
          value: formData.form.lName.value,
          internal: formData.form.lName.internal,
          show: formData.form.lName.hide,
        })
      );
      formD.append(
        "email",
        JSON.stringify({
          value: formData.form.email.value,
          internal: formData.form.email.internal,
          show: formData.form.email.hide,
        })
      );
      formD.append(
        "phone",
        JSON.stringify({
          value: formData.form.phone.value,
          internal: formData.form.phone.internal,
          show: formData.form.phone.hide,
        })
      );
      formD.append(
        "nationality",
        JSON.stringify({
          value: formData.form.nationality.value,
          internal: formData.form.nationality.internal,
          show: formData.form.nationality.hide,
        })
      );
      formD.append(
        "countryResidence",
        JSON.stringify({
          value: formData.form.res.value,
          internal: formData.form.res.internal,
          show: formData.form.res.hide,
        })
      );
      formD.append(
        "dateOfBirth",
        JSON.stringify({
          value: formData.form.dob.value,
          internal: formData.form.dob.internal,
          show: formData.form.dob.hide,
        })
      );
      formD.append(
        "gender",
        JSON.stringify({
          value: formData.form.gender.value,
          internal: formData.form.gender.internal,
          show: formData.form.gender.hide,
        })
      );
      formD.append(
        "education",
        JSON.stringify({
          value: formData.form.education.value,
          mandatory: formData.form.education.mandatory,
          show: formData.form.education.hide,
        })
      );
      formD.append(
        "resume",
        JSON.stringify({
          value: formData.form.resume.value,
          mandatory: formData.form.resume.mandatory,
          show: formData.form.resume.hide,
        })
      );
      formD.append(
        "idNUmber",
        JSON.stringify({
          value: formData.form.idNum.value,
          internal: formData.form.idNum.internal,
          show: formData.form.idNum.hide,
        })
      );
      formD.append(
        "personalQuestions",
        JSON.stringify(formData.form.personalQuestions)
      );
      formD.append(
        "profileQuestions",
        JSON.stringify(formData.form.profileQuestions)
      );
      formD.append(
        "customisedQuestions",
        JSON.stringify(formData.form.customisedQuestions)
      );

      await postApplicationForm(formD);
    }
    //closing question form
    if (input.form === "profile") {
      setOpenProfileQuestionsForm(false);
    } else {
      setOpenPerInfoQuestionsForm(false);
    }
  }

  const inputChangeHandler = (
    value: string,
    files: FileList | null,
    input: string
  ) => {
    if (files) {
      generateBase64FromImage(files[0])
        .then((b64: string | ArrayBuffer | null | undefined) => {
          if (!b64) {
            return;
          }
          setFormData((prevState: any) => ({
            ...prevState,
            imagePreview: b64,
          }));
        })
        .catch((e) => {
          setFormData((prevState: any) => ({
            ...prevState,
            imagePreview: null,
          }));
        });
    }
    setFormData((prevState: any) => {
      let isValid = true;
      console.log(prevState.form[input]);
      for (const validator of prevState.form[input].validators) {
        isValid = isValid && validator(value);
      }

      const updatedForm = {
        ...prevState.form,
        [input!]: {
          ...prevState.form[input!],
          valid: isValid,
          value: files ? files[0] : value,
        },
      };

      let formIsValid = true;
      for (const inputName in updatedForm) {
        formIsValid = formIsValid && updatedForm[inputName].valid;
      }

      return {
        ...prevState,
        form: updatedForm,
        formIsValid: formIsValid,
      };
    });

    if (value === "Dropdown" || value === "Multiple choice") {
      formCtx.resetFieldCount();
    }
  };

  const inputBlurHandler = (input: string, value?: string) => {
    setFormData((prevState: any) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          [input]: {
            ...prevState.form[input],
            touched: true,
          },
        },
      };
    });

    if (input === "maxNumOfChoices") {
      formCtx.increaseChoices(value!);
    }

    if (input === "maxNumOfChoices" && value === "1") {
      formCtx.resetFieldCount();
    }
  };

  return (
    <>
      <ImageUploadForm
        coverImageTitle={Strings.applUploadImage}
        imagePreview={formData!.imagePreview}
        id="image"
        handleFormData={setFormData}
        onChange={inputChangeHandler}
        onBlur={inputBlurHandler.bind(null, "image")}
        valid={formData.form["image"].valid}
        touched={formData.form["image"].touched}
      />
      <PersonalInfoForm perInfoTitle={Strings.appPersInfoTitle}>
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["fName"].valid}
          touched={formData.form["fName"].touched}
          onBlur={inputBlurHandler.bind(null, "fName")}
          internalChecked={formData.form["fName"].internal}
          hideChecked={formData.form["fName"].hide}
          type="text"
          extra={undefined}
          optionDefaultValue={undefined}
          control="default"
          notEntries={false}
          id="fName"
          onChange={inputChangeHandler}
          label="First Name"
          hasOptions={true}
          placeholder=""
          required={true}
          value={formData.form["fName"].value}
        />
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["lName"].valid}
          touched={formData.form["lName"].touched}
          onBlur={inputBlurHandler.bind(null, "lName")}
          type="text"
          id="lName"
          internalChecked={formData.form["lName"].internal}
          hideChecked={formData.form["lName"].hide}
          control="default"
          onChange={inputChangeHandler}
          optionDefaultValue={undefined}
          notEntries={false}
          extra={undefined}
          hasOptions={true}
          label="Last Name"
          placeholder=""
          required={true}
          value={formData.form["lName"].value}
        />
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["email"].valid}
          touched={formData.form["email"].touched}
          onBlur={inputBlurHandler.bind(null, "email")}
          type="text"
          internalChecked={formData.form["email"].internal}
          hideChecked={formData.form["email"].hide}
          id="email"
          extra={undefined}
          onChange={inputChangeHandler}
          optionDefaultValue={undefined}
          notEntries={false}
          control="default"
          label="Email"
          hasOptions={true}
          placeholder=""
          required={true}
          value={formData.form["email"].value}
        />
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["phone"].valid}
          touched={formData.form["phone"].touched}
          onBlur={inputBlurHandler.bind(null, "phone")}
          internalChecked={formData.form["phone"].internal}
          hideChecked={formData.form["phone"].hide}
          type="text"
          id="phone"
          onChange={inputChangeHandler}
          notEntries={false}
          extra=" (without dial code)"
          control="default"
          optionDefaultValue={undefined}
          label="Phone"
          placeholder=""
          hasOptions={true}
          required={true}
          value={formData.form["phone"].value}
        />
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["nationality"].valid}
          touched={formData.form["nationality"].touched}
          onBlur={inputBlurHandler.bind(null, "nationality")}
          type="text"
          id="nationality"
          internalChecked={formData.form["nationality"].internal}
          hideChecked={formData.form["nationality"].hide}
          onChange={inputChangeHandler}
          notEntries={false}
          control="default"
          label="Nationality"
          extra={undefined}
          placeholder=""
          optionDefaultValue={undefined}
          hasOptions={true}
          required={true}
          value={formData.form["nationality"].value}
        />
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["res"].valid}
          touched={formData.form["res"].touched}
          onBlur={inputBlurHandler.bind(null, "res")}
          type="text"
          id="res"
          onChange={inputChangeHandler}
          internalChecked={formData.form["res"].internal}
          hideChecked={formData.form["res"].hide}
          notEntries={false}
          label="Current Residence"
          control="default"
          extra={undefined}
          placeholder=""
          hasOptions={true}
          optionDefaultValue={undefined}
          required={true}
          value={formData.form["res"].value}
        />
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["idNum"].valid}
          touched={formData.form["idNum"].touched}
          onBlur={inputBlurHandler.bind(null, "idNum")}
          type="text"
          id="idNum"
          onChange={inputChangeHandler}
          internalChecked={formData.form["idNum"].internal}
          hideChecked={formData.form["idNum"].hide}
          notEntries={false}
          control="default"
          extra={undefined}
          optionDefaultValue={undefined}
          label="ID Number"
          placeholder=""
          hasOptions={true}
          required={true}
          value={formData.form["idNum"].value}
        />
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["dob"].valid}
          touched={formData.form["dob"].touched}
          onBlur={inputBlurHandler.bind(null, "dob")}
          notEntries={false}
          type="text"
          id="dob"
          optionDefaultValue={undefined}
          internalChecked={formData.form["dob"].internal}
          hideChecked={formData.form["dob"].hide}
          onChange={inputChangeHandler}
          label="Date of Birth"
          control="default"
          extra={undefined}
          placeholder=""
          hasOptions={true}
          required={true}
          value={formData.form["dob"].value}
        />
        <Input
          checkboxLabel="Internal"
          switchLabel="Show"
          valid={formData.form["gender"].valid}
          touched={formData.form["gender"].touched}
          onBlur={inputBlurHandler.bind(null, "gender")}
          internalChecked={formData.form["gender"].internal}
          hideChecked={formData.form["gender"].hide}
          notEntries={false}
          type="text"
          id="gender"
          optionDefaultValue={undefined}
          onChange={inputChangeHandler}
          control="default"
          label="Gender"
          placeholder=""
          extra={undefined}
          hasOptions={true}
          required={true}
          value={formData.form["gender"].value}
        />
        {formCtx.forms.generalForms.map((item, index) => {
          return !openPerInfoSavedQuestionsForm && item.form.perType ? (
            <SavedQuestion
              key={index}
              type={item.form.perType!}
              question={item.form.perQuestion!}
              onOpen={() => setOpenPerInfoSavedQuestionsForm(true)}
            />
          ) : item.form.perType === "Yes/No" &&
            openPerInfoSavedQuestionsForm ? (
            <QuestionsForm
              key={index}
              isEditing={true}
              isParagraph={false}
              validQ={true}
              validT={true}
              touchedQ={true}
              touchedT={true}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeT={inputChangeHandler}
              valueQ={item.form.perQuestion!}
              valueT={item.form.perType}
              onDelete={() => {
                formCtx.removeForm(item.id);
                handleAction({
                  input: "yes/no",
                  form: "perInfo",
                  state: "delete",
                });
              }}
              onSave={() => {
                handleAction({
                  input: "yes/no",
                  form: "perInfo",
                  state: "edit",
                  formId: item.id,
                });
              }}
            />
          ) : item.form.perType === "Multiple choice" &&
            openPerInfoSavedQuestionsForm ? (
            <MQForm
              key={index}
              validQ={false}
              validC={false}
              validMC={false}
              validT={false}
              touchedQ={false}
              touchedC={false}
              touchedMC={false}
              touchedT={false}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurC={inputBlurHandler.bind(null, "choice")}
              onBlurMC={inputBlurHandler.bind(null, "maxNumOfChoices")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeC={inputChangeHandler}
              onChangeMC={inputChangeHandler}
              onChangeT={inputChangeHandler}
              isEditing={true}
              notDropdown={true}
              valueQ={item.form.perQuestion!}
              valueT={item.form.perType}
              valueC={item.form.perChoice! as string}
              valueMC={item.form.perMaxNumOfChoices!}
              onDelete={() => {
                formCtx.removeForm(item.id);
                handleAction({
                  input: "choice",
                  form: "perInfo",
                  state: "delete",
                });
              }}
              onSave={() =>
                handleAction({
                  input: "choice",
                  form: "perInfo",
                  state: "edit",
                  formId: item.id,
                })
              }
            />
          ) : item.form.perType === "Dropdown" &&
            openPerInfoSavedQuestionsForm ? (
            <MQForm
              key={index}
              validQ={false}
              validC={false}
              validMC={false}
              validT={false}
              touchedQ={false}
              touchedC={false}
              touchedMC={false}
              touchedT={false}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurC={inputBlurHandler.bind(null, "choice")}
              onBlurMC={inputBlurHandler.bind(null, "maxNumOfChoices")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeC={inputChangeHandler}
              onChangeMC={inputChangeHandler}
              onChangeT={inputChangeHandler}
              isEditing={true}
              notDropdown={false}
              valueQ={item.form.perQuestion!}
              valueT={item.form.perType}
              valueC={item.form.perChoice! as string}
              valueMC={item.form.perMaxNumOfChoices!}
              onDelete={() => {
                formCtx.removeForm(item.id);
                handleAction({
                  input: "dropdown",
                  form: "perInfo",
                  state: "delete",
                });
              }}
              onSave={() =>
                handleAction({
                  input: "dropdown",
                  form: "perInfo",
                  state: "edit",
                  formId: item.id,
                })
              }
            />
          ) : item.form.perType === "Video question" &&
            openPerInfoSavedQuestionsForm ? (
            <VideoQForm
              key={index}
              validQ={false}
              validD={false}
              validAI={false}
              validT={false}
              validDT={false}
              touchedQ={false}
              touchedD={false}
              touchedAI={false}
              touchedT={false}
              touchedDT={false}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurAI={inputBlurHandler.bind(null, "addInfo")}
              onBlurD={inputBlurHandler.bind(null, "duration")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onBlurDT={inputBlurHandler.bind(null, "time")}
              onChangeQ={inputChangeHandler}
              onChangeD={inputChangeHandler}
              onChangeAI={inputChangeHandler}
              onChangeT={inputChangeHandler}
              onChangeDT={inputChangeHandler}
              isEditing={true}
              valueQ={item.form.perQuestion!}
              valueT={item.form.perType}
              valueD={item.form.perDuration!.toString()}
              valueAI={item.form.perAddInfo!}
              valueDT={item.form.perTime!}
              onDelete={() => {
                formCtx.removeForm(item.id);
                handleAction({
                  input: "video",
                  form: "perInfo",
                  state: "delete",
                });
              }}
              onSave={() =>
                handleAction({
                  input: "video",
                  form: "perInfo",
                  state: "edit",
                  formId: item.id,
                })
              }
            />
          ) : (
            openPerInfoSavedQuestionsForm && (
              <QuestionsForm
                key={index}
                validQ={false}
                validT={false}
                touchedQ={false}
                touchedT={false}
                onBlurQ={inputBlurHandler.bind(null, "question")}
                onBlurT={inputBlurHandler.bind(null, "type")}
                onChangeQ={inputChangeHandler}
                onChangeT={inputChangeHandler}
                isEditing={true}
                isParagraph={true}
                valueQ={item.form.perQuestion!}
                valueT={item.form.perType!}
                onDelete={() => {
                  formCtx.removeForm(item.id);
                  handleAction({
                    input: "",
                    form: "perInfo",
                    state: "delete",
                  });
                }}
                onSave={() =>
                  handleAction({
                    input: "",
                    form: "perInfo",
                    state: "edit",
                    formId: item.id,
                  })
                }
              />
            )
          );
        })}
        {openPerInfoQuestionsForm &&
        formData.form["type"].value === "Multiple choice" ? (
          <MQForm
            validQ={formData.form["question"].valid}
            validC={formData.form["choice"].valid}
            validMC={formData.form["maxNumOfChoices"].valid}
            validT={formData.form["type"].valid}
            touchedQ={formData.form["question"].touched}
            touchedC={formData.form["choice"].touched}
            touchedMC={formData.form["maxNumOfChoices"].touched}
            touchedT={formData.form["type"].touched}
            onBlurQ={inputBlurHandler.bind(null, "question")}
            onBlurC={inputBlurHandler.bind(null, "choice")}
            onBlurMC={() =>
              inputBlurHandler(
                "maxNumOfChoices",
                formData.form["maxNumOfChoices"].value
              )
            }
            onBlurT={inputBlurHandler.bind(null, "type")}
            onChangeQ={inputChangeHandler}
            onChangeC={inputChangeHandler}
            onChangeMC={inputChangeHandler}
            onChangeT={inputChangeHandler}
            isEditing={false}
            notDropdown={true}
            valueQ={formData.form["question"].value}
            valueT={formData.form["type"].value}
            valueC={formData.form["choice"].value}
            valueMC={formData.form["maxNumOfChoices"].value}
            onDelete={() => {
              handleAction({
                input: "choice",
                form: "perInfo",
                state: "delete",
              });
            }}
            onSave={() => {
              handleAction({ input: "choice", form: "perInfo", state: "save" });
            }}
          />
        ) : openPerInfoQuestionsForm &&
          formData.form["type"].value === "Dropdown" ? (
          <MQForm
            validQ={formData.form["question"].valid}
            validC={formData.form["choice"].valid}
            validMC={formData.form["maxNumOfChoices"].valid}
            validT={formData.form["type"].valid}
            touchedQ={formData.form["question"].touched}
            touchedC={formData.form["choice"].touched}
            touchedMC={formData.form["maxNumOfChoices"].touched}
            touchedT={formData.form["type"].touched}
            onBlurQ={inputBlurHandler.bind(null, "question")}
            onBlurC={inputBlurHandler.bind(null, "choice")}
            onBlurMC={inputBlurHandler.bind(null, "maxNumOfChoices")}
            onBlurT={inputBlurHandler.bind(null, "type")}
            onChangeQ={inputChangeHandler}
            onChangeC={inputChangeHandler}
            onChangeMC={inputChangeHandler}
            onChangeT={inputChangeHandler}
            isEditing={false}
            notDropdown={false}
            valueQ={formData.form["question"].value}
            valueT={formData.form["type"].value}
            valueC={formData.form["choice"].value}
            valueMC={formData.form["maxNumOfChoices"].value}
            onDelete={() => {
              handleAction({
                input: "dropdown",
                form: "perInfo",
                state: "delete",
              });
            }}
            onSave={() => {
              handleAction({
                input: "dropdown",
                form: "perInfo",
                state: "save",
              });
            }}
          />
        ) : openPerInfoQuestionsForm &&
          formData.form["type"].value === "Video question" ? (
          <VideoQForm
            validQ={formData.form["question"].valid}
            validD={formData.form["duration"].valid}
            validAI={formData.form["addInfo"].valid}
            validT={formData.form["type"].valid}
            validDT={formData.form["time"].valid}
            touchedQ={formData.form["question"].touched}
            touchedD={formData.form["duration"].touched}
            touchedAI={formData.form["addInfo"].touched}
            touchedT={formData.form["type"].touched}
            touchedDT={formData.form["time"].touched}
            onBlurQ={inputBlurHandler.bind(null, "question")}
            onBlurAI={inputBlurHandler.bind(null, "addInfo")}
            onBlurD={inputBlurHandler.bind(null, "duration")}
            onBlurT={inputBlurHandler.bind(null, "type")}
            onBlurDT={inputBlurHandler.bind(null, "time")}
            onChangeQ={inputChangeHandler}
            onChangeD={inputChangeHandler}
            onChangeAI={inputChangeHandler}
            onChangeT={inputChangeHandler}
            onChangeDT={inputChangeHandler}
            isEditing={false}
            valueQ={formData.form["question"].value}
            valueT={formData.form["type"].value}
            valueD={formData.form["duration"].value.toString()}
            valueAI={formData.form["addInfo"].value}
            valueDT={formData.form["time"].value}
            onDelete={() => {
              handleAction({
                input: "video",
                form: "perInfo",
                state: "delete",
              });
            }}
            onSave={() => {
              handleAction({ input: "video", form: "perInfo", state: "save" });
            }}
          />
        ) : openPerInfoQuestionsForm &&
          formData.form["type"].value === "Yes/No" ? (
          <QuestionsForm
            validQ={formData.form["question"].valid}
            validT={formData.form["type"].valid}
            touchedQ={formData.form["question"].touched}
            touchedT={formData.form["type"].touched}
            onBlurQ={inputBlurHandler.bind(null, "question")}
            onBlurT={inputBlurHandler.bind(null, "type")}
            onChangeQ={inputChangeHandler}
            onChangeT={inputChangeHandler}
            isEditing={false}
            isParagraph={false}
            valueQ={formData.form["question"].value}
            valueT={formData.form["type"].value}
            onDelete={() => {
              handleAction({
                input: "yes/no",
                form: "perInfo",
                state: "delete",
              });
            }}
            onSave={() => {
              handleAction({ input: "yes/no", form: "perInfo", state: "save" });
            }}
          />
        ) : (
          openPerInfoQuestionsForm && (
            <QuestionsForm
              validQ={formData.form["question"].valid}
              validT={formData.form["type"].valid}
              touchedQ={formData.form["question"].touched}
              touchedT={formData.form["type"].touched}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeT={inputChangeHandler}
              isEditing={false}
              isParagraph={true}
              valueQ={formData.form["question"].value}
              valueT={formData.form["type"].value}
              onDelete={() => {
                handleAction({ input: "", form: "perInfo", state: "delete" });
              }}
              onSave={() => {
                handleAction({ input: "", form: "perInfo", state: "save" });
              }}
            />
          )
        )}
        <Button
          mode="flat"
          iconColor="#2196F3"
          icon="fa-plus"
          hasIcon={true}
          design="accent"
          onClick={handleClick.bind(null, "perInfo")}
          type="button"
          disabled={false}
          link={undefined}
          loading={false}
        >
          {formData.form["type"].value === "Video question"
            ? "Add video interview questions"
            : "Add a question"}
        </Button>
      </PersonalInfoForm>
      <ProfileForm profileTitle={Strings.appProfileTitle}>
        <Input
          checkboxLabel="Mandatory"
          switchLabel="Show"
          valid={formData.form["education"].valid}
          touched={formData.form["education"].touched}
          onBlur={inputBlurHandler.bind(null, "education")}
          type="text"
          id="education"
          onChange={inputChangeHandler}
          mandatoryChecked={formData.form.education.mandatory}
          hideChecked={formData.form.education.hide}
          notEntries={false}
          extra={undefined}
          control="default"
          optionDefaultValue={undefined}
          label="Education"
          placeholder=""
          hasOptions={true}
          required={true}
          value={formData.form["education"].value}
        />
        <Input
          checkboxLabel="Mandatory"
          switchLabel="Show"
          valid={formData.form["experience"].valid}
          touched={formData.form["experience"].touched}
          onBlur={inputBlurHandler.bind(null, "experience")}
          type="text"
          id="experience"
          onChange={inputChangeHandler}
          mandatoryChecked={formData.form.experience.mandatory}
          hideChecked={formData.form.experience.hide}
          notEntries={false}
          control="default"
          label="Experience"
          extra={undefined}
          placeholder=""
          optionDefaultValue={undefined}
          hasOptions={true}
          required={true}
          value={formData.form["experience"].value}
        />
        <Input
          checkboxLabel="Mandatory"
          switchLabel="Show"
          valid={formData.form["resume"].valid}
          touched={formData.form["resume"].touched}
          onBlur={inputBlurHandler.bind(null, "resume")}
          type="text"
          id="resume"
          onChange={inputChangeHandler}
          mandatoryChecked={formData.form.resume.mandatory}
          hideChecked={formData.form.resume.hide}
          notEntries={false}
          label="Resume"
          control="default"
          extra={undefined}
          placeholder=""
          hasOptions={true}
          optionDefaultValue={undefined}
          required={true}
          value={formData.form["resume"].value}
        />
        {formCtx.forms.generalForms.map((item, index) => {
          return !openProfileSavedQuestionsForm && item.form.proType ? (
            <SavedQuestion
              key={index}
              type={item.form.proType!}
              question={item.form.proQuestion!}
              onOpen={() => setOpenProfileSavedQuestionsForm(true)}
            />
          ) : item.form.proType === "Yes/No" &&
            openProfileSavedQuestionsForm ? (
            <QuestionsForm
              key={index}
              isEditing={true}
              isParagraph={false}
              validQ={true}
              validT={true}
              touchedQ={true}
              touchedT={true}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeT={inputChangeHandler}
              valueQ={item.form.proQuestion!}
              valueT={item.form.proType}
              onDelete={() => {
                formCtx.removeForm(item.id);
                handleAction({
                  input: "yes/no",
                  form: "profile",
                  state: "delete",
                });
              }}
              onSave={() => {
                handleAction({
                  input: "yes/no",
                  form: "profile",
                  state: "edit",
                  formId: item.id,
                });
              }}
            />
          ) : item.form.proType === "Multiple choice" &&
            openProfileSavedQuestionsForm ? (
            <MQForm
              key={index}
              validQ={false}
              validC={false}
              validMC={false}
              validT={false}
              touchedQ={false}
              touchedC={false}
              touchedMC={false}
              touchedT={false}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurC={inputBlurHandler.bind(null, "choice")}
              onBlurMC={inputBlurHandler.bind(null, "maxNumOfChoices")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeC={inputChangeHandler}
              onChangeMC={inputChangeHandler}
              onChangeT={inputChangeHandler}
              isEditing={true}
              notDropdown={true}
              valueQ={item.form.proQuestion!}
              valueT={item.form.proType}
              valueC={item.form.proChoice! as string}
              valueMC={item.form.proMaxNumOfChoices!}
              onDelete={() => {
                formCtx.removeForm(item.id);
                handleAction({
                  input: "choice",
                  form: "profile",
                  state: "delete",
                });
              }}
              onSave={() =>
                handleAction({
                  input: "choice",
                  form: "profile",
                  state: "edit",
                  formId: item.id,
                })
              }
            />
          ) : item.form.proType === "Dropdown" &&
            openProfileSavedQuestionsForm ? (
            <MQForm
              key={index}
              validQ={false}
              validC={false}
              validMC={false}
              validT={false}
              touchedQ={false}
              touchedC={false}
              touchedMC={false}
              touchedT={false}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurC={inputBlurHandler.bind(null, "choice")}
              onBlurMC={inputBlurHandler.bind(null, "maxNumOfChoices")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeC={inputChangeHandler}
              onChangeMC={inputChangeHandler}
              onChangeT={inputChangeHandler}
              isEditing={true}
              notDropdown={false}
              valueQ={item.form.proQuestion!}
              valueT={item.form.proType}
              valueC={item.form.proChoice! as string}
              valueMC={item.form.proMaxNumOfChoices!}
              onDelete={() => {
                formCtx.removeForm(item.id);
                handleAction({
                  input: "dropdown",
                  form: "profile",
                  state: "delete",
                });
              }}
              onSave={() =>
                handleAction({
                  input: "dropdown",
                  form: "profile",
                  state: "edit",
                  formId: item.id,
                })
              }
            />
          ) : item.form.proType === "Video question" &&
            openProfileSavedQuestionsForm ? (
            <VideoQForm
              key={index}
              validQ={false}
              validD={false}
              validAI={false}
              validT={false}
              validDT={false}
              touchedQ={false}
              touchedD={false}
              touchedAI={false}
              touchedT={false}
              touchedDT={false}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurAI={inputBlurHandler.bind(null, "addInfo")}
              onBlurD={inputBlurHandler.bind(null, "duration")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onBlurDT={inputBlurHandler.bind(null, "time")}
              onChangeQ={inputChangeHandler}
              onChangeD={inputChangeHandler}
              onChangeAI={inputChangeHandler}
              onChangeT={inputChangeHandler}
              onChangeDT={inputChangeHandler}
              isEditing={true}
              valueQ={item.form.proQuestion!}
              valueT={item.form.proType}
              valueD={item.form.proDuration!.toString()}
              valueAI={item.form.proAddInfo!}
              valueDT={item.form.proTime!}
              onDelete={() => {
                formCtx.removeForm(item.id);
                handleAction({
                  input: "video",
                  form: "profile",
                  state: "delete",
                });
              }}
              onSave={() =>
                handleAction({
                  input: "video",
                  form: "profile",
                  state: "edit",
                  formId: item.id,
                })
              }
            />
          ) : (
            openProfileQuestionsForm && (
              <QuestionsForm
                key={index}
                validQ={false}
                validT={false}
                touchedQ={false}
                touchedT={false}
                onBlurQ={inputBlurHandler.bind(null, "question")}
                onBlurT={inputBlurHandler.bind(null, "type")}
                onChangeQ={inputChangeHandler}
                onChangeT={inputChangeHandler}
                isEditing={true}
                isParagraph={true}
                valueQ={item.form.proQuestion!}
                valueT={item.form.proType!}
                onDelete={() => {
                  formCtx.removeForm(item.id);
                  handleAction({
                    input: "",
                    form: "profile",
                    state: "delete",
                  });
                }}
                onSave={() =>
                  handleAction({
                    input: "",
                    form: "profile",
                    state: "edit",
                    formId: item.id,
                  })
                }
              />
            )
          );
        })}
        {openProfileQuestionsForm &&
        formData.form["type"].value === "Multiple choice" ? (
          <MQForm
            validQ={formData.form["question"].valid}
            validC={formData.form["choice"].valid}
            validMC={formData.form["maxNumOfChoices"].valid}
            validT={formData.form["type"].valid}
            touchedQ={formData.form["question"].touched}
            touchedC={formData.form["choice"].touched}
            touchedMC={formData.form["maxNumOfChoices"].touched}
            touchedT={formData.form["type"].touched}
            onBlurQ={inputBlurHandler.bind(null, "question")}
            onBlurC={inputBlurHandler.bind(null, "choice")}
            onBlurMC={() =>
              inputBlurHandler(
                "maxNumOfChoices",
                formData.form["maxNumOfChoices"].value
              )
            }
            onBlurT={inputBlurHandler.bind(null, "type")}
            onChangeQ={inputChangeHandler}
            onChangeC={inputChangeHandler}
            onChangeMC={inputChangeHandler}
            onChangeT={inputChangeHandler}
            isEditing={false}
            notDropdown={true}
            valueQ={formData.form["question"].value}
            valueT={formData.form["type"].value}
            valueC={formData.form["choice"].value}
            valueMC={formData.form["maxNumOfChoices"].value}
            onDelete={() => {
              handleAction({
                input: "choice",
                form: "profile",
                state: "delete",
              });
            }}
            onSave={() => {
              handleAction({ input: "choice", form: "profile", state: "save" });
            }}
          />
        ) : openProfileQuestionsForm &&
          formData.form["type"].value === "Dropdown" ? (
          <MQForm
            validQ={formData.form["question"].valid}
            validC={formData.form["choice"].valid}
            validMC={formData.form["maxNumOfChoices"].valid}
            validT={formData.form["type"].valid}
            touchedQ={formData.form["question"].touched}
            touchedC={formData.form["choice"].touched}
            touchedMC={formData.form["maxNumOfChoices"].touched}
            touchedT={formData.form["type"].touched}
            onBlurQ={inputBlurHandler.bind(null, "question")}
            onBlurC={inputBlurHandler.bind(null, "choice")}
            onBlurMC={inputBlurHandler.bind(null, "maxNumOfChoices")}
            onBlurT={inputBlurHandler.bind(null, "type")}
            onChangeQ={inputChangeHandler}
            onChangeC={inputChangeHandler}
            onChangeMC={inputChangeHandler}
            onChangeT={inputChangeHandler}
            isEditing={false}
            notDropdown={false}
            valueQ={formData.form["question"].value}
            valueT={formData.form["type"].value}
            valueC={formData.form["choice"].value}
            valueMC={formData.form["maxNumOfChoices"].value}
            onDelete={() => {
              handleAction({
                input: "dropdown",
                form: "profile",
                state: "delete",
              });
            }}
            onSave={() => {
              handleAction({
                input: "dropdown",
                form: "profile",
                state: "save",
              });
            }}
          />
        ) : openProfileQuestionsForm &&
          formData.form["type"].value === "Video question" ? (
          <VideoQForm
            validQ={formData.form["question"].valid}
            validD={formData.form["duration"].valid}
            validAI={formData.form["addInfo"].valid}
            validT={formData.form["type"].valid}
            validDT={formData.form["time"].valid}
            touchedQ={formData.form["question"].touched}
            touchedD={formData.form["duration"].touched}
            touchedAI={formData.form["addInfo"].touched}
            touchedT={formData.form["type"].touched}
            touchedDT={formData.form["time"].touched}
            onBlurQ={inputBlurHandler.bind(null, "question")}
            onBlurAI={inputBlurHandler.bind(null, "addInfo")}
            onBlurD={inputBlurHandler.bind(null, "duration")}
            onBlurT={inputBlurHandler.bind(null, "type")}
            onBlurDT={inputBlurHandler.bind(null, "time")}
            onChangeQ={inputChangeHandler}
            onChangeD={inputChangeHandler}
            onChangeAI={inputChangeHandler}
            onChangeT={inputChangeHandler}
            onChangeDT={inputChangeHandler}
            isEditing={false}
            valueQ={formData.form["question"].value}
            valueT={formData.form["type"].value}
            valueD={formData.form["duration"].value.toString()}
            valueAI={formData.form["addInfo"].value}
            valueDT={formData.form["time"].value}
            onDelete={() => {
              handleAction({
                input: "video",
                form: "profile",
                state: "delete",
              });
            }}
            onSave={() => {
              handleAction({ input: "video", form: "profile", state: "save" });
            }}
          />
        ) : openProfileQuestionsForm &&
          formData.form["type"].value === "Yes/No" ? (
          <QuestionsForm
            validQ={formData.form["question"].valid}
            validT={formData.form["type"].valid}
            touchedQ={formData.form["question"].touched}
            touchedT={formData.form["type"].touched}
            onBlurQ={inputBlurHandler.bind(null, "question")}
            onBlurT={inputBlurHandler.bind(null, "type")}
            onChangeQ={inputChangeHandler}
            onChangeT={inputChangeHandler}
            isEditing={false}
            isParagraph={false}
            valueQ={formData.form["question"].value}
            valueT={formData.form["type"].value}
            onDelete={() => {
              handleAction({
                input: "yes/no",
                form: "profile",
                state: "delete",
              });
            }}
            onSave={() => {
              handleAction({ input: "yes/no", form: "profile", state: "save" });
            }}
          />
        ) : (
          openProfileQuestionsForm && (
            <QuestionsForm
              validQ={formData.form["question"].valid}
              validT={formData.form["type"].valid}
              touchedQ={formData.form["question"].touched}
              touchedT={formData.form["type"].touched}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeT={inputChangeHandler}
              isEditing={false}
              isParagraph={true}
              valueQ={formData.form["question"].value}
              valueT={formData.form["type"].value}
              onDelete={() => {
                handleAction({ input: "", form: "profile", state: "delete" });
              }}
              onSave={() => {
                handleAction({ input: "", form: "profile", state: "save" });
              }}
            />
          )
        )}
        <Button
          mode="flat"
          iconColor="#2196F3"
          icon="fa-plus"
          hasIcon={true}
          design="accent"
          onClick={handleClick.bind(null, "profile")}
          type="button"
          disabled={false}
          link={undefined}
          loading={false}
        >
          Add a question
        </Button>
      </ProfileForm>
      <CustomisedQuestionsForm
        custQuestionTitle={Strings.appCustomisedQuestionsTile}
        customisedQArray={formData.form.customisedQuestions}
        onOpen={() => {}}
      />
    </>
  );
}
