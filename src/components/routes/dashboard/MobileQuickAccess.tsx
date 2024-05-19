// Import Swiper styles
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import Card from "@/components/shared/Card";

const MobileQuickAccess = () => {
    return (
        <div>
             <div className={"lg:hidden mobile-card-wrapper mt-[18px]"}>
                <Swiper
                    modules={[Pagination]}
                    spaceBetween={10}
                    slidesPerView={1}
                    pagination={{clickable: true}}
                    onSlideChange={() => {
                    }}
                >
                    <SwiperSlide>
                        <Card
                            textColor={"white"}
                            text={"Kids added"}
                            count={1}
                            img={"kids-bg.webp"}
                            link={{name: "Add kids", path: "/kids", textColor: "#F07846"}}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card
                            textColor={"white"}
                            text={"Tasks waiting for approval"}
                            count={1}
                            img={"tasks-bg.webp"}
                            link={{name: "Add tasks", path: "/tasks", textColor: "#AF70EE"}}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card
                            textColor={"white"}
                            text={"Items in Storefront"}
                            count={1}
                            img={"store-bg.webp"}
                            link={{name: "Store Items", path: "/store", textColor: "#FDBA2D"}}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Card
                            textColor={"white"}
                            text={"Savings created"}
                            count={1}
                            img={"savings-bg.webp"}
                            link={{name: "Set up now", path: "/savings", textColor: "#09C2B2"}}
                        />
                    </SwiperSlide>

                </Swiper>

            </div>
        </div>
    );
};

export default MobileQuickAccess;