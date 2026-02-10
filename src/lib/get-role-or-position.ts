import { POSITION_MAP } from "./constants";
import type { PositionType, RoleType } from "./types";

export function getPositionWithRole(role?: RoleType): PositionType {
  if (role === undefined) role = 0;
  return POSITION_MAP[role] as PositionType;
}

export function getRoleWithPosition(position: PositionType) {
  const keyOfPosition = Object.keys(POSITION_MAP) as unknown as RoleType[];
  return keyOfPosition.find(
    (key) => POSITION_MAP[key] === position,
  ) as RoleType;
}
