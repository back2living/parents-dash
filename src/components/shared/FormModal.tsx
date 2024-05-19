import {AnimatePresence, motion} from "framer-motion";
import Head from "next/head";
import {useEffect} from "react";

const FormModal = ({isOpen, children, style}: any) => {
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overlay");
        } else {
            document.body.classList.remove("overlay");
        }
    }, [isOpen]);
    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
            </Head>
            <AnimatePresence>
                {isOpen && (<motion.div
                        className="form-modal-wrapper"
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
                        <motion.div className={`form-modal  ${style}`}>
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default FormModal;