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
import { AbstractClient } from "./AbstractClient";
import { TokenRefresherWeb } from "./TokenRefresherWeb";
import {
  ApplicationsClient as TApplicationsClient,
  CallsClient as TCallsClient
} from "./types";
import { ApplicationsClient } from "../generated/web/ApplicationsServiceClientPb";
import { CallsClient } from "../generated/web/CallsServiceClientPb";
import { IdentityClient } from "../generated/web/IdentityServiceClientPb";

const DEFAULT_URL = "https://api.fonoster.io/v1beta2";

export class WebClient extends AbstractClient {
  private url: string;

  constructor(config: { url?: string; accessKeyId: string }) {
    const { url, accessKeyId } = config;

    super({
      accessKeyId,
      identityClient: new IdentityClient(url || DEFAULT_URL, null, null)
    });

    this.url = url || DEFAULT_URL;
  }

  getMetadata() {
    return {
      token: this.getAccessToken(),
      accessKeyId: this.getAccessKeyId()
    };
  }

  getApplicationsClient() {
    return new ApplicationsClient(this.url, null, {
      streamInterceptors: [new TokenRefresherWeb(this)]
    }) as unknown as TApplicationsClient;
  }

  getCallsClient() {
    return new CallsClient(this.url, null, {
      streamInterceptors: [new TokenRefresherWeb(this)]
    }) as unknown as TCallsClient;
  }

  getIdentityClient() {
    return new IdentityClient(this.url, null, null);
  }
}