/*
 * Copyright (C) 2022 by Fonoster Inc (https://fonoster.com)
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
/* eslint-disable require-jsdoc */
import grpc from "@grpc/grpc-js";
import {
  CheckAuthorizedRequest,
  CheckAuthorizedResponse
} from "@fonoster/auth/dist/service/protos/auth_pb";
import {
  ILimiterServer,
  ILimiterService,
  LimiterService
} from "@fonoster/auth/dist/service/protos/auth_grpc_pb";
import {getAccessKeyId, getRedisConnection, routr} from "@fonoster/core";
import {
  getLimiters,
  getLimitForPath,
  getResourceCount,
  getUserByAccessKeyId
} from "../utils/utils";
import {Limiter} from "./types";
import {ErrorCodes, FonosterError} from "@fonoster/errors";
import {UserStatus} from "@fonoster/users/dist/service/types";

const redis = getRedisConnection();
const limiters: Limiter[] = getLimiters();

class LimiterServer implements ILimiterServer {
  [name: string]: grpc.UntypedHandleCall;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  async checkAuthorized(
    call: grpc.ServerUnaryCall<CheckAuthorizedRequest, CheckAuthorizedResponse>,
    callback: grpc.sendUnaryData<CheckAuthorizedResponse>
  ) {
    const accessKeyId = getAccessKeyId(call);
    const user = await getUserByAccessKeyId(redis)(accessKeyId);
    const limit = getLimitForPath(limiters)(
      user.getLimiter(),
      call.request.getPath()
    );

    const resourceCount = await getResourceCount(redis, routr)(
      user.getAccessKeyId(),
      limit?.resource
    );

    if (limit) {
      const userStatus = user.getStatus()
        ? user.getStatus()
        : UserStatus.ACTIVE;

      if (limit.allowedForStatus.toLowerCase() != userStatus.toLowerCase()) {
        return callback(
          new FonosterError(
            `Permission denied due to account status (${user.getStatus()})`,
            ErrorCodes.PERMISSION_DENIED
          )
        );
      }

      if (resourceCount >= limit.limit) {
        return callback(
          new FonosterError(
            `Permission denied. Your account only allows for ${limit.limit} ${limit.resource}s.`,
            ErrorCodes.PERMISSION_DENIED
          )
        );
      }
    }

    const response = new CheckAuthorizedResponse();
    response.setAuthorized(true);
    callback(null, response);
  }
}

export {LimiterServer as default, ILimiterService, LimiterService};