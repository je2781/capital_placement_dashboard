import { useState, useContext } from "react";

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
import Form from "../../models/Form";

const initialState = {
  form: INFO_FORM,
  imagePreview: null,
  formIsValid: false,
};

export default function Application() {
  const [formData, setFormData] = useState<typeof initialState>(initialState);
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [openSavedQuestionForm, setOpenSavedQuestionForm] = useState<boolean>(
    false
  );
  const formCtx = useContext(FormContext);

  function handleClick() {
    setOpenForm(true);
  }

  function handleDeleteQuestion(input: { question: string; type: string }) {
    setFormData((prevValue: any) => {
      const updatedForm = {
        ...prevValue.form,
        [input.question]: {
          ...prevValue.form[input.question],
          value: "",
        },
        [input.type]: {
          ...prevValue.form[input.type],
          value: "",
        },
      };
      return {
        ...prevValue,
        form: updatedForm,
      };
    });

    setOpenForm(false);
  }

  function handleSave(input: string) {
    //saving questions/choices in global store
    switch (input) {
      case "choice":
        formCtx.addForm(
          new Form({
            type: formData.form.type.value,
            choice: formData.form.choice.value,
            question: formData.form.question.value,
            maxNumOfChoices: formCtx.forms.maxNumOfChoices.toString(),
          })
        );
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
        formCtx.addForm(
          new Form({
            type: formData.form.type.value,
            choice: formData.form.choice.value,
            question: formData.form.question.value,
          })
        );
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
            }
          };
          return {
            ...prevValue,
            form: updatedForm,
          };
        });
        break;
      case "yes/no":
        formCtx.addForm(
          new Form({
            type: formData.form.type.value,
            question: formData.form.question.value,
          })
        );

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

      case "videoQ":
        formCtx.addForm(
          new Form({
            type: formData.form.type.value,
            question: formData.form.question.value,
            addInfo: formData.form.addInfo.value,
            duration: formData.form.duration.value,
            time: formData.form.time.value,
          })
        );
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
        formCtx.addForm(
          new Form({
            type: questionsformData.type,
            question: questionsformData.question,
          })
        );

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

    //closing question form
    setOpenForm(false);
  }

  function handleEdit(id: string) {
    const questionsFormData = {
      type: formData.form.type.value,
      question: formData.form.question.value,
    };

    formCtx.editForm(
      new Form({
        type: questionsFormData.type,
        question: questionsFormData.question,
      }),
      id
    );
    setOpenSavedQuestionForm(false);
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
          valid={formData.form["fName"].valid}
          touched={formData.form["fName"].touched}
          onBlur={inputBlurHandler.bind(null, "fName")}
          type="text"
          extra={undefined}
          optionDefaultValue={undefined}
          control=""
          notEntries={false}
          id="fName"
          onChange={inputChangeHandler}
          label="First Name"
          hasOptions={false}
          placeholder=""
          required={true}
          value={formData.form["fName"].value}
        />
        <Input
          valid={formData.form["lName"].valid}
          touched={formData.form["lName"].touched}
          onBlur={inputBlurHandler.bind(null, "lName")}
          type="text"
          id="lName"
          control=""
          onChange={inputChangeHandler}
          optionDefaultValue={undefined}
          notEntries={false}
          extra={undefined}
          hasOptions={false}
          label="Last Name"
          placeholder=""
          required={true}
          value={formData.form["lName"].value}
        />
        <Input
          valid={formData.form["email"].valid}
          touched={formData.form["email"].touched}
          onBlur={inputBlurHandler.bind(null, "email")}
          type="text"
          id="email"
          extra={undefined}
          onChange={inputChangeHandler}
          optionDefaultValue={undefined}
          notEntries={false}
          control=""
          label="Email"
          hasOptions={false}
          placeholder=""
          required={true}
          value={formData.form["email"].value}
        />
        <Input
          valid={formData.form["phone"].valid}
          touched={formData.form["phone"].touched}
          onBlur={inputBlurHandler.bind(null, "phone")}
          type="text"
          id="phone"
          onChange={inputChangeHandler}
          notEntries={false}
          extra=" (without dial code)"
          control=""
          optionDefaultValue={undefined}
          label="Phone"
          placeholder=""
          hasOptions={true}
          required={true}
          value={formData.form["phone"].value}
        />
        <Input
          valid={formData.form["nationality"].valid}
          touched={formData.form["nationality"].touched}
          onBlur={inputBlurHandler.bind(null, "nationality")}
          type="text"
          id="nationality"
          onChange={inputChangeHandler}
          notEntries={false}
          control=""
          label="Nationality"
          extra={undefined}
          placeholder=""
          optionDefaultValue={undefined}
          hasOptions={true}
          required={true}
          value={formData.form["nationality"].value}
        />
        <Input
          valid={formData.form["res"].valid}
          touched={formData.form["res"].touched}
          onBlur={inputBlurHandler.bind(null, "res")}
          type="text"
          id="res"
          onChange={inputChangeHandler}
          notEntries={false}
          label="Current Residence"
          control=""
          extra={undefined}
          placeholder=""
          hasOptions={true}
          optionDefaultValue={undefined}
          required={true}
          value={formData.form["res"].value}
        />
        <Input
          valid={formData.form["idNum"].valid}
          touched={formData.form["idNum"].touched}
          onBlur={inputBlurHandler.bind(null, "idNum")}
          type="text"
          id="idNum"
          onChange={inputChangeHandler}
          notEntries={false}
          control=""
          extra={undefined}
          optionDefaultValue={undefined}
          label="ID Number"
          placeholder=""
          hasOptions={true}
          required={true}
          value={formData.form["idNum"].value}
        />
        <Input
          valid={formData.form["dob"].valid}
          touched={formData.form["dob"].touched}
          onBlur={inputBlurHandler.bind(null, "dob")}
          notEntries={false}
          type="text"
          id="dob"
          optionDefaultValue={undefined}
          onChange={inputChangeHandler}
          label="Date of Birth"
          control=""
          extra={undefined}
          placeholder=""
          hasOptions={true}
          required={true}
          value={formData.form["dob"].value}
        />
        <Input
          valid={formData.form["gender"].valid}
          touched={formData.form["gender"].touched}
          onBlur={inputBlurHandler.bind(null, "gender")}
          notEntries={false}
          type="text"
          id="gender"
          optionDefaultValue={undefined}
          onChange={inputChangeHandler}
          control=""
          label="Gender"
          placeholder=""
          extra={undefined}
          hasOptions={true}
          required={true}
          value={formData.form["gender"].value}
        />
        {formCtx.forms.generalForm.map((item, index) => {
          return !openSavedQuestionForm ? (
            <SavedQuestion
              key={index}
              type={item.form.type!}
              question={item.form.question!}
              onOpen={() => setOpenSavedQuestionForm(true)}
            />
          ) : item.form.type === "Yes/No" && openSavedQuestionForm ? (
            <QuestionsForm
              key={index}
              isEditing={true}
              isParagraph={false}
              validQ={false}
              validT={false}
              touchedQ={false}
              touchedT={false}
              onBlurQ={inputBlurHandler.bind(null, "question")}
              onBlurT={inputBlurHandler.bind(null, "type")}
              onChangeQ={inputChangeHandler}
              onChangeT={inputChangeHandler}
              valueQ={item.form.question!}
              valueT={item.form.type}
              onDelete={() => {
                formCtx.removeForm(item.id);
              }}
              onSave={handleEdit.bind(null, item.id)}
            />
          ) : item.form.type === "Multiple choice" && openSavedQuestionForm ? (
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
              valueQ={item.form.question!}
              valueT={item.form.type}
              valueC={item.form.choice!}
              valueMC={item.form.maxNumOfChoices!}
              onDelete={() => formCtx.removeForm(item.id)}
              onSave={handleEdit.bind(null, item.id)}
            />
          ) : item.form.type === "Dropdown" && openSavedQuestionForm ? (
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
              valueQ={item.form.question!}
              valueT={item.form.type}
              valueC={item.form.choice!}
              valueMC={item.form.maxNumOfChoices!}
              onDelete={() => formCtx.removeForm(item.id)}
              onSave={handleEdit.bind(null, item.id)}
            />
          ) : item.form.type === "Video question" && openSavedQuestionForm ? (
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
              valueQ={item.form.question!}
              valueT={item.form.type}
              valueD={item.form.duration!.toString()}
              valueAI={item.form.addInfo!}
              valueDT={item.form.time!}
              onDelete={() => formCtx.removeForm(item.id)}
              onSave={handleEdit.bind(null, item.id)}
            />
          ) : (
            openSavedQuestionForm && (
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
                valueQ={item.form.question!}
                valueT={item.form.type!}
                onDelete={() => formCtx.removeForm(item.id)}
                onSave={handleEdit.bind(null, item.id)}
              />
            )
          );
        })}
        {openForm && formData.form["type"].value === "Multiple choice" ? (
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
            onBlurMC={inputBlurHandler.bind(
              null,
              "maxNumOfChoices",
              formData.form["maxNumOfChoices"].value
            )}
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
            onDelete={handleDeleteQuestion.bind(null, {
              question: "question",
              type: "type",
            })}
            onSave={handleSave.bind(null, 'choice')}
          />
        ) : openForm && formData.form["type"].value === "Dropdown" ? (
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
            onDelete={handleDeleteQuestion.bind(null, {
              question: "question",
              type: "type",
            })}
            onSave={handleSave.bind(null, "dropdown")}
          />
        ) : openForm && formData.form["type"].value === "Video question" ? (
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
            onDelete={handleDeleteQuestion.bind(null, {
              question: "question",
              type: "type",
            })}
            onSave={handleSave.bind(null, 'video')}
          />
        ) : openForm && formData.form["type"].value === "Yes/No" ? (
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
            onDelete={handleDeleteQuestion.bind(null, {
              question: "question",
              type: "type",
            })}
            onSave={handleSave.bind(null, 'yes/no')}
          />
        ) : (
          openForm && (
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
              onDelete={handleDeleteQuestion.bind(null, {
                question: "question",
                type: "type",
              })}
              onSave={handleSave.bind(null, '')}
            />
          )
        )}
        <Button
          mode="flat"
          iconColor="#2196F3"
          icon="fa-plus"
          hasIcon={true}
          design="accent"
          onClick={handleClick}
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
    </>
  );
}
