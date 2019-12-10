import React from "react";
import { Machine } from "xstate";

import { ProtocolContext } from "../utils/channelTypes";
import { StateChart } from "..";
import { uniqueId } from "xstate/lib/utils";

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
      proposed: {
        on: {
          protocolInitiated: "inProtocol"
        }
      },
      inProtocol: {
        type: "parrallel",
        initial: "initiated",
        states: {
          // initiating party in protocol
          initiator: {
            type: "compound",
            states: {
              persistChannel: {
                on: {
                  PERSIST_STATE_CHANNEL: 'freeBalanceUpdate'
                }
              },
              freeBalanceUpdate: {
                type: "final",
                states: {
                  // sign message
                  // send data
                  // will timeout
                  sendSignature: {
                    on: {
                      TIMEOUT: 'failure.timeout',
                      REJECT: 'failure'
                    }
                  }
                },
              }
            }
          },
          // responding party in protocol
          responding: {
            type: "compound",
            states: {}
          },
          failure: {
            type: "final",
            initial: "rejection",
            states: {
              rejection: {
                meta: {
                  message: "Install rejected"
                }
              },
              timeout: {
                meta: {
                  message: "Install timed out"
                }
              }
            },
            meta: { message: "Install failed" }
          },
        }
      },
      installed: {
        type: "final",
        meta: {
          installedApps: 1,
        }
      },
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
