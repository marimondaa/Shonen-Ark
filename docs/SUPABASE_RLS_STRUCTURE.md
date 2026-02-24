# Supabase RLS & Role Structure

This document outlines the proposed Row Level Security (RLS) policies and role-based access control (RBAC) for the Shonen Ark database.

## 👥 Roles
- **authenticated**: Default role for any logged-in user.
- **fan**: Base tier. Can read public theories, create comments, and watch public content.
- **creator**: Can upload character designs, theories, and audio/fx. Can only edit their own content.
- **admin**: Full CRUD access for moderation and system configuration.

## 🛡 Recommended Policies

### Table: `users`
| Operation | Policy | Role |
| :--- | :--- | :--- |
| SELECT | `id = auth.uid()` OR `role = 'admin'` | authenticated |
| UPDATE | `id = auth.uid()` | authenticated |
| INSERT | (Handled by Auth trigger) | - |

### Table: `theories`
| Operation | Policy | Role |
| :--- | :--- | :--- |
| SELECT | `status = 'published'` OR `user_id = auth.uid()` | public |
| INSERT | `auth.uid() IS NOT NULL` | creator, admin |
| UPDATE | `user_id = auth.uid()` | creator |
| DELETE | `user_id = auth.uid()` OR `role = 'admin'` | creator, admin |

### Table: `projects` (Submissions)
| Operation | Policy | Role |
| :--- | :--- | :--- |
| SELECT | `user_id = auth.uid()` OR `role = 'admin'` | authenticated |
| INSERT | `auth.uid() IS NOT NULL` | creator |
| UPDATE | `user_id = auth.uid()` (if status = 'pending') | creator |
| DELETE | `role = 'admin'` | admin |

## 🚀 Implementation Plan
1. Create a `user_roles` enum in Supabase.
2. Add a `role` column to the `users` table.
3. Enable RLS on all tables: `ALTER TABLE theories ENABLE ROW LEVEL SECURITY;`
4. Apply the policies via SQL migrations or the Supabase Dashboard.
