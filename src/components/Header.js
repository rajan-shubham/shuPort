const Header = () => {
    return (
        <div className="bg-gray-900 py-4 flex justify-center">
            <ul className="flex space-x-6 text-white">
                <li className="hover:bg-sky-500 py-2 px-4 rounded-lg"><a href="#about">ABOUT</a></li>
                <li className="hover:bg-sky-500 py-2 px-4 rounded-lg"><a href="#skill">SKILL</a></li>
                <li className="hover:bg-sky-500 py-2 px-4 rounded-lg"><a href="#project">PROJECT</a></li>
                <li className="hover:bg-sky-500 py-2 px-4 rounded-lg"><a href="#contact">CONTACT</a></li>
            </ul>
        </div>
    );
};

export default Header;
