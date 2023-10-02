import React from "react";
import PerInfoForm from "../models/PerInfoForm";
import AdditionalQuestionForm from "../models/addQuestionForm";

type ContextClass = {
  forms: {
    generalForms: AdditionalQuestionForm[];
    perInfo: PerInfoForm | undefined;
    maxNumOfChoices: number;
  };
  fieldTitles: string[];
  removeForm: (id: string) => void;
  addForm: (form: AdditionalQuestionForm) => void;
  addFieldTitle: (fieldTitle: string) => void;
  editForm: (form: AdditionalQuestionForm, id: string) => void;
  resetFieldCount: () => void;
  increaseChoices: (num: string) => void;
  updateGeneralForms: (formArray: AdditionalQuestionForm[]) => void
};

export const FormContext = React.createContext<ContextClass>({
  forms: {
    generalForms: [],
    perInfo: undefined,
    maxNumOfChoices: 1,
  },
  fieldTitles: [],
  removeForm: function (id: string) {},
  addForm: function (form: AdditionalQuestionForm) {},
  editForm: function (form: AdditionalQuestionForm, id: string) {},
  addFieldTitle: (fieldTitle: string) => {},
  resetFieldCount: () => {},
  increaseChoices: (num: string) => {},
  updateGeneralForms: (formArray: AdditionalQuestionForm[]) => {}

});

export default function FormontextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formArray, setFormArray] = React.useState<{
    generalForms: AdditionalQuestionForm[];
    perInfo: PerInfoForm | undefined;
    maxNumOfChoices: number;
  }>({
    generalForms: [],
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

  function handleEdit(form: AdditionalQuestionForm, id: string) {
    setFormArray((prevValues: any) => {
      const updatedForms = [...prevValues.generalForms as AdditionalQuestionForm[]];
      const index = updatedForms.findIndex((item) => item.id === id);
     updatedForms[index] = form;

      return {
        ...prevValues,
        generalForms:updatedForms,
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

  function handleUpdatingForms(formArray: AdditionalQuestionForm[]){
    setFormArray((prevValues: any) => {
      return  {
            ...prevValues,
            generalForms: [...[], ...formArray]
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
    updateGeneralForms: handleUpdatingForms
  };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
