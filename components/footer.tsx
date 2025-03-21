const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-gray-200 py-6 text-center text-sm text-secondary">
      <div className="container mx-auto px-4">
        <p>
          © {currentYear} ElHikma - DeWijsheid - 2060 vzw. Alle rechten voorbehouden.
        </p>
        <p className="mt-1">
          Website gemaakt door{" "}
          <a 
            href="https://wystudio.be" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            wystudio.be
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer; 