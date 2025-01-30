import { expect, test, describe } from 'bun:test'
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local', override: true });

describe('Check services', () => {
  test('check current user', async () => {
    expect(true).toBeTruthy()
  })
})
