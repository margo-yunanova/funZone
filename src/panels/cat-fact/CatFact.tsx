import {
  PanelHeader,
  Group,
  FormLayoutGroup,
  FormItem,
  Button,
  Textarea,
} from "@vkontakte/vkui";
import styles from "./styles.module.css";
import { FC, useLayoutEffect, useRef, useState } from "react";

interface CatFact {
  title: string;
}

export const CatFact: FC<CatFact> = ({ title }) => {
  const [fact, setFact] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const handleClick = async () => {
    const result = await (await fetch("https://catfact.ninja/fact")).json();
    setFact(result.fact);
  };

  useLayoutEffect(() => {
    if (fact) {
      textAreaRef.current?.focus();
      const firstWordLength = fact.split(" ")[0].length;
      textAreaRef.current?.setSelectionRange(firstWordLength, firstWordLength);
    }
  });

  return (
    <>
      <PanelHeader>{title}</PanelHeader>
      <Group>
        <FormLayoutGroup>
          <FormItem
            className={styles.formItem}
            htmlFor="catFact"
            top="Нажмите на кнопку чтобы получить случайный факт"
          >
            <Textarea
              getRef={textAreaRef}
              placeholder="Здесь появится забавный факт"
              value={fact}
              rows={5}
            />
            <Button size="m" onClick={handleClick}>
              Получить
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </Group>
    </>
  );
};
