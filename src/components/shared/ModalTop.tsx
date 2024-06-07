interface Props {
    title: string
    Icon: any
    closeModal: () => void
}

const ModalTop = ({Icon, closeModal, title}: Props) => {
    return (
        <div className={"flex-center-between sticky top-0 bg-white z-50 p-6"}>
            <p className={"form-modal-title"}>{title}</p>
            <button className={"cursor-pointer"} onClick={closeModal}>{Icon}</button>
        </div>
    );
};

export default ModalTop;