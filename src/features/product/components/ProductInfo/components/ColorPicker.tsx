import { ColorOption } from "@/core/entities/product";
import styles from "./picker.module.css";
interface ColorPickerProps {
  options: ColorOption[];
  selectedColor: ColorOption | null;
  onSelectColor: (color: ColorOption) => void;
}
export const ColorPicker: React.FC<ColorPickerProps> = ({
  options,
  selectedColor,
  onSelectColor,
}) => {
  return (
    <div className={styles["picker--wrapper"]}>
      <h4>COLOR. PICK YOUR FAVORITE.</h4>
      <div className={styles["button-wrapper"]}>
        {options.map((color) => {
          const isActive = selectedColor?.name === color.name;

          const buttonClass = [
            styles["button"],
            styles["button--color"],
            isActive ? styles["button--active"] : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={color.name}
              onClick={() => onSelectColor(color)}
              style={{ backgroundColor: color.hexCode }}
              className={buttonClass}
              aria-label={`Color ${color.name}`}
              aria-pressed={isActive}
            />
          );
        })}
      </div>
      <span className={styles["color--name"]}>{selectedColor?.name}</span>
    </div>
  );
};
