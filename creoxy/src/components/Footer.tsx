
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer text-black border py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 creoxy. All rights reserved.</p>
        <p>
          Follow us on 
          <a href="#" className="ml-2 text-blue-400">Facebook</a>, 
          <a href="#" className="ml-2 text-blue-400">Twitter</a>, 
          <a href="#" className="ml-2 text-blue-400">Instagram</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
