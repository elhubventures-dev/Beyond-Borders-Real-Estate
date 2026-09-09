# Security Plan

| Control | Implementation |
|---------|----------------|
| Input validation | Zod on contact + inspection (client + server) |
| XSS | Escape HTML in email bodies; React default escaping |
| CSRF | SameSite cookies via platform; Server Actions POST origin checks |
| Rate limiting | In-memory IP throttle in `lib/rate-limit.ts` (5/min/form) |
| Headers | CSP, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy |
| Secrets | `.env.local` / Vercel env — never commit keys |
| WP surface | Removed — no admin, xmlrpc, or PHP |

## Notes
- Upgrade rate limit to Upstash Redis for multi-instance production if form abuse appears
- Restrict Resend `EMAIL_FROM` to a verified domain before go-live
