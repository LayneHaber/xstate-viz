import React from "react";
import { Machine } from "xstate";

import { ProtocolContext } from "../utils/channelTypes";
import { StateChart } from "..";

const proposeMachine = Machine<ProtocolContext>(
  {
    id: "propose",
    context: {
      messages: [],
      package: "counterfactual",
      agent: {
        name: "Initiator",
        currentMessage: undefined
      }
    },
    initial: "noProposal",
    states: {
      noProposal: {},
      proposalInitiated: {}
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

export const Propose: React.FunctionComponent = () => {
  return <StateChart machine={proposeMachine} />;
};
