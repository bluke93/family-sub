# Family Sub Manager

A simple Vue 3/Nuxt application to track and manage shared subscription plans. Originally built to manage a Nintendo Switch Online Family Plan, but adaptable for any shared subscription.

## Purpose

Until now, I managed my subscription manually by sending emails, WhatsApp, or Telegram messages to members. However, I didn't want to create a group, and people often replied late. This made it difficult to determine the final quota per person until the last moment.  

With this app, I aim to **centralize everything**, automate renewal reminders, and dynamically calculate each member's share based on how many people choose to renew. Also members can check by themselves the status of the subscription.

## Features

### For Subscription Owners (Leaders)
- View subscription details: start date, end date, renewal date, and current members.
- Invite new members.
- Remove members.
- Send renewal reminders and calculate each member's share of the cost.

### For Members
- View subscription details (start, end, total price, and personal quota).
- Indicate renewal interest.

### Subscription Details
- Tracks start and end dates.
- Shows total cost and split cost among members.
- Late joiners only pay for remaining months before renewal.

## Tech Stack
- **Vue 3** / **Nuxt 3**
- **TypeScript**
- **SCSS**
- **Pinia**
- **Supabase**

## Setup & Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/bluke93/family-sub-manager.git
   ```
2. Install dependencies:
   ```sh
   cd family-sub-manager
   npm install
   ```
3. Configure environment variables (Supabase credentials, etc.).

   
5. Run the development server:
   ```sh
   npm run dev
   ```
