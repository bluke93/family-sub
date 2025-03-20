export interface User {
  id: string
  full_name: string
  email: string
}

export interface Member {
  id: string
  user_id: string
  full_name: string
  email: string
  subscription_email: string
  created_at: string
  is_owner: boolean
  has_paid: boolean
  wants_renew: boolean
  user: User
}

export interface Service {
  id: string
  name: string
  created_at: string
  owner_id: string
  started_at: string
  expiring_at: string
  price_yearly: number
  price_monthly: number
  max_members: number
  members: Member[]
} 