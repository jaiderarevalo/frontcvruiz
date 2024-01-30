import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface icon {
  className: string;
  icon: any;
}

const IconsFont = ({ className, icon }: icon) => {
  return <FontAwesomeIcon className={className} icon={icon} />;
};

export default IconsFont;
