const Footer = () => {
  return (
    <footer className="bg-black text-white text-center p-4 mt-4">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Your Recipe App. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
