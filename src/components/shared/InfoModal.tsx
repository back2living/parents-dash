import {AnimatePresence, motion} from "framer-motion";
import {useEffect} from "react";
import {IModal} from "@components/shared/FormModal";

const InfoModal = ({isOpen, children, style}: IModal) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overlay");
        } else {
            document.body.classList.remove("overlay");
        }
    }, [isOpen]);


    return (
    <AnimatePresence>
        {isOpen && (<motion.div
                className="info-modal-wrapper"
                initial={{
                    opacity: 0,
                }}
                animate={{
                    opacity: 1,
                    transition: {
                        ease: "easeOut",
                        duration: 0.25,
                    },
                }}
                exit={{
                    opacity: 0,
                    transition: {
                        ease: "easeIn",
                        duration: 0.25,
                    },
                }}
            >
                <motion.div className={`info-modal ${style}`}>{children}</motion.div>
            </motion.div>
        )}
    </AnimatePresence>
    );
};

export default InfoModal;