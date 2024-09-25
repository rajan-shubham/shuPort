const Footer = () => {
  const year = new Date().getFullYear();
  return (
      <div className="bg-gray-800 py-4 text-center text-white">
          <p className="text-sm">Created with <i className="fa-solid fa-heart text-red-600"></i> by <strong><a href="https://www.linkedin.com/in/shubham-kumar-617760258/" target="_blank" className="hover:underline">Shubham Rajan</a></strong></p>
          <p className="text-xs">&copy; {year}</p>
      </div>
  );
};

export default Footer;
