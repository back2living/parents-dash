const ImageUpload = ({file, closeModal}: any) => {

    return (
        file && <div>
            <div>
                <p className={"form-modal-title"}>Edit image</p>
                <div className={"mt-6 lg:mt-12"}>
                    <div className={"max-w-[500px] rounded-xl"}>
                        <div className={"max-w-[500px] h-[261px] lg:h-[400px] rounded-xl relative"}>
                            <img src={URL.createObjectURL(file)} alt="Boy" className="w-full h-full absolute inset-0 rounded-xl brightness-50"/>
                            <img src={URL.createObjectURL(file)} alt="Boy" className="w-[260px] lg:w-[400px] mx-auto h-[255px] lg:h-full relative rounded-full object-cover"/>
                        </div>
                    </div>
                </div>

                <div className={"mt-6 lg:mt-12 flex-center gap-6"}>
                    <button onClick={closeModal} className={"white-btn"}>Cancel</button>
                    <button className={"primary-btn"}>Update image</button>
                </div>
            </div>
        </div>
    );
};

export default ImageUpload;