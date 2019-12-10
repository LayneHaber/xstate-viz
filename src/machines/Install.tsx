import React from "react";
import { Machine } from "xstate";

import { ProtocolContext } from "../utils/channelTypes";
import { StateChart } from "..";

const installMachine = Machine<ProtocolContext>(
  {
    id: "install",
    context: {
      messages: [],
      package: "counterfactual",
      agent: {
        name: "Initiator",
        currentMessage: undefined
      }
    },
    initial: "proposed",
    states: {
      proposed: {},
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

export const Install: React.FunctionComponent = () => {
  return <StateChart machine={installMachine} />;
};
