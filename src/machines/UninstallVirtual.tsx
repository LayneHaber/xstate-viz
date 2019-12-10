import React from "react";
import { Machine } from "xstate";

import { ProtocolContext } from "../utils/channelTypes";
import { StateChart } from "..";

const uninstallVirtualMachine = Machine<ProtocolContext>(
  {
    id: "uninstallVirtual",
    context: {
      messages: [],
      package: "counterfactual",
      agent: {
        name: "Initiator",
        currentMessage: undefined
      }
    },
    initial: "installedVirtual",
    states: {
      installedVirtual: {},
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

export const UninstallVirtual: React.FunctionComponent = () => {
  return <StateChart machine={uninstallVirtualMachine} />;
};