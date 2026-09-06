# PG + Mess + Student Platform

This workspace starts the PDF roadmap as a practical monorepo. The roadmap's instructions are treated as source material; the build starts with Phase 0 and moves forward in order.

## Phase Order From The PDF

1. Phase 0 - setup
   - Monorepo structure
   - Local Postgres and Redis
   - Database schema and migrations
   - Basic API and web app shell

2. Phase 1 - authentication and listings
   - Signup/login with roles
   - PG listing CRUD for PG owners
   - Mess listing CRUD for mess owners
   - Student browsing/search

3. Phase 2 - bookings and payments
   - PG booking flow
   - Mess subscription flow
   - Razorpay order creation and webhook verification
   - PG owner dashboard

4. Phase 3 - mess engine
   - Daily meal schedule generation
   - 3-hour cancellation rule
   - Coin wallet ledger
   - Mess owner daily dashboard
   - Daily summary aggregation

5. Phase 4 - polish and admin
   - Admin approval and transaction views
   - Notifications
   - Rate limiting and stronger validation

6. Phase 5 - testing and launch
   - Wallet/cancellation tests
   - Webhook/load testing
   - Monitoring and backups

## Apps

- `apps/backend` - Node.js + Express + Prisma backend
- `apps/frontend` - Next.js frontend

## Local Services

```bash
docker compose up -d
```

## Environment

Copy `.env.example` to `.env` and fill in production secrets before deploying.

## Next Implementation Step

Phase 1 should begin with backend auth and role-aware route protection, then listing CRUD.
