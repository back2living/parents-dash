import {Dispatch, SetStateAction} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination, Autoplay, Navigation} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';


const NextButton = () => {
    return (
        <button className={"w-full lg:w-[192px] next-btn white-btn text-primary"}>Next</button>
    )
}
const SkipButton = ({closeModal}: { closeModal: () => void }) => {
    return (
        <button onClick={closeModal} className={'w-full py-4 lg:py-0 lg:w-[192px] text-white'}>Skip</button>
    )
}

const Onboarding = ({setShowOnboardingModal}: {setShowOnboardingModal: Dispatch<SetStateAction<boolean>>}) => {

    const closeModal = () => setShowOnboardingModal(false);

    return (
        <div className={"onboarding-overlay"}>
            <div className={"relative lg:bottom-0 bottom-[10px] lg:rounded-[32px] w-[92%] max-w-[600px] lg:w-[600px] onboarding"}>
                <Swiper
                    modules={[Pagination, Autoplay, Navigation]}
                    spaceBetween={30}
                    slidesPerView={1}
                    pagination={{clickable: true}}
                    onSlideChange={() => {}}
                    autoplay={{delay: 10000, stopOnLastSlide: true}}
                    navigation={{
                        prevEl: ".prev-btn",
                        nextEl: ".next-btn"
                    }}
                >
                    <SwiperSlide style={{height: "550px"}}>
                        <div className={"relative lg:w-[600px] w-full h-full lg:h-[550px] p-4 lg:p-10"}>
                            <img className={"absolute hidden lg:block inset-0"} src="/assets/images/onboarding-overlay.png" alt=""/>
                            <img className={"absolute h-full lg:hidden inset-0"} src="/assets/images/onboarding-overlay.png" alt=""/>

                            <img className={"w-[90px] lg:w-[110px] mx-auto object-cover relative"} src="/assets/images/onboarding-logo.png" alt=""/>

                            <div className={"lg:absolute lg:bottom-[70px] relative w-full lg:w-[61%] text-white mt-[100px] lg:mt-0"}>
                                <h1 className={"lg:text-[36px] text-lg"}>Welcome to Playground</h1>
                                <p className={"lg:text-[18px] mt-4 mb-6"}>All the tools you need to nurture and build your child’s positive traits.</p>

                                <div className={"flex-center lg:flex-row flex-column gap-4"}>
                                    <NextButton/>
                                    {/*<button onClick={closeModal} className={'w-[192px] text-white'}>Skip</button>*/}
                                    <SkipButton closeModal={closeModal}/>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={"relative lg:w-[600px] w-full h-[550px] lg:h-[550px] pb-10 pt-2.5 px-4 lg:px-10"}>
                            <img className={"absolute hidden lg:block inset-0"} src="/assets/images/onboarding-overlay.png" alt=""/>
                            <img className={"absolute h-full lg:hidden inset-0 rounded-3xl"} src="/assets/images/onboarding-overlay.png" alt=""/>

                            <img className={"w-[130px] lg:w-[200px] mx-auto object-cover relative"}
                                 src="/assets/images/onboarding-ethics.png" alt=""/>

                            <div className={"lg:absolute lg:bottom-[70px] relative w-full lg:w-[61%] text-white mt-[33px] lg:mt-0"}>
                                <h1 className={"text-md lg:text-lg "}>Raise ethically and financially responsible children.</h1>
                                <p className={"text-[18px] mt-4 mb-6"}>All the tools you need to nurture and build your child’s positive traits.</p>

                                <div className={"flex-center lg:flex-row flex-column gap-4"}>
                                    <NextButton/>
                                    <SkipButton closeModal={closeModal}/>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={"relative lg:w-[600px] w-full h-[550px] pb-10 pt-5 px-4 lg:px-10"}>
                             <img className={"absolute hidden lg:block inset-0"} src="/assets/images/onboarding-overlay.png" alt=""/>
                            <img className={"absolute h-full lg:hidden inset-0 rounded-3xl"} src="/assets/images/onboarding-overlay.png" alt=""/>

                            <img className={"w-[200px] lg:w-[280px] mx-auto object-cover relative"} src="/assets/images/onboarding-points.png" alt=""/>

                            <div className={"lg:absolute lg:bottom-[70px] relative w-full lg:w-[61%] text-white mt-[33px] lg:mt-0"}>
                                <h1 className={"text-lg "}>Set task-based reward points</h1>
                                <p className={"text-[18px] mt-4 mb-6"}>Build a strong financial foundation for your kid by
                                    motivating them to earn through completed tasks.</p>

                                <div className={"flex-center lg:flex-row flex-column gap-4"}>
                                    <NextButton />
                                    <SkipButton closeModal={closeModal} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={"relative lg:w-[600px] w-full h-[550px] pb-10 pt-2.5 px-4 lg:px-10 rounded-3xl lg:rounded-0"}>
                             <img className={"absolute hidden lg:block inset-0"} src="/assets/images/onboarding-overlay.png" alt=""/>
                            <img className={"absolute h-full lg:hidden inset-0 rounded-3xl"} src="/assets/images/onboarding-overlay.png" alt=""/>

                            <div className={"w-[230px] lg:w-[350px] mx-auto"}>
                                <img className={"w-full object-cover relative"} src="/assets/images/onboarding-savings.png" alt=""/>
                            </div>

                            <div className={"lg:absolute lg:bottom-[70px] relative w-full lg:w-[61%] text-white mt-[33px] lg:mt-0"}>
                                <h1 className={"lg:text-lg text-md"}>Set up saving plans for your kids</h1>
                                <p className={"text-[18px] mt-4 mb-6"}>Foster financially responsible kids by setting up
                                    saving
                                    plans tailored to your kid’s goal.</p>

                                <div className={"flex-center lg:flex-row flex-column gap-4"}>
                                    <NextButton />
                                    <SkipButton closeModal={closeModal} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className={"relative lg:w-[600px] w-full h-[550px] pb-10 pt-2.5 lg:px-10"}>
                            <img className={"w-full object-cover hidden lg:block absolute top-0 bottom-0 right-0"} src="/assets/images/onboarding-telescope.png" alt=""/>
                            <img className={"w-full object-cover lg:hidden rounded-3xl h-full absolute top-0 bottom-0 right-0"} src="/assets/images/onboarding-telescope.png" alt=""/>

                            <div className={"absolute bottom-14 text-center lg:text-left lg:bottom-[70px] w-full lg:w-[61%] text-white lg:mt-0"}>
                                <h1 className={"lg:text-lg text-md"}>Track your kids’ monthly habits</h1>
                                <p className={"text-[18px] mt-4 mb-6"}>Monitor how they complete tasks, redeem their points,
                                    and
                                    encourage good money habits.</p>

                                <button onClick={closeModal} className={"w-4/5  lg:w-[220px] white-btn text-primary"}>Proceed to Dashboard</button>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>
        </div>
    );
};

export default Onboarding;