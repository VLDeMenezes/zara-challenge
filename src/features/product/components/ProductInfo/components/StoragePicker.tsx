import { StorageOption } from "@/core/entities/product";
import styles from "./picker.module.css";
interface StoragePickerProps {
  options: StorageOption[];
  selectedStorage: StorageOption | null;
  onSelectStorage: (storage: StorageOption) => void;
}
export const StoragePicker: React.FC<StoragePickerProps> = ({
  options,
  selectedStorage,
  onSelectStorage,
}) => {
  return (
    <div className={styles["picker--wrapper"]}>
      <h4>STORAGE ¿HOW MUCH SPACE DO YOU NEED?</h4>
      <div className={styles["button-wrapper"]}>
        {options.map((storage) => {
          const isActive = selectedStorage?.capacity === storage.capacity;

          const buttonClass = [
            styles["button"],
            styles["button--storage"],
            isActive ? styles["button--active"] : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={storage.capacity}
              onClick={() => onSelectStorage(storage)}
              className={buttonClass}
              aria-label={`Almacenamiento ${storage.capacity}`}
              aria-pressed={isActive}
            >
              {storage.capacity}
            </button>
          );
        })}
      </div>
    </div>
  );
};
