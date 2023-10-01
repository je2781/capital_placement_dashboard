import Card from "../ui/Card";
import Image from "../ui/Image";
import classes from "./ImageUploadForm.module.css";
import { Strings } from "../../constants/Strings";

type UploadFormProps = {
  coverImageTitle: string;
  imagePreview: null | string | ArrayBuffer | undefined;
  id: string;
  handleFormData: React.Dispatch<React.SetStateAction<any>>;
  onChange: (value: string, files: FileList | null, input: string) => void;
  onBlur: () => void;
  valid: boolean;
  touched: boolean;

};

export default function ImageUploadForm({
  coverImageTitle,
  imagePreview,
  onChange,
  handleFormData,
  id,
  onBlur,
  valid,
  touched
}: UploadFormProps) {

  function deleteImageHandler() {
    handleFormData((prevState: any) => ({
        ...prevState,
        imagePreview: null,
      }));
  }

  return (
    <Card className={classes["upload-image"]} cardStyle={undefined}>
      <header className={classes.header}>
        <h2>{coverImageTitle}</h2>
      </header>
      <div className={classes["content-container"]}>
        {!imagePreview ? (
          <section className={classes.content}>
            <div>
              <label htmlFor="file-input">
                <i className="fa-solid fa-upload large"></i>
              </label>
              <input
              className={[
                !valid ? classes.invalid : 'valid',
                touched ? classes.touched : 'untouched'
              ].join(' ')}
                type="file"
                id="file-input"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.value, e.target.files!, id)
                }
                onBlur={onBlur}
              />
            </div>
            <p className={classes.title}>{coverImageTitle}</p>
            <p className={classes.body}>{Strings.appUploadImageContentText}</p>
          </section>
        ) : (
          <Image
            imageUrl={imagePreview}
            contain={undefined}
            handleDelete={deleteImageHandler}
            handleInputChange={onChange}
            id="image"
          />
        )}
      </div>
    </Card>
  );
}
