import { ReactElement } from "react";

/**
 * LabelInputProps type de données en entrée du composant LabelInput
 *
 * @interface LabelInputProps
 * @typedef {LabelInputProps}
 */

export interface LabelInputProps {
  name: string; // nom/identifiant de l'input
  text: string; // texte à afficher sur l'étiquette
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | undefined; // type d'input
  placeHolder?: string; // placeholder de l'input
  value?: string; // value courante de l'input
  defaultValue?: string; // valeur par défaut de l'input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // fonction appelée lors du changement de valeur de l'input
  autoFocus?: boolean; // autofocus de l'input
  required?: boolean; // valeur requise pour l'input
  labelInputClassName?: string; // style appliqué au composant LabelInput
}

/**
 * LabelInput composant renvoyant un objet Label et l'input associé pour les formulaires
 * * @return {ReactElement} code HTML contenant le label et l'input concernés
 */

export default function LabelInput({
  name,
  text,
  type,
  placeHolder,
  value,
  defaultValue,
  onChange,
  autoFocus,
  required,
  labelInputClassName,
}: LabelInputProps): ReactElement {
  return (
    <div className={`flex flex-col gap-1 ${labelInputClassName}`}>
      <label
        htmlFor={name}
        className="black font-normal mt-4 text-sm text-black-font font-inter"
      >
        {text}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        name={name}
        id={name}
        type={type}
        placeholder={placeHolder}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        autoFocus={autoFocus}
        required={required}
        aria-required={required}
        className="rounded-sm pt-2 pr-2 pb-2 pl-2 border border-grayLight bg-white font-inter font-normal text-grey-font"
      />
    </div>
  );
}
