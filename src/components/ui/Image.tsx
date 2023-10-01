import React from "react";

import classes from "./Image.module.css";

type ImageProps = {
  imageUrl: string | ArrayBuffer;
  contain: any;
  handleDelete: () => void;
  handleInputChange: (
    value: string,
    files: FileList | null,
    input: string
  ) => void;
  id: string
};

const image = ({
  imageUrl,
  contain,
  handleDelete,
  handleInputChange,
  id
}: ImageProps) => (
  <div
    className={classes.image}
    style={{
      backgroundImage: `url('${imageUrl}')`,
      backgroundSize: contain ? "contain" : "cover",
      backgroundPosition: "center",
    }}
  >
    <div onClick={handleDelete} className={classes.icon}>
      <i className="fa-solid fa-trash"></i>
    </div>
    <div className={classes.icon}>
      <label htmlFor="file-input">
        <i className="fa-solid fa-upload large"></i>
      </label>
      <input
        type="file"
        id="file-input"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleInputChange(e.target.value, e.target.files!, id)
        }
      />
    </div>
  </div>
);

export default image;
