import { expect, test, describe } from 'bun:test'
import { db } from '@/database'
import dotenv from 'dotenv';
dotenv.config({ path: './.env.local', override: true });

describe('Home', () => {
  test('renders', () => {
    expect(db).toBeTruthy()
  })
})
