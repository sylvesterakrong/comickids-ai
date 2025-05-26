import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6 mt-auto">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-.5">
                            <img
                                src="/assets/favicon.jpg"
                                alt="ComicKids AI Logo"
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <h3 className="text-xl font-bold">ComicKids AI</h3>
                        </div>
                        <p className="text-gray-400">Making learning fun through comics</p>
                    </div>
                </div>
                <div className="text-center mt-6 text-gray-400">
                    <p>Made with ❤️ by Sly & Tk.</p>
                </div>
                <div className="text-center mt-3 text-gray-400">
                    <p>&copy; {new Date().getFullYear()} ComicKids AI. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;