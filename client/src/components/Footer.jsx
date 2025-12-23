import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-secondary border-t border-glass-border py-12 mt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">

                        <p className="text-gray-400 text-sm tracking-wide">
                            &copy; {new Date().getFullYear()} — Built with passion by
                            <span className="text-white ml-1 font-medium">AbdelhadiHammaz</span>
                            <span className="text-accent">.</span>
                        </p>

                    </div>
                    <div className="flex space-x-6">
                        <a href="https://github.com/Lpiks" className="text-gray-400 hover:text-accent transition-colors"><FaGithub size={20} /></a>
                        <a href="www.linkedin.com/in/abdelhadi-hammaz" className="text-gray-400 hover:text-accent transition-colors"><FaLinkedin size={20} /></a>
                        {/* <a href="#" className="text-gray-400 hover:text-accent transition-colors"><FaTwitter size={20} /></a> */}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
