
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './Home.css';
import Button from './Button';
import Footer from './Footer';
import { useTypewriter, Cursor } from 'react-simple-typewriter';

const Home = () => {
  const [text] = useTypewriter({
    words: ['with random people,', 'and share stories,', 'and build new friendships.'],
    loop: true,
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col justify-center items-center">
        <div className="space-y-16 text-center">
          <div className="heading">
            Meet New Friends
            <br /> Across the Globe!
          </div>
          <p className="type">
            Connect <span>{text}</span> <Cursor />
          </p>
          <br />
          <Link to="/connect">
            <Button />
          </Link>
          <div className="space-y-2">
            <p>Always be respectful</p>
            <p>and</p>
            <p>Don't share your personal details with anyone</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;