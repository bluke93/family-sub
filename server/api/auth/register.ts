import { createClient } from '@supabase/supabase-js'

if (!process.env.DB_URL || !process.env.DB_KEY) {
  throw new Error('Missing database credentials')
}

const supabase = createClient(
  process.env.DB_URL,
  process.env.DB_KEY
)

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    throw createError({
      statusCode: 500,
      statusMessage: error.message,
    })
  }

  return data
})
