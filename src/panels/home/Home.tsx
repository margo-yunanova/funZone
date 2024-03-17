import { FC } from "react";
import {
  Panel,
  PanelHeader,
  Header,
  Group,
  NavIdProps,
  Div,
  Button,
} from "@vkontakte/vkui";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

export interface HomeProps extends NavIdProps {
  id: string;
}

export const Home: FC<HomeProps> = ({ id }) => {
  const routeNavigator = useRouteNavigator();

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>

      <Group header={<Header mode="secondary">Тестовое задание</Header>}>
        <Div>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push("catFact")}
          >
            Случайный факт о кошках
          </Button>
          <Button
            stretched
            size="l"
            mode="secondary"
            onClick={() => routeNavigator.push("agePredictor")}
          >
            Узнай возраст человека по имени
          </Button>
        </Div>
      </Group>
    </Panel>
  );
};
