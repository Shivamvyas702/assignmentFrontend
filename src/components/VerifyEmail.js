import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get(`/auth/verify/${token}`);
        navigate('/login?verified=true');
      } catch {
        alert('Invalid or expired verification link');
        navigate('/login');
      }
    };
    verify();
  }, [token, navigate]);

  return <div>Verifying email...</div>;
}
