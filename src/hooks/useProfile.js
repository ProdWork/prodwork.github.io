import { useState, useEffect } from 'react';
import { fetchProfile } from '../services/api';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile()
      .then(data => setProfile(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { profile, loading, error };
}
