import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerApi } from '../../api/auth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import MainLayout from '../../components/layout/MainLayout';
import { validateEmail, validatePassword, validateName } from '../../utils/validation';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      name: validateName(formData.name),
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await registerApi(formData.email, formData.password, formData.name);
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      // 处理后端返回的字段错误
      const data = err.response?.data;
      if (Array.isArray(data?.detail)) {
        // 处理字段错误
        let fieldErrors = {};
        data.detail.forEach(item => {
          // 只取 body 字段类型的校验错误
          if (item.loc && item.loc[0] === 'body') {
            const field = item.loc[1];
            fieldErrors[field] = item.msg;
          }
        });
        setErrors(prev => ({ ...prev, ...fieldErrors }));
        setError('');  
      }else if (typeof data?.detail === 'string') {
      if (data.detail.toLowerCase().includes('email')) {
        setErrors(prev => ({ ...prev, email: data.detail }));
      } else {
        setError(data.detail);
      }
    } else {
            const msg = data?.message || 'Registration failed. Please try again.';
            setError(msg);
        }
      } finally {
          setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg">
          <div>
            <h2 className="text-center text-3xl font-bold text-gray-900">
              Create your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:text-green-500">
                Sign in
              </Link>
            </p>
          </div>

          {success && (
            <div className="bg-green-50 text-green-700 p-3 rounded-md text-center text-sm mb-2">
              Registration successful! Redirecting to login...
            </div>
          )}

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                autoComplete="email"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                required
                autoComplete="new-password"
              />
            </div>

            <Button
              type="submit"
              loading={loading}
              className="w-full"
              disabled={success}
            >
              Create Account
            </Button>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
