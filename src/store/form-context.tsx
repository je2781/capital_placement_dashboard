import React from "react";
import PerInfoForm from "../models/PerInfoForm";
import AdditionalQuestionForm from "../models/addQuestionForm";

type ContextClass = {
  forms: {
    profileQuestionForms: AdditionalQuestionForm[];
    perInfoQuestionForms: AdditionalQuestionForm[];
    perInfo: PerInfoForm | undefined;
    maxNumOfChoices: number;
  };
  fieldTitles: string[];
  removeForm: (id: string) => void;
  addForm: (form: AdditionalQuestionForm) => void;
  addFieldTitle: (fieldTitle: string) => void;
  editForm: (form: AdditionalQuestionForm,  formName: string) => void;
  resetFieldCount: () => void;
  increaseChoices: (num: string) => void;
  updateProfileQuestionForms: (formArray: AdditionalQuestionForm[]) => void
  updatePerInfoQuestionForms: (formArray: AdditionalQuestionForm[]) => void
};

export const FormContext = React.createContext<ContextClass>({
  forms: {
    profileQuestionForms: [],
    perInfoQuestionForms: [],
    perInfo: undefined,
    maxNumOfChoices: 1,
  },
  fieldTitles: [],
  removeForm: function (id: string) {},
  addForm: function (form: AdditionalQuestionForm) {},
  editForm: function (form: AdditionalQuestionForm, formName: string) {},
  addFieldTitle: (fieldTitle: string) => {},
  resetFieldCount: () => {},
  increaseChoices: (num: string) => {},
  updateProfileQuestionForms: (formArray: AdditionalQuestionForm[]) => {},
  updatePerInfoQuestionForms: (formArray: AdditionalQuestionForm[]) => {}

});

export default function FormontextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formArray, setFormArray] = React.useState<{
    profileQuestionForms: AdditionalQuestionForm[];
    perInfoQuestionForms: AdditionalQuestionForm[];
    perInfo: PerInfoForm | undefined;
    maxNumOfChoices: number;
  }>({
    profileQuestionForms: [],
    perInfoQuestionForms: [],
    perInfo: undefined,
    maxNumOfChoices: 1,
  });
  const [fieldTitleArray, setFieldTitleArray] = React.useState<string[]>([
    "Choice",
  ]);

  function handleAdd(form: AdditionalQuestionForm) {
    setFormArray((prevValues: any) => {
      return {
        ...prevValues,
        generalForms: [...prevValues.generalForms, form],
      };
    });
  }
  function handleDelete(id: string) {
    setFormArray((prevValues: any) => {
      return  {
            ...prevValues,
            generalForms: (prevValues.generalForms as AdditionalQuestionForm[]).filter(
              (item) => item.id !== id
            ),
          };
    });
  }

  function handleEdit(form: AdditionalQuestionForm, formName: string) {
    setFormArray((prevValues: any) => {
      const updatedForms = [...prevValues.generalForms];
      const index = updatedForms.findIndex((item) => item.id === form.id);
     updatedForms[index] = form;

      return {
        ...prevValues,
        [formName]: updatedForms,
      };
    });
  }

  function handleAddingFieldTitle(fieldTitle: string) {
    setFieldTitleArray((prevState) => [...prevState, fieldTitle]);
  }

  function handleIncreasingMaxChoices(num: string){
    setFormArray((prevValues: any) => {
      return  {
            ...prevValues,
            maxNumOfChoices: num
          };
    });
  }

  function handleUpdatingProfileQuestionForms(formArray: AdditionalQuestionForm[]){
    setFormArray((prevValues: any) => {
      return  {
            ...prevValues,
            profileQuestionForms: formArray
          };
    });
  }

  function handleUpdatingPerInfoQuestionForms(formArray: AdditionalQuestionForm[]){
    setFormArray((prevValues: any) => {
      return  {
            ...prevValues,
            perInfoQuestionForms: formArray
          };
    });
  }

  function reset() {
    setFieldTitleArray(["Choice"]);
  }

  const value = {
    forms: formArray,
    removeForm: handleDelete,
    addForm: handleAdd,
    editForm: handleEdit,
    addFieldTitle: handleAddingFieldTitle,
    fieldTitles: fieldTitleArray,
    resetFieldCount: reset,
    increaseChoices: handleIncreasingMaxChoices,
    updatePerInfoQuestionForms: handleUpdatingPerInfoQuestionForms,
    updateProfileQuestionForms: handleUpdatingProfileQuestionForms
  };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
