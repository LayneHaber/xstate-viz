import React from "react";
import { notificationsMachine } from "./Notifications";
import { StyledHeader, StyledLinks, StyledLink } from "./App";
import { interpret } from "xstate";
import { Actor } from "xstate/lib/Actor";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Notification } from "./Notifications";
import {
  Deposit,
  Install,
  InstallVirtual,
  Propose,
  Uninstall,
  UninstallVirtual,
  Withdraw
} from "./machines";

const notificationsService = interpret(notificationsMachine).start();

export const notificationsActor: Actor & {
  notify: (message: string | Notification) => void;
} = {
  toJSON: () => ({ id: "notifications" }),
  id: "notifications",
  send: notificationsService.send.bind(notificationsService),
  subscribe: notificationsService.subscribe.bind(notificationsService),
  notify: (message: string | Notification) =>
    notificationsService.send({
      type: "NOTIFICATIONS.QUEUE",
      data:
        typeof message === "string" ? { message, severity: "info" } : message
    })
};

export function Header() {
  return (
    <Router>
      <StyledHeader>
        <StyledLinks>
          <StyledLink to="/deposit">Deposit</StyledLink>
          <StyledLink to="/propose">Propose</StyledLink>
          <StyledLink to="/install">Install</StyledLink>
          <StyledLink to="/uninstall">Uninstall</StyledLink>
          <StyledLink to="/installvirtual">Install Virtual</StyledLink>
          <StyledLink to="/uninstallvirtual">Uninstall Virtual</StyledLink>
          <StyledLink to="/withdraw">Withdraw</StyledLink>
        </StyledLinks>
      </StyledHeader>

      <Switch>
        <Route path="/deposit">
          <Deposit />
        </Route>
        <Route path="/propose">
          <Propose />
        </Route>
        <Route path="/install">
          <Install />
        </Route>
        <Route path="/uninstall">
          <Uninstall />
        </Route>
        <Route path="/installvirtual">
          <InstallVirtual />
        </Route>
        <Route path="/uninstallvirtual">
          <UninstallVirtual />
        </Route>
        <Route path="/withdraw">
          <Withdraw />
        </Route>
      </Switch>
    </Router>
  );
}
