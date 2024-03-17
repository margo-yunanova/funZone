import {
  PanelHeader,
  Group,
  FormLayoutGroup,
  FormItem,
  Button,
  Textarea,
  Panel,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import styles from "./styles.module.css";
import { FC, useEffect, useRef, useState } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface CatFact {
  title: string;
  id: string;
}

export const CatFact: FC<CatFact> = ({ title, id }) => {
  const [fact, setFact] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const routeNavigator = useRouteNavigator();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const result = await (await fetch("https://catfact.ninja/fact")).json();
      setFact(result.fact);
    } catch (e) {
      console.log("error ", e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (fact) {
      textAreaRef.current?.focus();
      const firstWordLength = fact.split(" ")[0].length;
      textAreaRef.current?.setSelectionRange(firstWordLength, firstWordLength);
    }
  }, [fact]);

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        {title}
      </PanelHeader>
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
            <Button disabled={isLoading} size="m" onClick={handleClick}>
              Получить
            </Button>
          </FormItem>
        </FormLayoutGroup>
      </Group>
    </Panel>
  );
};
