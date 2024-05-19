interface Props {
    title: string
    Icon: any
    closeModal: () => void
}

const ModalTop = ({Icon, closeModal, title}: Props) => {
    return (
        <div className={"flex-center-between"}>
            <p className={"form-modal-title"}>{title}</p>
            <button onClick={closeModal}>{Icon}</button>
        </div>
    );
};

export default ModalTop;