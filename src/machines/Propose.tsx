import React from "react";
import { Machine } from "xstate";

import { ProtocolContext } from "../utils/channelTypes";
import { StateChart } from "..";

const agentProtocolFailureEvents = {
  BAD_SIG: {
    target: "failure.badSignature",
    internal: false,
  },
  PROPOSAL_ACCEPTED: {
    target: "proposed",
    internal: false,
  },
  TIMEOUT: {
    target: "failure.timeout",
    internal: false
  },
  WRITE_FAIL: {
    target: "failure.protocolFailure",
    internal: false
  }
}

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
    initial: "initializing",
    states: {
      initializing: {
        type: "atomic",
        on: {
          PROPOSE_CALLED: "initiator"
        },
        states: {}
      },
      initiator: {
        type: "compound",
        on: { ...agentProtocolFailureEvents },
        states: {
          getStateChannel: {},
          addProposal: {},
          persistChannel: {},
          generateCommitment: {},
          signCommitment: {},
          sendToResponder: {},
          recieveSignature: {},
          updateMapping: {},
        }
      },
      responder: {
        type: "compound",
        on: { ...agentProtocolFailureEvents },
        states: {
          recieveMessage: {},
          getStateChannel: {},
          generateCommitment: {},
          assertSignature: {},
          addProposal: {},
          persistChannel: {},
          signCommitment: {},
          sendMessage: {},
        }
      },
      // protocol has finished for both participants with
      // channels updated, leaves the connext context
      proposed: {
        // type: ,
        on: {
          EVENT_FIRED: "notification"
        },
        states: {}
      },
      // protocol has failed
      failure: {
        type: "final",
        states: {
          timeout: {},
          rejected: {},
          badSignature: {},
          protocolFailure: {}
        }
      },
      notification: {
        type: "final",
        states: {
          connextEventEmitted: {}
        }
      }
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
