import { useState } from 'react';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { Link, useNavigate } from 'react-router';
import { authService } from '@/services/api/auth';
import { AxiosError } from 'axios';

export function RegisterForm() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.register(
        { name, surname, email, password },
        { profile_image: profileImage || undefined }
      );

      // Navigate to login after successful registration
      navigate('/login');
    } catch (err) {
      if (err instanceof AxiosError && (err.response?.data as { message?: string })?.message) {
        setError((err.response?.data as { message?: string })?.message || "Произошла ошибка");
      } else {
        setError('Произошла ошибка при регистрации. Проверьте данные и попробуйте снова.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-[400px] w-full bg-dark-card p-10 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.05)] text-center">
      <h1 className="text-3xl font-normal mb-6">Регистрация</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form className="space-y-4 mb-4" onSubmit={handleSubmit}>
        <Input
          label="Имя"
          id="name"
          type="text"
          placeholder="Введите имя"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />

        <Input
          label="Фамилия"
          id="surname"
          type="text"
          placeholder="Введите фамилию"
          required
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
          disabled={isLoading}
        />
        
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

        <div>
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-400 mb-1 text-left">
            Фото профиля (опционально)
          </label>
          <input
            id="profileImage"
            type="file"
            accept=".jpg,.jpeg,.png"
            onChange={handleFileChange}
            disabled={isLoading}
            className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary/90"
          />
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
          {isLoading ? 'Создание аккаунта...' : 'Создать аккаунт'}
        </Button>
      </form>

      <p className="text-gray-400 text-sm mt-4">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="text-white font-medium no-underline hover:underline">
          Войти
        </Link>
      </p>

      <Link to="/" className="inline-block mt-5 text-gray-400 hover:text-white text-sm no-underline transition-colors duration-300">
        ← На главную
      </Link>
    </div>
  );
}
