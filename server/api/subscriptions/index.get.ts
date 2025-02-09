import { createClient } from '@supabase/supabase-js'
import { useAuthStore } from '~/stores/authStore'

if (!process.env.DB_URL || !process.env.DB_KEY) {
  throw new Error('Missing database credentials')
}

const supabase = createClient(
  process.env.DB_URL,
  process.env.DB_KEY
)

export default defineEventHandler(async (event) => {
  const authStore = useAuthStore()

  try {
    const subscriptions = await getAllSubscriptionsAndUsers()
    return subscriptions
  } catch (error) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal server error'
    })
  }
})


async function getAllSubscriptionsAndUsers() {
  const subscriptions = await supabase.from('subscriptions').select('*')
  const users = await supabase.from('users').select('*')

  const subscriptionsWithUsers = subscriptions?.data?.map((subscription) => {
    const user = users?.data?.find((user) => user.id === subscription.user_id)
    return { ...subscription, user }
  })

  return subscriptionsWithUsers
}