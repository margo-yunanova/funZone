import { FC, useRef, useState } from "react";
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

interface AgePredictorProps {
  title: string;
}

export const AgePredictor: FC<AgePredictorProps> = ({ title }) => {
  const [name, setName] = useState("");
  const names = useRef<Map<string, { age: number }>>(new Map());
  const [age, setAge] = useState<number | null>(null);

  const fetching = async () => {
    const result = names.current.get(name);

    if (!result) {
      const result = await (await fetch(`https://api.agify.io/?name=${name}`)).json();
      names.current.set(name, result);
      setAge(result.age);
    } else {
      setAge(result.age);
    }
  };

  return (
    <>
      <PanelHeader>{title}</PanelHeader>
      <Group>
        <FormLayoutGroup>
          <FormItem
            className={styles.formItem}
            htmlFor="catFact"
            top="Нажмите на кнопку чтобы узнать возраст"
          >
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            {age && <Text>Предполагаемый возраст - {age}</Text>}
            <Button size="m" onClick={fetching}>
              Получить
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </Group>
    </>
  );
};

export default AgePredictor;
