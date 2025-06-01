import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";


const LandingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <main className="flex-grow flex items-center justify-center px-4 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12 py-16">
                    {/* Left side - Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <div className="flex items-center justify-center lg:justify-start gap-2 mb-8">
                            <img
                                src="/assets/favicon.jpg"
                                alt="ComicKids AI Logo"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <h1 className="text-3xl font-bold text-gray-900">ComicKids AI</h1>
                        </div>
                        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                            Learn Through <span className="text-primary">Comics</span>
                        </h2>
                        <p className="text-lg text-gray-600 mb-8 max-w-xl">
                            Transform any educational topic into engaging comic strips.
                            Perfect for students, teachers, and visual learners in Ghana.
                        </p>
                        <Button
                            onClick={() => navigate('/home')}
                            size="lg"
                            className={cn(
                                "relative overflow-hidden group",
                                "px-8 py-6 text-lg",
                                "bg-black text-white border-2 border-black",
                                "transition-all duration-500",
                                "before:absolute before:inset-0",
                                "before:bg-white before:translate-x-full",
                                "before:transition-transform before:duration-500",
                                "hover:text-black hover:before:translate-x-0",
                                "active:scale-95"
                            )}
                        >
                            <span className="relative z-10 group-hover:text-black transition-colors duration-500">
                                Try it now
                            </span>
                            <ArrowRight className="relative z-10 h-5 w-5 ml-2 inline-block 
                                group-hover:text-black transition-colors duration-500" />
                        </Button>
                    </div>

                    {/* Right side - Image */}
                    <div className="flex-1 relative">
                        <div className="relative rounded-lg overflow-hidden shadow-xl">
                            <img
                                src="https://i.pinimg.com/736x/15/ee/f7/15eef712daf112cc3e59686aca1ad2c7.jpg"
                                alt="Educational Comics"
                                className="w-full h-auto rounded-lg"
                            />
                            <div className="absolute inset-0 bg-primary/10 rounded-lg"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default LandingPage;