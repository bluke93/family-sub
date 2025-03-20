import { createClient } from '@supabase/supabase-js'

if (!process.env.DB_URL || !process.env.DB_KEY) {
  throw new Error('Missing database credentials')
}

const supabase = createClient(
  process.env.DB_URL,
  process.env.DB_KEY
)

async function getServicesForUser(event: any) {
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

  const userId = authData.user?.id

  if (!userId) {
    throw createError({
      statusCode: 401,
      statusMessage: 'User not found',
    })
  }

  // 1. Get all subscription memberships for the user
  const { data: memberships, error: membershipError } = await supabase
    .from('subscription_members')
    .select('service_id')
    .eq('user_id', userId)

  if (membershipError) {
    throw new Error(`Error fetching memberships: ${membershipError.message}`)
  }

  if (!memberships || memberships.length === 0) {
    return []
  }

  // 2. Get all services basic info
  const serviceIds = memberships.map(m => m.service_id)
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('*')
    .in('id', serviceIds)

  if (servicesError) {
    throw new Error(`Error fetching services: ${servicesError.message}`)
  }

  if (!services) return []

  // 3. For each service, get its members
  const servicesWithMembers = await Promise.all(services.map(async (service) => {
    const { data: members, error: membersError } = await supabase
      .from('subscription_members')
      .select('*')
      .eq('service_id', service.id)

    if (membersError) {
      throw new Error(`Error fetching members for service ${service.id}: ${membersError.message}`)
    }

    if (!members) return { ...service, members: [] }

    // 4. For each member, get their user info
    const membersWithUsers = await Promise.all(members.map(async (member) => {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', member.user_id)
        .single()

      if (userError) {
        throw new Error(`Error fetching user for member ${member.id}: ${userError.message}`)
      }

      return {
        ...member,
        user: userData || null
      }
    }))

    return {
      ...service,
      members: membersWithUsers
    }
  }))

  return servicesWithMembers
}

export default defineEventHandler(async (event) => {
  try {
    const subscriptions = await getServicesForUser(event)
    return subscriptions
  } catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      statusMessage: error.message || 'Internal server error'
    })
  }
})

