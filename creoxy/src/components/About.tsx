
import Navbar from './Navbar';


const About = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-transparent flex flex-col items-center py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl w-full space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl leading-9 font-extrabold text-black">
                            About Us
                        </h2>
                        <p className="mt-4 text-lg leading-6 text-black">
                            Welcome to our app, your number one source for unique, spontaneous interactions.
                            We're dedicated to providing you with an exceptional experience, with a focus
                            on quality, privacy, and user satisfaction.
                        </p>
                    </div>
                    <div className="bg-transparent shadow border border-black sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-black">
                                Our Story
                            </h3>
                            <p className="mt-1 max-w-2xl text-sm leading-5 text-black">
                                Founded in 2023, our app has evolved from a simple idea to a platform connecting people worldwide. Driven by our passion for creating spontaneous and meaningful connections, we continue to innovate and grow.
                            </p>
                        </div>
                        <div className="border-t border-black">
                            <dl>
                                <div className="bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm leading-5 font-medium text-black">
                                        Our Mission
                                    </dt>
                                    <dd className="mt-1 text-sm leading-5 text-black sm:mt-0 sm:col-span-2">
                                        To provide a secure and enjoyable platform where users can connect and interact freely, while maintaining the highest standards of privacy and safety.
                                    </dd>
                                </div>
                                <div className="bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm leading-5 font-medium text-black">
                                        Our Vision
                                    </dt>
                                    <dd className="mt-1 text-sm leading-5 text-black sm:mt-0 sm:col-span-2">
                                        To be the leading platform for spontaneous online interactions, recognized for our commitment to user experience and safety.
                                    </dd>
                                </div>
                                <div className="bg-transparent px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm leading-5 font-medium text-black">
                                        Contact Us
                                    </dt>
                                    <dd className="mt-1 text-sm leading-5 text-black sm:mt-0 sm:col-span-2">
                                        You can reach us at: contact@ourapp.com
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default About;
