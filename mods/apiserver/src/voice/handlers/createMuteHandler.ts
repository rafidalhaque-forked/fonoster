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
import { MuteRequest } from "@fonoster/common";
import { Client } from "ari-client";
import { VoiceClient } from "../types";
import { withErrorHandling } from "./utils/withErrorHandling";

function createMuteHandler(ari: Client, voiceClient: VoiceClient) {
  return withErrorHandling(async (request: MuteRequest) => {
    const { sessionRef, direction } = request;

    await ari.channels.mute({
      channelId: sessionRef,
      direction
    });

    voiceClient.sendResponse({
      muteResponse: {
        sessionRef
      }
    });
  });
}

export { createMuteHandler };