import { View, SplitLayout, SplitCol, PanelHeader, usePlatform } from "@vkontakte/vkui";
import { useActiveVkuiLocation } from "@vkontakte/vk-mini-apps-router";

import { Home } from "./panels/home";
import { DEFAULT_VIEW_PANELS } from "./routes";
import { CatFact } from "./panels/cat-fact";
import { AgePredictor } from "./panels/age-predictor";

const panels = [
  { title: "Случайный факт о кошках", id: "catFact" },
  { title: "Узнай возраст человека по имени", id: "agePredictor" },
];

export const App = () => {
  const { panel: activePanel = DEFAULT_VIEW_PANELS.HOME } = useActiveVkuiLocation();

  const platform = usePlatform();
  const isVKCOM = platform === "vkcom";

  return (
    <SplitLayout
      style={{ justifyContent: "center" }}
      header={!isVKCOM && <PanelHeader delimiter="none" />}
    >
      <SplitCol maxWidth={480}>
        <View activePanel={activePanel}>
          <Home id="home" />
          <CatFact id="catFact" title={panels[0].title} />
          <AgePredictor id="agePredictor" title={panels[1].title} />
        </View>
      </SplitCol>
    </SplitLayout>
  );
};
