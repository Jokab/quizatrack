import { Prisma } from "@prisma/client";
import { prisma } from "../../db";

import keys from 'lodash/keys';
import cloneDeep from "lodash/cloneDeep";
import isArray from "lodash/isArray";
import isObject from 'lodash/isObject';
import type { Team } from "~/types";

type SwapDecimalWithNumber<T> = {
  [k in keyof T]: T[k] extends Prisma.DecimalJsLike ? number : T[k] extends object ? SwapDecimalWithNumber<T[k]> : T[k]
}

// https://github.com/prisma/prisma/issues/6049#issuecomment-1649881107
export const decimalsToNumber = <T extends object>(obj: T): SwapDecimalWithNumber<T> => {
  obj = cloneDeep(obj)

  keys(obj).forEach((key) => {
    // @ts-ignore
    if (Prisma.Decimal.isDecimal(obj[key])) {
      // @ts-ignore
      obj[key] = obj[key].toNumber()
      // @ts-ignore
    } else if (isArray(obj[key])) {
      // @ts-ignore
      obj[key] = obj[key].map((el) => (isObject(el) ? decimalsToNumber(el) : el))
      // @ts-ignore
    } else if (isObject(obj[key])) {
      // @ts-ignore
      obj[key] = decimalsToNumber(obj[key])
    }
  })
  // @ts-ignore
  return obj
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  const team = await prisma.team.findFirst({
    where: { id: Number(id) },
    select: {
      id: true,
      name: true,
      competitors: {
        select: {
          id: true,
          placement: true,
          teamMembers: {
            select: {
              person: {
                select: {
                  name: true
                }
              }
            }
          },
          competitorAnswer: {
            select: {
              text: true,
              points: true
            }
          },
          quiz: {
            select: {
              id: true,
              date: true,
              host: {
                select: {
                  name: true
                }
              },
              venue: {
                select: {
                  name: true
                }
              },
              questions: {
                select: {
                  questionParts: {
                    select: {
                      id: true,
                      text: true,
                      answer: true,
                      points: true
                    }
                  },
                  index: true
                }
              }
            }
          }
        }
      },
    }
  });

  return decimalsToNumber<Team>(team as unknown as Team);
});