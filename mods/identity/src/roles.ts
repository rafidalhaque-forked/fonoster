/* eslint-disable sonarjs/no-duplicate-string */
/*
 * Copyright (C) 2024 by Fonoster Inc (https://fonoster.com)
 * http://github.com/fonoster/fonoster
 *
 * This file is part of Fonoster
 *
 * Licensed under the MIT License (the "License");
 * you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 *
 *    https://opensource.org/licenses/MIT
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { APIRoleEnum } from "./apikeys";
import { Role } from "./exchanges/types";
import { WorkspaceRoleEnum } from "./workspaces/WorkspaceRoleEnum";

const workspaceAccess = [
  "/fonoster.applications.v1beta2.Applications/CreateApplication",
  "/fonoster.applications.v1beta2.Applications/UpdateApplication",
  "/fonoster.applications.v1beta2.Applications/GetApplication",
  "/fonoster.applications.v1beta2.Applications/DeleteApplication",
  "/fonoster.applications.v1beta2.Applications/ListApplications",
  "/fonoster.domains.v1beta2.Domains/CreateDomain",
  "/fonoster.domains.v1beta2.Domains/UpdateDomain",
  "/fonoster.domains.v1beta2.Domains/GetDomain",
  "/fonoster.domains.v1beta2.Domains/DeleteDomain",
  "/fonoster.domains.v1beta2.Domains/ListDomains",
  "/fonoster.agents.v1beta2.Agents/CreateAgent",
  "/fonoster.agents.v1beta2.Agents/UpdateAgent",
  "/fonoster.agents.v1beta2.Agents/GetAgent",
  "/fonoster.agents.v1beta2.Agents/DeleteAgent",
  "/fonoster.agents.v1beta2.Agents/ListAgents",
  "/fonoster.trunks.v1beta2.Trunks/CreateTrunk",
  "/fonoster.trunks.v1beta2.Trunks/UpdateTrunk",
  "/fonoster.trunks.v1beta2.Trunks/GetTrunk",
  "/fonoster.trunks.v1beta2.Trunks/DeleteTrunk",
  "/fonoster.trunks.v1beta2.Trunks/ListTrunks",
  "/fonoster.numbers.v1beta2.Numbers/CreateNumber",
  "/fonoster.numbers.v1beta2.Numbers/UpdateNumber",
  "/fonoster.numbers.v1beta2.Numbers/GetNumber",
  "/fonoster.numbers.v1beta2.Numbers/DeleteNumber",
  "/fonoster.numbers.v1beta2.Numbers/ListNumbers",
  "/fonoster.acl.v1beta2.ACL/CreateACL",
  "/fonoster.acl.v1beta2.ACL/UpdateACL",
  "/fonoster.acl.v1beta2.ACL/GetACL",
  "/fonoster.acl.v1beta2.ACL/DeleteACL",
  "/fonoster.acl.v1beta2.ACL/ListACL",
  "/fonoster.credentials.v1beta2.CredentialsService/CreateCredentials",
  "/fonoster.credentials.v1beta2.CredentialsService/UpdateCredentials",
  "/fonoster.credentials.v1beta2.CredentialsService/GetCredentials",
  "/fonoster.credentials.v1beta2.CredentialsService/DeleteCredentials",
  "/fonoster.credentials.v1beta2.CredentialsService/ListCredentials"
];

const fullIdentityAccess = [
  "/fonoster.identity.v1beta2.Identity/GetUser",
  "/fonoster.identity.v1beta2.Identity/UpdateUser",
  "/fonoster.identity.v1beta2.Identity/DeleteUser",
  "/fonoster.identity.v1beta2.Identity/CreateWorkspace",
  "/fonoster.identity.v1beta2.Identity/GetWorkspace",
  "/fonoster.identity.v1beta2.Identity/UpdateWorkspace",
  "/fonoster.identity.v1beta2.Identity/ListWorkspaces",
  "/fonoster.identity.v1beta2.Identity/InviteUserToWorkspace",
  "/fonoster.identity.v1beta2.Identity/RemoveUserFromWorkspace",
  "/fonoster.identity.v1beta2.Identity/ResendWorkspaceMembershipInvitation",
  "/fonoster.identity.v1beta2.Identity/RefreshToken",
  "/fonoster.identity.v1beta2.Identity/CreateAPIKey",
  "/fonoster.identity.v1beta2.Identity/DeleteAPIKey",
  "/fonoster.identity.v1beta2.Identity/ListAPIKeys",
  "/fonoster.identity.v1beta2.Identity/RegenerateAPIKey"
];

const roles = [
  {
    name: WorkspaceRoleEnum.OWNER,
    description: "Access to all endpoints",
    access: [...fullIdentityAccess, ...workspaceAccess]
  },
  {
    name: WorkspaceRoleEnum.ADMIN,
    description: "Access to all endpoints",
    access: [...fullIdentityAccess, ...workspaceAccess]
  },
  {
    name: APIRoleEnum.WORKSPACE_ADMIN,
    description: "Access to all endpoints",
    access: [...fullIdentityAccess, ...workspaceAccess]
  },
  {
    name: WorkspaceRoleEnum.USER,
    description: "Access to User and Workspace endpoints",
    access: [
      "/fonoster.identity.v1beta2.Identity/GetUser",
      "/fonoster.identity.v1beta2.Identity/UpdateUser",
      "/fonoster.identity.v1beta2.Identity/DeleteUser",
      "/fonoster.identity.v1beta2.Identity/CreateWorkspace",
      "/fonoster.identity.v1beta2.Identity/GetWorkspace",
      "/fonoster.identity.v1beta2.Identity/UpdateWorkspace",
      "/fonoster.identity.v1beta2.Identity/ListWorkspaces",
      "/fonoster.identity.v1beta2.Identity/RefreshToken",
      ...workspaceAccess
    ]
  }
] as Role[];

export default roles;
