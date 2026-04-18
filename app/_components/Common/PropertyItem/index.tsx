import { ReactElement } from "react";

export interface PropertyItemProps {
  text: string; // texte à afficher
}

export default function PropertyItem({
  text,
}: PropertyItemProps): ReactElement {
  return (
    <div className="bg-grayLight text font-normal text-grayDark text-xs w-full h-8 flex items-center justify-center text-wrap rounded-md">
      {text}
    </div>
  );
}
