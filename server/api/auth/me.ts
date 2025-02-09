// retrieve user from supabase
import { createClient } from '@supabase/supabase-js'

if (!process.env.DB_URL || !process.env.DB_KEY) {
  throw new Error('Missing database credentials')
}

const supabase = createClient(
  process.env.DB_URL,
  process.env.DB_KEY
)

export default defineEventHandler(async (event) => {
  const token = getHeader(event, 'Authorization')
  
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'No authorization token provided',
    })
  }

  const { data, error } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: token,
  })

  if (error) {
    throw createError({
      statusCode: 401,
      statusMessage: error.message,
    })
  }


  return data.user
})