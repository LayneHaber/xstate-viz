import React from "react";
import { StateChart } from "..";
import { Machine } from "xstate";
import { useMachine } from "@xstate/react";

import { ProtocolContext } from "../utils/channelTypes";
import { appMachine } from "../App";

const depositMachine = Machine<ProtocolContext>(
  {
    id: "deposit",
    context: {
      messages: [],
      package: "connext",
      agent: {
        name: "Initiator",
        currentMessage: undefined
      }
    },
    initial: "propose",
    type: "parallel",
    states: {
      noDeposit: {
        on: {
          depositCall: {
            target: "propose"
          }
        }
      },
      propose: {
        on: {
          proposeEvent: "install"
        }
      },
      install: {
        on: {
          installEvent: "onchain"
        }
      },
      onchain: {
        on: {
          success: "uninstall",
          failure: "uninstall"
        }
      },
      uninstall: {
        on: {
          uninstallEvent: "noDeposit"
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

export const Deposit: React.FunctionComponent = () => {
  // const [current, send, service] = useMachine(appMachine);
  return (
    <>
    <StateChart
      machine={depositMachine}
      // onSave={code => {
      //   send("GIST.SAVE", { code });
      // }}
    />
    </>
  );
};
