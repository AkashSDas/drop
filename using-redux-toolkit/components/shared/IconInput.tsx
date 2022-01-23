import { DetailedHTMLProps, InputHTMLAttributes } from "react";

interface Props {
  icon: JSX.Element;
  inputProps: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}

const IconInput = ({ icon, inputProps }: Props) => {
  return (
    <div className="icon-input">
      {icon}
      <input {...inputProps} />
    </div>
  );
};

export default IconInput;
