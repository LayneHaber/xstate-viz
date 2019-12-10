import React from "react";
import { Machine } from "xstate";

import { ProtocolContext } from "../utils/channelTypes";
import { StateChart } from "..";

const withdrawMachine = Machine<ProtocolContext>(
  {
    id: "withdraw",
    context: {
      messages: [],
      package: "connext",
      agent: {
        name: "Initiator",
        currentMessage: undefined
      }
    },
    initial: "noWithdraw",
    states: {
      noWithdraw: {},
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

export const Withdraw: React.FunctionComponent = () => {
  return <StateChart machine={withdrawMachine} />;
};