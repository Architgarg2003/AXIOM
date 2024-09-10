/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@1.14.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as CreateCard from "../CreateCard.js";
import type * as DailyInteractions from "../DailyInteractions.js";
import type * as GetTags from "../GetTags.js";
import type * as GetTest from "../GetTest.js";
import type * as GetUserAnswer from "../GetUserAnswer.js";
import type * as LeaderBoard from "../LeaderBoard.js";
import type * as PushHeatMap from "../PushHeatMap.js";
import type * as TotalInteractions from "../TotalInteractions.js";
import type * as createEmbedding from "../createEmbedding.js";
import type * as create_mcq from "../create_mcq.js";
import type * as getAllGeneratedCards from "../getAllGeneratedCards.js";
import type * as messages from "../messages.js";
import type * as openai from "../openai.js";
import type * as pushAnswer from "../pushAnswer.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  CreateCard: typeof CreateCard;
  DailyInteractions: typeof DailyInteractions;
  GetTags: typeof GetTags;
  GetTest: typeof GetTest;
  GetUserAnswer: typeof GetUserAnswer;
  LeaderBoard: typeof LeaderBoard;
  PushHeatMap: typeof PushHeatMap;
  TotalInteractions: typeof TotalInteractions;
  createEmbedding: typeof createEmbedding;
  create_mcq: typeof create_mcq;
  getAllGeneratedCards: typeof getAllGeneratedCards;
  messages: typeof messages;
  openai: typeof openai;
  pushAnswer: typeof pushAnswer;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;