import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/api';

export default function VerifyEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      try {
        await API.get(`/auth/verify-email/${token}`);
        navigate('/login?verified=true');
      } catch (err) {
        navigate('/login?verified=failed');
      }
    };
    verify();
  }, [token, navigate]);

  return <div className="p-4">Verifying...</div>;
}
