import { ChatMessage } from "../types"
import { faker } from "@faker-js/faker"

export const createRandomMessage = (): ChatMessage => {
  return {
    author: faker.name.firstName(),
    content: faker.lorem.words(10),
  }
}
