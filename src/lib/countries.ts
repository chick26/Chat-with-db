import { pinyin } from "@napi-rs/pinyin";

export function queryCountryCode(name: string) {
  return pinyin(name, {
    style: 4
  })
}