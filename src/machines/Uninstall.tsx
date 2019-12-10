import React from "react";
import { Machine } from "xstate";

import { ProtocolContext } from "../utils/channelTypes";
import { StateChart } from "..";

const uninstallMachine = Machine<ProtocolContext>(
  {
    id: "uninstall",
    context: {
      messages: [],
      package: "counterfactual",
      agent: {
        name: "Initiator",
        currentMessage: undefined
      }
    },
    initial: "installed",
    states: {
      installed: {},
    }
  },
  {
    actions: {
      changeAgent: (context, event) => {
        console.log(`called changeAgent`);
      }
    },
    activities: {},
    guards: {},
    services: {}
  }
);

export const Uninstall: React.FunctionComponent = () => {
  return <StateChart machine={uninstallMachine} />;
};