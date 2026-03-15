sed -i 's/setError(err.response.data.message);/setError((err.response?.data as any)?.message);/g' src/features/auth/components/LoginForm.tsx src/features/auth/components/RegisterForm.tsx
