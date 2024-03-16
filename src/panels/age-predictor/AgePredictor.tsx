import { FC, FormEventHandler, useRef, useState } from "react";
import {
  PanelHeader,
  Group,
  FormLayoutGroup,
  FormItem,
  Button,
  Input,
  Text,
} from "@vkontakte/vkui";
import styles from "./styles.module.css";
import { useDebouncedCallback } from "use-debounce";

interface AgePredictorProps {
  title: string;
}

const timeOut = 3000;

export const AgePredictor: FC<AgePredictorProps> = ({ title }) => {
  const [name, setName] = useState("");
  const names = useRef<Map<string, { age: number }>>(new Map());
  const [age, setAge] = useState<number | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const getNameInfo = async (name: string) => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    const result = names.current.get(name);
    if (!result) {
      controllerRef.current = new AbortController();

      try {
        const result = await (
          await fetch(`https://api.agify.io/?name=${name}`, {
            signal: controllerRef.current?.signal,
          })
        ).json();
        names.current.set(name, result);
        setAge(result.age);
        controllerRef.current = null;
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setAge(result.age);
    }
  };

  const debounce = useDebouncedCallback(() => {
    if (name) {
      getNameInfo(name);
    }
  }, timeOut);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    debounce.flush();
  };

  return (
    <>
      <PanelHeader>{title}</PanelHeader>
      <Group>
        <form onSubmit={handleSubmit}>
          <FormLayoutGroup>
            <FormItem
              className={styles.formItem}
              htmlFor="agePredictor"
              top="Нажмите на кнопку чтобы узнать возраст"
            >
              <Input
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  debounce();
                }}
              />
              {age && <Text>Предполагаемый возраст - {age}</Text>}
              {name && !age && <Text>Такого имени в базе нет</Text>}
              <Button size="m" type="submit">
                Получить
              </Button>
            </FormItem>
          </FormLayoutGroup>
        </form>
      </Group>
    </>
  );
};

export default AgePredictor;
