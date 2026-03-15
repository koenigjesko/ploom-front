import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Link, useNavigate } from 'react-router';
import { authService } from '@/services/api/auth';
import { AxiosError } from 'axios';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.login({ email, password });

      // Assume a dummy token for now since backend currently doesn't provide one
      // If the backend returns a token in the future, we would extract it like this:
      // const token = response.data.token || response.data.access_token;
      // if (token) localStorage.setItem('token', token);

      localStorage.setItem('token', 'dummy-token'); // Temporary placeholder token

      // Redirect to main page or dashboard after successful login
      navigate('/');
    } catch (err) {
      if (err instanceof AxiosError && (err.response?.data as { message?: string })?.message) {
        setError((err.response?.data as { message?: string })?.message || "Произошла ошибка");
      } else {
        setError('Произошла ошибка при входе. Проверьте данные и попробуйте снова.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] w-full bg-dark-card p-10 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] text-center">
      <h1 className="text-3xl font-normal mb-6">Вход в аккаунт</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form className="space-y-4 mb-4" onSubmit={handleSubmit}>
        <Input
          label="Электронная почта"
          id="email"
          type="email"
          placeholder="Введите email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
        
        <Input
          label="Пароль"
          id="password"
          type="password"
          placeholder="Введите пароль"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
          {isLoading ? 'Вход...' : 'Войти'}
        </Button>
      </form>

      <p className="text-gray-400 text-sm mt-4">
        Нет аккаунта?{' '}
        <Link to="/register" className="text-white font-medium no-underline hover:underline">
          Зарегистрироваться
        </Link>
      </p>

      <Link to="/" className="inline-block mt-5 text-gray-400 hover:text-white text-sm no-underline transition-colors duration-300">
        ← На главную
      </Link>
    </div>
  );
}
