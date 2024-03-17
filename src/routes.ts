import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
} from "@vkontakte/vk-mini-apps-router";

export const DEFAULT_ROOT = "default_root";

export const DEFAULT_VIEW = "default_view";

export const DEFAULT_VIEW_PANELS = {
  HOME: "home",
  CATFACT: "catFact",
  AGEPREDICTOR: "agePredictor",
} as const;

export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, "/", []),
      createPanel(DEFAULT_VIEW_PANELS.CATFACT, `/${DEFAULT_VIEW_PANELS.CATFACT}`, []),
      createPanel(
        DEFAULT_VIEW_PANELS.AGEPREDICTOR,
        `/${DEFAULT_VIEW_PANELS.AGEPREDICTOR}`,
        []
      ),
    ]),
  ]),
]);

export const router = createHashRouter(routes.getRoutes());
