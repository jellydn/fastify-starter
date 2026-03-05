import { createMercuriusTestClient } from 'mercurius-integration-testing'
import { test } from 'tap'

import { build } from '../helper'

void test('hello query', async (t) => {
  const app = await build(t)
  const testClient = createMercuriusTestClient(app)
  const response = await testClient.query(
    `query {
    hello
   }`,
  )

  t.same(response, {
    data: {
      hello: 'Hello World!',
    },
  })
})
