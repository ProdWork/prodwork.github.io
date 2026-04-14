import { useEffect } from 'react';

export default function Resume() {
  useEffect(() => {
    // Redirect to Google Docs resume
    window.location.href = 'https://docs.google.com/document/d/1uR69dmVA092MNkQsba57gOe8pRFzn2RVWojRtKDzxoY/export?format=pdf';
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Redirecting to your resume...</p>
    </div>
  );
}
