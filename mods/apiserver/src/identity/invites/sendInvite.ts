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
import { EmailParams } from "@fonoster/common";
import { createInviteBody } from "./createInviteBody";

type InviteParams = {
  sender: string;
  recipient: string;
  inviteUrl: string;
  oneTimePassword?: string;
  groupName: string;
  isExistingUser: boolean;
};

type SendInvite = (
  sendEmail: (params: EmailParams) => Promise<void>,
  request: InviteParams
) => Promise<void>;

async function sendInvite(
  sendEmail: (params: EmailParams) => Promise<void>,
  request: InviteParams
) {
  const {
    sender,
    recipient,
    inviteUrl,
    oneTimePassword,
    isExistingUser,
    groupName
  } = request;

  await sendEmail({
    from: sender,
    to: recipient,
    subject: "Invite to join a Fonoster workspace",
    html: createInviteBody({
      isExistingUser,
      groupName,
      oneTimePassword: isExistingUser ? undefined : oneTimePassword,
      inviteUrl
    })
  });
}

export { sendInvite, SendInvite, InviteParams };
