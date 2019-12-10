export interface ChannelMessage {
  from: "Initiator" | "Responder";
  data: any;
  op:
    | "OP_SIGN"
    | "WRITE_COMMITMENT"
    | "IO_SEND"
    | "IO_SEND_AND_WAIT"
    | "PERSIST_STATE_CHANNEL";
}

export interface Agent {
  name: "Initiator" | "Responder";
  currentMessage: ChannelMessage | undefined;
}

export interface ProtocolContext {
  messages: Array<ChannelMessage>;
  package: "counterfactual" | "connext";
  agent: Agent;
}