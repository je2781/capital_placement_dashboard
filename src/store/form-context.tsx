import React from "react";
import Form from "../models/Form";
import perInfoForm from "../models/PerInfoForm";

type ContextClass = {
  forms: {
    generalForm: Form[];
    perInfo: perInfoForm | undefined;
    maxNumOfChoices: number;
  };
  fieldTitles: string[];
  removeForm: (id: string) => void;
  addForm: (form: Form) => void;
  addFieldTitle: (fieldTitle: string) => void;
  editForm: (form: Form, id: string) => void;
  resetFieldCount: () => void;
  increaseChoices: (num: string) => void;
};

export const FormContext = React.createContext<ContextClass>({
  forms: {
    generalForm: [],
    perInfo: undefined,
    maxNumOfChoices: 1,
  },
  fieldTitles: [],
  removeForm: function (id: string) {},
  addForm: function (form: Form) {},
  editForm: function (form: Form, id: string) {},
  addFieldTitle: (fieldTitle: string) => {},
  resetFieldCount: () => {},
  increaseChoices: (num: string) => {}
});

export default function FormontextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [formArray, setFormArray] = React.useState<{
    generalForm: Form[];
    perInfo: perInfoForm | undefined;
    maxNumOfChoices: number;
  }>({
    generalForm: [],
    perInfo: undefined,
    maxNumOfChoices: 1,
  });
  const [fieldTitleArray, setFieldTitleArray] = React.useState<string[]>([
    "Choice",
  ]);

  function handleAdd(form: Form) {
    setFormArray((prevValues: any) => {
      return {
        ...prevValues,
        generalForm: [...prevValues.generalForm, form],
      };
    });
  }
  function handleDelete(id: string) {
    setFormArray((prevValues: any) => {
      return  {
            ...prevValues,
            generalForm: (prevValues.generalForm as Form[]).filter(
              (item) => item.id !== id
            ),
          };
    });
  }

  function handleEdit(form: Form, id: string) {
    setFormArray((prevValues: any) => {
      const updatedForm = [...prevValues.generalForm as Form[]];
      const index = updatedForm.findIndex((item) => item.id === id);
      updatedForm[index] = form;

      return {
        ...prevValues,
        generalForm: updatedForm,
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
    increaseChoices: handleIncreasingMaxChoices
  };
  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
}
