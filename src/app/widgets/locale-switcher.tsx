import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select";

const locales = [
  { value: "en", label: "English" },
  { value: "ru", label: "Русский" },
  { value: "uz", label: "Oʻzbekcha" },
];

export const LocaleSwitcher = () => {
  return (
    <Select>
      <SelectTrigger className="max-w-max rounded-2xl">
        <Globe className="h-6 w-6 mr-2" />
        <SelectValue placeholder="Tilni tanlang" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {locales.map((locale) => (
            <SelectItem key={locale.value} value={locale.value}>
              {locale.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
