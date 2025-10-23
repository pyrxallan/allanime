import react from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 p-4 mt-8">
      <div className="container mx-auto text-center text-gray-400">
        &copy; {new Date().getFullYear()} AllAnime. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;