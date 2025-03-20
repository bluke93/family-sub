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

  // First get the auth user to get their ID
  const { data: authData, error: authError } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: token,
  })

  if (authError) {
    throw createError({
      statusCode: 401,
      statusMessage: authError.message,
    })
  }

  // Then fetch the user data from the users table
  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('id', authData.user.id)
    .single()

  if (userError) {
    throw createError({
      statusCode: 500,
      statusMessage: userError.message,
    })
  }

  return userData
}) 