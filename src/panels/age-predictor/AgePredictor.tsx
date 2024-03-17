import { FC, FormEventHandler, useRef, useState } from "react";
import {
  PanelHeader,
  Group,
  FormLayoutGroup,
  FormItem,
  Button,
  Input,
  Text,
  Panel,
  PanelHeaderBack,
} from "@vkontakte/vkui";
import styles from "./styles.module.css";
import { useDebouncedCallback } from "use-debounce";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

interface AgePredictorProps {
  title: string;
  id: string;
}

const timeOut = 3000;

export const AgePredictor: FC<AgePredictorProps> = ({ title, id }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | null | undefined>(undefined);

  const names = useRef<Map<string, { age: number }>>(new Map());
  const controllerRef = useRef<AbortController | null>(null);

  const routeNavigator = useRouteNavigator();

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

        setAge(result.age);

        names.current.set(name, result);
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
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
        {title}
      </PanelHeader>
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
                  setAge(undefined);
                  debounce();
                }}
              />
              <Text>
                {age && `Предполагаемый возраст - ${age}`}
                {name && age === null && `Такого имени в базе нет`}
                &nbsp;
              </Text>
              <Button size="m" type="submit">
                Получить
              </Button>
            </FormItem>
          </FormLayoutGroup>
        </form>
      </Group>
    </Panel>
  );
};

export default AgePredictor;
