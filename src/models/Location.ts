import { Location as PrismaLocation } from "@prisma/client";
export interface Location extends PrismaLocation {
  id: string;
  address: string
}

export const mapLocation = (location: PrismaLocation): Location => ({
    ...location,
});