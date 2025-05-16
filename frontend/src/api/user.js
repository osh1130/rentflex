import api from './api';

// 列表
export const getAllUsers = async (token) => {
  const res = await api.get('/admin/users', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

// Block
export const blockUser = async (id, token) => {
  const res = await api.post(
    `/admin/users/${id}/block`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

// Reset password
export const resetPassword = async (id, token) => {
  const res = await api.post(
    `/admin/users/${id}/reset-password`,
    null,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};