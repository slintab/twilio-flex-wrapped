import React from "react";
import { VERSION, NotificationType, Notifications } from "@twilio/flex-ui";
import { FlexPlugin } from "@twilio/flex-plugin";

import reducers, { namespace } from "./states";
import Wrapped from "./components/Wrapped";

const PLUGIN_NAME = "FlexWrappedPlugin";

export default class FlexWrappedPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }
  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  async init(flex, manager) {
    this.registerReducers(manager);

    flex.Notifications.registerNotification({
      id: "flexWrapped",
      closeButton: true,
      timeout: 0,
      type: NotificationType.information,
    });

    const notification =
      Notifications.registeredNotifications.get("flexWrapped");
    notification.content = <Wrapped worker={manager.workerClient} />;

    Notifications.showNotification("flexWrapped", null);
  }

  /**
   * Registers the plugin reducers
   *
   * @param manager { Flex.Manager }
   */
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint-disable-next-line
      console.error(
        `You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`
      );
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
